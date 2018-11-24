<template>
  <v-layout text-xs-center align-start justify-center class="mt-5">
    <v-card v-if="usuario" class="elevation-6" max-width="250">
      <v-btn @click="editando = !editando" color="secondary" class="elevation-1" fab small absolute top right>
        <v-fade-transition mode="out-in">
          <v-icon v-if="!editando" :key="1">edit</v-icon>
          <v-icon v-else :key="2">close</v-icon>
        </v-fade-transition>
      </v-btn>
      <v-card-text>
        <v-layout justify-center>
          <v-btn @click="editarNombresApellidos" v-if="editando" color="secondary" flat icon small>
            <v-icon>edit</v-icon>
          </v-btn>
          <div class="ma-2">
            {{ usuario.nombres + ' ' + usuario.apellidos }}
          </div>
        </v-layout>
        <v-img class="ma-2 fotoPerfil" :src="usuario.fotoPerfil"></v-img>
        <v-layout justify-center>
          <v-btn @click="editarDescripcion" v-if="editando" color="secondary" flat icon small>
            <v-icon>edit</v-icon>
          </v-btn>
          <div class="ma-2 descripcion">
            <span v-if="usuario.descripcion">{{ usuario.descripcion }}</span>
            <span v-else>Agrega una descripción</span>
          </div>
        </v-layout>
        <a :href="usuario.biografia" target="_blank" class="ma-2 link">Biografia</a>
      </v-card-text>
    </v-card>

    <!-- Nombres y Apellidos -->
    <v-dialog v-model="editandoNombresApellidos" max-width="400">
      <v-card>
        <v-toolbar color="primary" dark card>
          <v-toolbar-title>
            Ingresa tus Nombres y Apellidos
          </v-toolbar-title>
        </v-toolbar>
        <v-card-text>
          <v-text-field @blur="$v.f2.nombres.$touch()" autofocus :error-messages="erroresNombres" v-model="f2.nombres" label="Nombres"></v-text-field>
          <v-text-field @blur="$v.f2.apellidos.$touch()" :error-messages="erroresApellidos" v-model="f2.apellidos" label="Apellidos"></v-text-field>
        </v-card-text>
        <v-card-text>
          <v-layout>
            <v-flex xs6>
              <v-layout justify-start>
                <v-btn @click="editandoNombresApellidos = false">Cancelar</v-btn>
              </v-layout>
            </v-flex>
            <v-flex xs6>
              <v-layout justify-end>
                <v-btn @click="guardarNombresApellidos" :depressed="$v.f2.$invalid" :disabled="$v.f2.$invalid" color="secondary">Guardar</v-btn>
              </v-layout>
            </v-flex>
          </v-layout>
        </v-card-text>
      </v-card>
    </v-dialog>

    <!-- Descripción -->
    <v-dialog v-model="editandoDescripcion" max-width="400">
      <v-card>
        <v-toolbar color="primary" dark card>
          <v-toolbar-title>
            Ingresa una Descripción
          </v-toolbar-title>
        </v-toolbar>
        <v-card-text>
          <v-textarea label="Agrega un descripción." v-model="edicionDescripcion" counter="300" autofocus :error-messages="erroresDescripcion"></v-textarea>
        </v-card-text>
        <v-card-text>
          <v-layout>
            <v-flex xs6>
              <v-layout justify-start>
                <v-btn @click="editandoDescripcion = false">Cancelar</v-btn>
              </v-layout>
            </v-flex>
            <v-flex xs6>
              <v-layout justify-end>
                <v-btn @click="guardarDescripcion" :depressed="$v.edicionDescripcion.$invalid" :disabled="$v.edicionDescripcion.$invalid" color="secondary">Guardar</v-btn>
              </v-layout>
            </v-flex>
          </v-layout>
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>
import { required, minLength, maxLength } from 'vuelidate/lib/validators'
import { nombreCompuesto } from '@/utilidades/validaciones'
import { mapState, mapMutations } from 'vuex'
import store from '@/store'
import { db } from '@/firebase'

export default {
  data() {
    return {
      editando: false,
      editandoNombresApellidos: false,
      f2: {
        nombres: '',
        apellidos: ''
      },
      editandoDescripcion: false,
      edicionDescripcion: ''
    }
  },
  validations: {
    f2: {
      nombres: {
        required,
        minLength: minLength(3),
        maxLength: maxLength(20),
        nombreCompuesto
      },
      apellidos: {
        required,
        minLength: minLength(3),
        maxLength: maxLength(20),
        nombreCompuesto
      }
    },
    edicionDescripcion: {
      maxLength: maxLength(300)
    }
  },
  methods: {
    ...mapMutations(['mostrarError', 'mostrarOcupado', 'ocultarOcupado']),
    ...mapMutations('sesion', ['actualizarNombresApellidos', 'actualizarDescripcion']),
    editarNombresApellidos() {
      this.f2.nombres = this.usuario.nombres
      this.f2.apellidos = this.usuario.apellidos
      this.editandoNombresApellidos = true
    },
    async guardarNombresApellidos() {
      if (this.f2.nombres == this.usuario.nombres && this.f2.apellidos == this.usuario.apellidos) {
        this.editandoNombresApellidos = false
        return
      }

      this.mostrarOcupado({ titulo: 'Actualizando Información', mensaje: 'Estamos guardando tus nombres y apellidos...' })

      try {
        await db.collection('usuarios')
          .doc(this.usuario.uid)
          .update({ nombres: this.f2.nombres, apellidos: this.f2.apellidos })

        this.actualizarNombresApellidos({ nombres: this.f2.nombres, apellidos: this.f2.apellidos })

        this.editandoNombresApellidos = false
        this.editando = false
      }
      catch (error) {
        this.mostrarError('Ocurrió un error actualizando tus datos.')
      }
      finally {
        this.ocultarOcupado()
      }
    },
    editarDescripcion() {
      this.edicionDescripcion = this.usuario.descripcion || ''
      this.editandoDescripcion = true
    },
    async guardarDescripcion() {
      if(this.edicionDescripcion == this.usuario.descripcion) {
        this.editandoDescripcion = false
        return
      }

      this.mostrarOcupado({ titulo: 'Actualizando Información', mensaje: 'Estamos guardando la descripción...' })

      try {
        await db.collection('usuarios')
                .doc(this.usuario.uid)
                .update({ descripcion: this.edicionDescripcion })

        this.actualizarDescripcion(this.edicionDescripcion)

        this.editandoDescripcion = false
        this.editando = false
      }
      catch (error) {
        this.mostrarError('Ocurrió un error actualizando tus datos.')
      }
      finally {
        this.ocultarOcupado()
      }
    }
  },
  computed: {
    ...mapState('sesion', ['usuario']),
    erroresNombres() {
      let errores = []
      if (!this.$v.f2.nombres.$dirty) { return errores }
      if (!this.$v.f2.nombres.required) { errores.push('Ingresa tu nombre.') }
      if (!this.$v.f2.nombres.minLength) { errores.push('Ingresa al menos 3 caracteres.') }
      if (!this.$v.f2.nombres.maxLength) { errores.push('Ingresa máximo 20 caracteres.') }
      if (!this.$v.f2.nombres.nombreCompuesto) { errores.push('Ingresa un nombre válido.') }
      return errores
    },
    erroresApellidos() {
      let errores = []
      if (!this.$v.f2.apellidos.$dirty) { return errores }
      if (!this.$v.f2.apellidos.required) { errores.push('Ingresa tus apellidos.') }
      if (!this.$v.f2.apellidos.minLength) { errores.push('Ingresa al menos 3 caracteres.') }
      if (!this.$v.f2.apellidos.maxLength) { errores.push('Ingresa máximo 20 caracteres.') }
      if (!this.$v.f2.apellidos.nombreCompuesto) { errores.push('Ingresa un apellido válido.') }
      return errores
    },
    erroresDescripcion() {
      let errores = []
      if (!this.$v.edicionDescripcion.$dirty) { return errores }
      if (!this.$v.edicionDescripcion.maxLength) { errores.push('Ingresa máximo 300 caracteres.') }
      return errores
    }
  }
}
</script>


<style>
.fotoPerfil {
  width: 200px;
  height: 100%;
}

.descripcion {
  text-align: justify;
}

.link {
  text-decoration: none;
  font-size: 1rem;
  color: #553f75;
}
</style>
