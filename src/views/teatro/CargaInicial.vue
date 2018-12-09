<template>
  <v-layout>
    <v-btn @click="cargarDatos">Cargar Datos</v-btn>
  </v-layout>
</template>

<script>
import { db } from '@/firebase'
import { mapMutations } from 'vuex'
import { generarFormatoFecha } from '@/utilidades/formatos'

export default {
  methods: {
    ...mapMutations(['mostrarExito', 'mostrarError', 'mostrarOcupado', 'ocultarOcupado']),
    async cargarDatos() {
      let batch = db.batch()

      const teatro = {
        tid: 'teatro-super-opera',
        nombre: 'Teatro de la Súper Ópera',
        direccion: 'Calle 20 # 56 -28',
        telefonos: '258 97 87 - 297 84 74',
        categorias: [
          { categoria: 'A', color: '#9A4E81' },
          { categoria: 'B', color: '#D5647B' },
          { categoria: 'C', color: '#FC8B6B' },
          { categoria: 'D', color: '#FFBF60' },
        ],
        asientos: [
          { categoria: 'B', descripcion: 'Zona Izq B - Silla A-1', x: 1, y:1 }, { categoria: 'B', descripcion: 'Zona Izq B - Silla A-2', x: 2, y:1 }, { categoria: 'A', descripcion: 'Zona Cen A - Silla A-7', x: 7, y:1 }, { categoria: 'A', descripcion: 'Zona Cen A - Silla A-8', x: 8, y:1 }, { categoria: 'A', descripcion: 'Zona Cen A - Silla A-9', x: 9, y:1 }, { categoria: 'A', descripcion: 'Zona Cen A - Silla A-10', x: 10, y:1 }, { categoria: 'A', descripcion: 'Zona Cen A - Silla A-11', x: 11, y:1 }, { categoria: 'A', descripcion: 'Zona Cen A - Silla A-12', x: 12, y:1 }, { categoria: 'A', descripcion: 'Zona Cen A - Silla A-13', x: 13, y:1 }, { categoria: 'A', descripcion: 'Zona Cen A - Silla A-14', x: 14, y:1 }, { categoria: 'B', descripcion: 'Zona Der B - Silla A-19', x: 19, y:1 }, { categoria: 'B', descripcion: 'Zona Der B - Silla A-20', x: 20, y:1 }, 
          { categoria: 'B', descripcion: 'Zona Izq B - Silla B-1', x: 1, y:2 }, { categoria: 'B', descripcion: 'Zona Izq B - Silla B-2', x: 2, y:2 }, { categoria: 'B', descripcion: 'Zona Izq B - Silla B-3', x: 3, y:2 }, { categoria: 'A', descripcion: 'Zona Cen A - Silla B-8', x: 8, y:2 }, { categoria: 'A', descripcion: 'Zona Cen A - Silla B-9', x: 9, y:2 }, { categoria: 'A', descripcion: 'Zona Cen A - Silla B-10', x: 10, y:2 }, { categoria: 'A', descripcion: 'Zona Cen A - Silla B-11', x: 11, y:2 }, { categoria: 'A', descripcion: 'Zona Cen A - Silla B-12', x: 12, y:2 }, { categoria: 'A', descripcion: 'Zona Cen A - Silla B-13', x: 13, y:2 }, { categoria: 'B', descripcion: 'Zona Der B - Silla B-18', x: 18, y:2 }, { categoria: 'B', descripcion: 'Zona Der B - Silla B-19', x: 19, y:2 }, { categoria: 'B', descripcion: 'Zona Der B - Silla B-20', x: 20, y:2 }, 
          { categoria: 'B', descripcion: 'Zona Izq B - Silla C-1', x: 1, y:3 }, { categoria: 'B', descripcion: 'Zona Izq B - Silla C-2', x: 2, y:3 }, { categoria: 'B', descripcion: 'Zona Izq B - Silla C-3', x: 3, y:3 }, { categoria: 'B', descripcion: 'Zona Izq B - Silla C-4', x: 4, y:3 }, { categoria: 'B', descripcion: 'Zona Der B - Silla C-17', x: 17, y:3 }, { categoria: 'B', descripcion: 'Zona Der B - Silla C-18', x: 18, y:3 }, { categoria: 'B', descripcion: 'Zona Der B - Silla C-19', x: 19, y:3 }, { categoria: 'B', descripcion: 'Zona Der B - Silla C-20', x: 20, y:3 }, 
          { categoria: 'B', descripcion: 'Zona Izq B - Silla D-1', x: 1, y:4 }, { categoria: 'B', descripcion: 'Zona Izq B - Silla D-2', x: 2, y:4 }, { categoria: 'B', descripcion: 'Zona Izq B - Silla D-3', x: 3, y:4 }, { categoria: 'B', descripcion: 'Zona Izq B - Silla D-4', x: 4, y:4 }, { categoria: 'B', descripcion: 'Zona Cen B - Silla D-6', x: 6, y:4 }, { categoria: 'B', descripcion: 'Zona Cen B - Silla D-7', x: 7, y:4 }, { categoria: 'B', descripcion: 'Zona Cen B - Silla D-14', x: 14, y:4 }, { categoria: 'B', descripcion: 'Zona Cen B - Silla D-15', x: 15, y:4 }, { categoria: 'B', descripcion: 'Zona Der B - Silla D-17', x: 17, y:4 }, { categoria: 'B', descripcion: 'Zona Der B - Silla D-18', x: 18, y:4 }, { categoria: 'B', descripcion: 'Zona Der B - Silla D-19', x: 19, y:4 }, { categoria: 'B', descripcion: 'Zona Der B - Silla D-20', x: 20, y:4 }, 
          { categoria: 'B', descripcion: 'Zona Izq B - Silla E-1', x: 1, y:5 }, { categoria: 'B', descripcion: 'Zona Izq B - Silla E-2', x: 2, y:5 }, { categoria: 'B', descripcion: 'Zona Izq B - Silla E-3', x: 3, y:5 }, { categoria: 'B', descripcion: 'Zona Izq B - Silla E-4', x: 4, y:5 }, { categoria: 'B', descripcion: 'Zona Cen B - Silla E-6', x: 6, y:5 }, { categoria: 'B', descripcion: 'Zona Cen B - Silla E-7', x: 7, y:5 }, { categoria: 'B', descripcion: 'Zona Cen B - Silla E-8', x: 8, y:5 }, { categoria: 'B', descripcion: 'Zona Cen B - Silla E-9', x: 9, y:5 }, { categoria: 'B', descripcion: 'Zona Cen B - Silla E-10', x: 10, y:5 }, { categoria: 'B', descripcion: 'Zona Cen B - Silla E-11', x: 11, y:5 }, { categoria: 'B', descripcion: 'Zona Cen B - Silla E-12', x: 12, y:5 }, { categoria: 'B', descripcion: 'Zona Cen B - Silla E-13', x: 13, y:5 }, { categoria: 'B', descripcion: 'Zona Cen B - Silla E-14', x: 14, y:5 }, { categoria: 'B', descripcion: 'Zona Cen B - Silla E-15', x: 15, y:5 }, { categoria: 'B', descripcion: 'Zona Der B - Silla E-17', x: 17, y:5 }, { categoria: 'B', descripcion: 'Zona Der B - Silla E-18', x: 18, y:5 }, { categoria: 'B', descripcion: 'Zona Der B - Silla E-19', x: 19, y:5 }, { categoria: 'B', descripcion: 'Zona Der B - Silla E-20', x: 20, y:5 }, 
          { categoria: 'B', descripcion: 'Zona Izq B - Silla F-3', x: 3, y:6 }, { categoria: 'B', descripcion: 'Zona Izq B - Silla F-4', x: 4, y:6 }, { categoria: 'B', descripcion: 'Zona Cen B - Silla F-6', x: 6, y:6 }, { categoria: 'B', descripcion: 'Zona Cen B - Silla F-7', x: 7, y:6 }, { categoria: 'B', descripcion: 'Zona Cen B - Silla F-8', x: 8, y:6 }, { categoria: 'B', descripcion: 'Zona Cen B - Silla F-9', x: 9, y:6 }, { categoria: 'B', descripcion: 'Zona Cen B - Silla F-10', x: 10, y:6 }, { categoria: 'B', descripcion: 'Zona Cen B - Silla F-11', x: 11, y:6 }, { categoria: 'B', descripcion: 'Zona Cen B - Silla F-12', x: 12, y:6 }, { categoria: 'B', descripcion: 'Zona Cen B - Silla F-13', x: 13, y:6 }, { categoria: 'B', descripcion: 'Zona Cen B - Silla F-14', x: 14, y:6 }, { categoria: 'B', descripcion: 'Zona Cen B - Silla F-15', x: 15, y:6 }, { categoria: 'B', descripcion: 'Zona Der B - Silla F-17', x: 17, y:6 }, { categoria: 'B', descripcion: 'Zona Der B - Silla F-18', x: 18, y:6 }, 
          { categoria: 'B', descripcion: 'Zona Cen B - Silla G-6', x: 6, y:7 }, { categoria: 'B', descripcion: 'Zona Cen B - Silla G-7', x: 7, y:7 }, { categoria: 'B', descripcion: 'Zona Cen B - Silla G-8', x: 8, y:7 }, { categoria: 'B', descripcion: 'Zona Cen B - Silla G-9', x: 9, y:7 }, { categoria: 'B', descripcion: 'Zona Cen B - Silla G-10', x: 10, y:7 }, { categoria: 'B', descripcion: 'Zona Cen B - Silla G-11', x: 11, y:7 }, { categoria: 'B', descripcion: 'Zona Cen B - Silla G-12', x: 12, y:7 }, { categoria: 'B', descripcion: 'Zona Cen B - Silla G-13', x: 13, y:7 }, { categoria: 'B', descripcion: 'Zona Cen B - Silla G-14', x: 14, y:7 }, { categoria: 'B', descripcion: 'Zona Cen B - Silla G-15', x: 15, y:7 }, 
          { categoria: 'C', descripcion: 'Zona Izq C - Silla H-1', x: 1, y:8 }, { categoria: 'C', descripcion: 'Zona Izq C - Silla H-2', x: 2, y:8 }, { categoria: 'A', descripcion: 'Zona Iz1 A - Silla H-4', x: 4, y:8 }, { categoria: 'A', descripcion: 'Zona Iz1 A - Silla H-5', x: 5, y:8 }, { categoria: 'B', descripcion: 'Zona Cen B - Silla H-8', x: 8, y:8 }, { categoria: 'B', descripcion: 'Zona Cen B - Silla H-9', x: 9, y:8 }, { categoria: 'B', descripcion: 'Zona Cen B - Silla H-10', x: 10, y:8 }, { categoria: 'B', descripcion: 'Zona Cen B - Silla H-11', x: 11, y:8 }, { categoria: 'B', descripcion: 'Zona Cen B - Silla H-12', x: 12, y:8 }, { categoria: 'B', descripcion: 'Zona Cen B - Silla H-13', x: 13, y:8 }, { categoria: 'A', descripcion: 'Zona De1 A - Silla H-16', x: 16, y:8 }, { categoria: 'A', descripcion: 'Zona De1 A - Silla H-17', x: 17, y:8 }, { categoria: 'C', descripcion: 'Zona Der C - Silla H-19', x: 19, y:8 }, { categoria: 'C', descripcion: 'Zona Der C - Silla H-20', x: 20, y:8 }, 
          { categoria: 'C', descripcion: 'Zona Izq C - Silla I-1', x: 1, y:9 }, { categoria: 'C', descripcion: 'Zona Izq C - Silla I-2', x: 2, y:9 }, { categoria: 'C', descripcion: 'Zona Izq C - Silla I-3', x: 3, y:9 }, { categoria: 'C', descripcion: 'Zona Izq C - Silla I-4', x: 4, y:9 }, { categoria: 'A', descripcion: 'Zona Iz1 A - Silla I-5', x: 5, y:9 }, { categoria: 'A', descripcion: 'Zona De1 A - Silla I-16', x: 16, y:9 }, { categoria: 'C', descripcion: 'Zona Der C - Silla I-17', x: 17, y:9 }, { categoria: 'C', descripcion: 'Zona Der C - Silla I-18', x: 18, y:9 }, { categoria: 'C', descripcion: 'Zona Der C - Silla I-19', x: 19, y:9 }, { categoria: 'C', descripcion: 'Zona Der C - Silla I-20', x: 20, y:9 }, 
          { categoria: 'C', descripcion: 'Zona Izq C - Silla J-1', x: 1, y:10 }, { categoria: 'C', descripcion: 'Zona Izq C - Silla J-2', x: 2, y:10 }, { categoria: 'C', descripcion: 'Zona Izq C - Silla J-3', x: 3, y:10 }, { categoria: 'C', descripcion: 'Zona Izq C - Silla J-4', x: 4, y:10 }, { categoria: 'C', descripcion: 'Zona Cen C - Silla J-6', x: 6, y:10 }, { categoria: 'C', descripcion: 'Zona Cen C - Silla J-7', x: 7, y:10 }, { categoria: 'C', descripcion: 'Zona Cen C - Silla J-14', x: 14, y:10 }, { categoria: 'C', descripcion: 'Zona Cen C - Silla J-15', x: 15, y:10 }, { categoria: 'C', descripcion: 'Zona Der C - Silla J-17', x: 17, y:10 }, { categoria: 'C', descripcion: 'Zona Der C - Silla J-18', x: 18, y:10 }, { categoria: 'C', descripcion: 'Zona Der C - Silla J-19', x: 19, y:10 }, { categoria: 'C', descripcion: 'Zona Der C - Silla J-20', x: 20, y:10 }, 
          { categoria: 'C', descripcion: 'Zona Izq C - Silla K-1', x: 1, y:11 }, { categoria: 'C', descripcion: 'Zona Izq C - Silla K-2', x: 2, y:11 }, { categoria: 'C', descripcion: 'Zona Izq C - Silla K-3', x: 3, y:11 }, { categoria: 'C', descripcion: 'Zona Izq C - Silla K-4', x: 4, y:11 }, { categoria: 'C', descripcion: 'Zona Cen C - Silla K-6', x: 6, y:11 }, { categoria: 'C', descripcion: 'Zona Cen C - Silla K-7', x: 7, y:11 }, { categoria: 'C', descripcion: 'Zona Cen C - Silla K-8', x: 8, y:11 }, { categoria: 'C', descripcion: 'Zona Cen C - Silla K-9', x: 9, y:11 }, { categoria: 'C', descripcion: 'Zona Cen C - Silla K-10', x: 10, y:11 }, { categoria: 'C', descripcion: 'Zona Cen C - Silla K-11', x: 11, y:11 }, { categoria: 'C', descripcion: 'Zona Cen C - Silla K-12', x: 12, y:11 }, { categoria: 'C', descripcion: 'Zona Cen C - Silla K-13', x: 13, y:11 }, { categoria: 'C', descripcion: 'Zona Cen C - Silla K-14', x: 14, y:11 }, { categoria: 'C', descripcion: 'Zona Cen C - Silla K-15', x: 15, y:11 }, { categoria: 'C', descripcion: 'Zona Der C - Silla K-17', x: 17, y:11 }, { categoria: 'C', descripcion: 'Zona Der C - Silla K-18', x: 18, y:11 }, { categoria: 'C', descripcion: 'Zona Der C - Silla K-19', x: 19, y:11 }, { categoria: 'C', descripcion: 'Zona Der C - Silla K-20', x: 20, y:11 }, 
          { categoria: 'C', descripcion: 'Zona Izq C - Silla L-3', x: 3, y:12 }, { categoria: 'C', descripcion: 'Zona Izq C - Silla L-4', x: 4, y:12 }, { categoria: 'C', descripcion: 'Zona Cen C - Silla L-6', x: 6, y:12 }, { categoria: 'C', descripcion: 'Zona Cen C - Silla L-7', x: 7, y:12 }, { categoria: 'C', descripcion: 'Zona Cen C - Silla L-8', x: 8, y:12 }, { categoria: 'C', descripcion: 'Zona Cen C - Silla L-9', x: 9, y:12 }, { categoria: 'C', descripcion: 'Zona Cen C - Silla L-10', x: 10, y:12 }, { categoria: 'C', descripcion: 'Zona Cen C - Silla L-11', x: 11, y:12 }, { categoria: 'C', descripcion: 'Zona Cen C - Silla L-12', x: 12, y:12 }, { categoria: 'C', descripcion: 'Zona Cen C - Silla L-13', x: 13, y:12 }, { categoria: 'C', descripcion: 'Zona Cen C - Silla L-14', x: 14, y:12 }, { categoria: 'C', descripcion: 'Zona Cen C - Silla L-15', x: 15, y:12 }, { categoria: 'C', descripcion: 'Zona Der C - Silla L-17', x: 17, y:12 }, { categoria: 'C', descripcion: 'Zona Der C - Silla L-18', x: 18, y:12 }, 
          { categoria: 'A', descripcion: 'Zona Iz2 A - Silla M-2', x: 2, y:13 }, { categoria: 'A', descripcion: 'Zona Iz2 A - Silla M-3', x: 3, y:13 }, { categoria: 'C', descripcion: 'Zona Cen C - Silla M-6', x: 6, y:13 }, { categoria: 'C', descripcion: 'Zona Cen C - Silla M-7', x: 7, y:13 }, { categoria: 'C', descripcion: 'Zona Cen C - Silla M-8', x: 8, y:13 }, { categoria: 'C', descripcion: 'Zona Cen C - Silla M-9', x: 9, y:13 }, { categoria: 'C', descripcion: 'Zona Cen C - Silla M-10', x: 10, y:13 }, { categoria: 'C', descripcion: 'Zona Cen C - Silla M-11', x: 11, y:13 }, { categoria: 'C', descripcion: 'Zona Cen C - Silla M-12', x: 12, y:13 }, { categoria: 'C', descripcion: 'Zona Cen C - Silla M-13', x: 13, y:13 }, { categoria: 'C', descripcion: 'Zona Cen C - Silla M-14', x: 14, y:13 }, { categoria: 'C', descripcion: 'Zona Cen C - Silla M-15', x: 15, y:13 }, { categoria: 'A', descripcion: 'Zona De2 A - Silla M-18', x: 18, y:13 }, { categoria: 'A', descripcion: 'Zona De2 A - Silla M-19', x: 19, y:13 }, 
          { categoria: 'D', descripcion: 'Zona Izq D - Silla N-1', x: 1, y:14 }, { categoria: 'D', descripcion: 'Zona Izq D - Silla N-2', x: 2, y:14 }, { categoria: 'A', descripcion: 'Zona Iz2 A - Silla N-3', x: 3, y:14 }, { categoria: 'C', descripcion: 'Zona Cen C - Silla N-8', x: 8, y:14 }, { categoria: 'C', descripcion: 'Zona Cen C - Silla N-9', x: 9, y:14 }, { categoria: 'C', descripcion: 'Zona Cen C - Silla N-10', x: 10, y:14 }, { categoria: 'C', descripcion: 'Zona Cen C - Silla N-11', x: 11, y:14 }, { categoria: 'C', descripcion: 'Zona Cen C - Silla N-12', x: 12, y:14 }, { categoria: 'C', descripcion: 'Zona Cen C - Silla N-13', x: 13, y:14 }, { categoria: 'A', descripcion: 'Zona De2 A - Silla N-18', x: 18, y:14 }, { categoria: 'D', descripcion: 'Zona Der D - Silla N-19', x: 19, y:14 }, { categoria: 'D', descripcion: 'Zona Der D - Silla N-20', x: 20, y:14 }, 
          { categoria: 'D', descripcion: 'Zona Izq D - Silla O-1', x: 1, y:15 }, { categoria: 'D', descripcion: 'Zona Izq D - Silla O-2', x: 2, y:15 }, { categoria: 'D', descripcion: 'Zona Izq D - Silla O-3', x: 3, y:15 }, { categoria: 'D', descripcion: 'Zona Izq D - Silla O-4', x: 4, y:15 }, { categoria: 'D', descripcion: 'Zona Der D - Silla O-17', x: 17, y:15 }, { categoria: 'D', descripcion: 'Zona Der D - Silla O-18', x: 18, y:15 }, { categoria: 'D', descripcion: 'Zona Der D - Silla O-19', x: 19, y:15 }, { categoria: 'D', descripcion: 'Zona Der D - Silla O-20', x: 20, y:15 }, 
          { categoria: 'D', descripcion: 'Zona Izq D - Silla P-1', x: 1, y:16 }, { categoria: 'D', descripcion: 'Zona Izq D - Silla P-2', x: 2, y:16 }, { categoria: 'D', descripcion: 'Zona Izq D - Silla P-3', x: 3, y:16 }, { categoria: 'D', descripcion: 'Zona Izq D - Silla P-4', x: 4, y:16 }, { categoria: 'D', descripcion: 'Zona Cen D - Silla P-6', x: 6, y:16 }, { categoria: 'D', descripcion: 'Zona Cen D - Silla P-7', x: 7, y:16 }, { categoria: 'D', descripcion: 'Zona Cen D - Silla P-14', x: 14, y:16 }, { categoria: 'D', descripcion: 'Zona Cen D - Silla P-15', x: 15, y:16 }, { categoria: 'D', descripcion: 'Zona Der D - Silla P-17', x: 17, y:16 }, { categoria: 'D', descripcion: 'Zona Der D - Silla P-18', x: 18, y:16 }, { categoria: 'D', descripcion: 'Zona Der D - Silla P-19', x: 19, y:16 }, { categoria: 'D', descripcion: 'Zona Der D - Silla P-20', x: 20, y:16 }, 
          { categoria: 'D', descripcion: 'Zona Izq D - Silla Q-1', x: 1, y:17 }, { categoria: 'D', descripcion: 'Zona Izq D - Silla Q-2', x: 2, y:17 }, { categoria: 'D', descripcion: 'Zona Izq D - Silla Q-3', x: 3, y:17 }, { categoria: 'D', descripcion: 'Zona Izq D - Silla Q-4', x: 4, y:17 }, { categoria: 'D', descripcion: 'Zona Cen D - Silla Q-6', x: 6, y:17 }, { categoria: 'D', descripcion: 'Zona Cen D - Silla Q-7', x: 7, y:17 }, { categoria: 'D', descripcion: 'Zona Cen D - Silla Q-8', x: 8, y:17 }, { categoria: 'D', descripcion: 'Zona Cen D - Silla Q-9', x: 9, y:17 }, { categoria: 'D', descripcion: 'Zona Cen D - Silla Q-10', x: 10, y:17 }, { categoria: 'D', descripcion: 'Zona Cen D - Silla Q-11', x: 11, y:17 }, { categoria: 'D', descripcion: 'Zona Cen D - Silla Q-12', x: 12, y:17 }, { categoria: 'D', descripcion: 'Zona Cen D - Silla Q-13', x: 13, y:17 }, { categoria: 'D', descripcion: 'Zona Cen D - Silla Q-14', x: 14, y:17 }, { categoria: 'D', descripcion: 'Zona Cen D - Silla Q-15', x: 15, y:17 }, { categoria: 'D', descripcion: 'Zona Der D - Silla Q-17', x: 17, y:17 }, { categoria: 'D', descripcion: 'Zona Der D - Silla Q-18', x: 18, y:17 }, { categoria: 'D', descripcion: 'Zona Der D - Silla Q-19', x: 19, y:17 }, { categoria: 'D', descripcion: 'Zona Der D - Silla Q-20', x: 20, y:17 }, 
          { categoria: 'D', descripcion: 'Zona Izq D - Silla R-2', x: 2, y:18 }, { categoria: 'D', descripcion: 'Zona Izq D - Silla R-3', x: 3, y:18 }, { categoria: 'D', descripcion: 'Zona Izq D - Silla R-4', x: 4, y:18 }, { categoria: 'D', descripcion: 'Zona Cen D - Silla R-6', x: 6, y:18 }, { categoria: 'D', descripcion: 'Zona Cen D - Silla R-7', x: 7, y:18 }, { categoria: 'D', descripcion: 'Zona Cen D - Silla R-8', x: 8, y:18 }, { categoria: 'D', descripcion: 'Zona Cen D - Silla R-9', x: 9, y:18 }, { categoria: 'D', descripcion: 'Zona Cen D - Silla R-10', x: 10, y:18 }, { categoria: 'D', descripcion: 'Zona Cen D - Silla R-11', x: 11, y:18 }, { categoria: 'D', descripcion: 'Zona Cen D - Silla R-12', x: 12, y:18 }, { categoria: 'D', descripcion: 'Zona Cen D - Silla R-13', x: 13, y:18 }, { categoria: 'D', descripcion: 'Zona Cen D - Silla R-14', x: 14, y:18 }, { categoria: 'D', descripcion: 'Zona Cen D - Silla R-15', x: 15, y:18 }, { categoria: 'D', descripcion: 'Zona Der D - Silla R-17', x: 17, y:18 }, { categoria: 'D', descripcion: 'Zona Der D - Silla R-18', x: 18, y:18 }, { categoria: 'D', descripcion: 'Zona Der D - Silla R-19', x: 19, y:18 }, 
          { categoria: 'D', descripcion: 'Zona Cen D - Silla S-6', x: 6, y:19 }, { categoria: 'D', descripcion: 'Zona Cen D - Silla S-7', x: 7, y:19 }, { categoria: 'D', descripcion: 'Zona Cen D - Silla S-8', x: 8, y:19 }, { categoria: 'D', descripcion: 'Zona Cen D - Silla S-9', x: 9, y:19 }, { categoria: 'D', descripcion: 'Zona Cen D - Silla S-10', x: 10, y:19 }, { categoria: 'D', descripcion: 'Zona Cen D - Silla S-11', x: 11, y:19 }, { categoria: 'D', descripcion: 'Zona Cen D - Silla S-12', x: 12, y:19 }, { categoria: 'D', descripcion: 'Zona Cen D - Silla S-13', x: 13, y:19 }, { categoria: 'D', descripcion: 'Zona Cen D - Silla S-14', x: 14, y:19 }, { categoria: 'D', descripcion: 'Zona Cen D - Silla S-15', x: 15, y:19 }, 
          { categoria: 'D', descripcion: 'Zona Cen D - Silla T-8', x: 8, y:20 }, { categoria: 'D', descripcion: 'Zona Cen D - Silla T-9', x: 9, y:20 }, { categoria: 'D', descripcion: 'Zona Cen D - Silla T-10', x: 10, y:20 }, { categoria: 'D', descripcion: 'Zona Cen D - Silla T-11', x: 11, y:20 }, { categoria: 'D', descripcion: 'Zona Cen D - Silla T-12', x: 12, y:20 }, { categoria: 'D', descripcion: 'Zona Cen D - Silla T-13', x: 13, y:20 }, 
        ]
      }

      const obraHamilton = {
        oid: 'hamilton',
        titulo: 'Hamilton',
        portada: 'https://firebasestorage.googleapis.com/v0/b/teatro-super-opera.appspot.com/o/obras%2Fhamilton%2Fhamilton.png?alt=media&token=323952e6-6656-4655-bb59-447929279bb5',
        descripcion: 'Hamilton: An American Musical es un musical sobre la vida de Alexander Hamilton, uno de los padres fundadores de los Estados Unidos; con letras, música y guion de Lin-Manuel Miranda.1​ El espectáculo, inspirado en la biografía de 2004 "Alexander Hamilton" del historiador Ron Chernow, ha logrado un gran éxito en crítica y taquilla.\n\nEl musical debutó en febrero del 2015 en el Teatro Público de Nueva York, hasta agosto del mismo año; cuando fue trasladado al teatro Richard Rodgers del circuito de Broadway, donde logró gran éxito en críticas y taquilla.\n\nEntre sus principales reconocimientos están haber ganado once premios Tony, un Grammy a mejor musical, un Pulitzer a mejor drama y siete premios Drama Desk.',
        categorias: [
          { categoria: 'A', precio: 850 },
          { categoria: 'B', precio: 600 },
          { categoria: 'C', precio: 500 },
          { categoria: 'D', precio: 350 },
        ],
        fechas: [],
        activo: true
      }

      const obraElReyLeon = {
        oid: 'el-rey-leon',
        titulo: 'El Rey León',
        portada: 'https://firebasestorage.googleapis.com/v0/b/teatro-super-opera.appspot.com/o/obras%2Fel-rey-leon%2Fel-rey-leon.png?alt=media&token=9dfd5ea3-81ed-4f5a-9b07-d081864a37ab',
        descripcion: 'El rey león es un musical basado en la película homónima de Disney de 1994, con libreto de Roger Allers e Irene Mecchi, canciones de Elton John y Tim Rice, y música adicional de Lebo M, Mark Mancina, Jay Rifkin, Julie Taymor y Hans Zimmer. Dirigido por Julie Taymor, el espectáculo está producido por Disney Theatrical y se caracteriza por el empleo de máscaras de animales y marionetas de gran tamaño para representar a los diferentes personajes.',
        categorias: [
          { categoria: 'A', precio: 400 },
          { categoria: 'B', precio: 250 },
          { categoria: 'C', precio: 200 },
          { categoria: 'D', precio: 150 },
        ],
        fechas: [],
        activo: true
      }

      const obraFrozen = {
        oid: 'frozen',
        titulo: 'Frozen',
        portada: 'https://firebasestorage.googleapis.com/v0/b/teatro-super-opera.appspot.com/o/obras%2Ffrozen%2Ffrozen.png?alt=media&token=37c81ae5-f7b4-40f9-b4ec-1793a54059f4',
        descripcion: 'Frozen is a musical with music and lyrics by Kristen Anderson-Lopez and Robert Lopez and book by Jennifer Lee based on the 2013 film of the same name. Produced by Disney Theatrical Productions, it had a tryout at the Buell Theatre in Denver, Colorado in August 2017 and premiered on Broadway in March 2018 at the St. James Theatre.',
        categorias: [
          { categoria: 'A', precio: 350 },
          { categoria: 'B', precio: 280 },
          { categoria: 'C', precio: 190 },
          { categoria: 'D', precio: 110 },
        ],
        fechas: [],
        activo: true
      }

      const obraAnastasia = {
        oid: 'anastasia',
        titulo: 'Anastasia',
        portada: 'https://firebasestorage.googleapis.com/v0/b/teatro-super-opera.appspot.com/o/obras%2Fanastasia%2Fanastasia.png?alt=media&token=9a55afd3-99ca-4c9d-9440-4761e598089d',
        descripcion: 'Anastasia es un musical basado en la película de animación homónima de 1997, con libreto de Terrence McNally, música de Stephen Flaherty y letras de Lynn Ahrens. Su trama central gira en torno a la leyenda de la gran duquesa Anastasia Nikoláyevna de Rusia, quien supuestamente escapó de la ejecución de su familia a manos del ejército bolchevique.',
        categorias: [
          { categoria: 'A', precio: 350 },
          { categoria: 'B', precio: 240 },
          { categoria: 'C', precio: 130 },
          { categoria: 'D', precio: 90 },
        ],
        fechas: [],
        activo: true
      }

      let fecha = new Date()

      fecha.setHours(0, 0, 0, 0)

      fecha.setDate(fecha.getDate() - 3)

      for(let i = 1; i <= 10; i++) {
        let fecha01 = new Date(fecha.getFullYear(), fecha.getMonth(), fecha.getDate(), 15, 15)
        let fecha02 = new Date(fecha.getFullYear(), fecha.getMonth(), fecha.getDate(), 10, 0)
        let fecha03 = new Date(fecha.getFullYear(), fecha.getMonth(), fecha.getDate(), 21, 30)
        let fecha04 = new Date(fecha.getFullYear(), fecha.getMonth(), fecha.getDate(), 17, 0)
        let fecha05 = new Date(fecha.getFullYear(), fecha.getMonth(), fecha.getDate(), 18, 0)

        obraHamilton.fechas.push(fecha01)
        obraElReyLeon.fechas.push(fecha02)
        obraElReyLeon.fechas.push(fecha03)
        obraFrozen.fechas.push(fecha04)
        obraAnastasia.fechas.push(fecha05)

        let presentacion01 = {
          pid: `${obraHamilton.oid}-${teatro.tid}-${generarFormatoFecha(fecha01, '-', true)}`,
          fecha: fecha01,
          teatro: { tid: teatro.tid, nombre: teatro.nombre },
          obra: { oid: obraHamilton.oid, titulo: obraHamilton.titulo }
        }

        let presentacion02 = {
          pid: `${obraElReyLeon.oid}-${teatro.tid}-${generarFormatoFecha(fecha02, '-', true)}`,
          fecha: fecha02,
          teatro: { tid: teatro.tid, nombre: teatro.nombre },
          obra: { oid: obraElReyLeon.oid, titulo: obraElReyLeon.titulo }
        }

        let presentacion03 = {
          pid: `${obraElReyLeon.oid}-${teatro.tid}-${generarFormatoFecha(fecha03, '-', true)}`,
          fecha: fecha03,
          teatro: { tid: teatro.tid, nombre: teatro.nombre },
          obra: { oid: obraElReyLeon.oid, titulo: obraElReyLeon.titulo }
        }

        let presentacion04 = {
          pid: `${obraFrozen.oid}-${teatro.tid}-${generarFormatoFecha(fecha04, '-', true)}`,
          fecha: fecha04,
          teatro: { tid: teatro.tid, nombre: teatro.nombre },
          obra: { oid: obraFrozen.oid, titulo: obraFrozen.titulo }
        }

        let presentacion05 = {
          pid: `${obraAnastasia.oid}-${teatro.tid}-${generarFormatoFecha(fecha05, '-', true)}`,
          fecha: fecha05,
          teatro: { tid: teatro.tid, nombre: teatro.nombre },
          obra: { oid: obraAnastasia.oid, titulo: obraAnastasia.titulo }
        }

        batch.set(db.collection('obras').doc(obraHamilton.oid).collection('presentaciones').doc(presentacion01.pid), presentacion01)
        batch.set(db.collection('obras').doc(obraElReyLeon.oid).collection('presentaciones').doc(presentacion02.pid), presentacion02)
        batch.set(db.collection('obras').doc(obraElReyLeon.oid).collection('presentaciones').doc(presentacion03.pid), presentacion03)
        batch.set(db.collection('obras').doc(obraFrozen.oid).collection('presentaciones').doc(presentacion04.pid), presentacion04)
        batch.set(db.collection('obras').doc(obraAnastasia.oid).collection('presentaciones').doc(presentacion05.pid), presentacion05)

        fecha.setDate(fecha.getDate() + 1)
      }

      batch.set(db.collection('teatros').doc(teatro.tid), teatro)

      batch.set(db.collection('obras').doc(obraHamilton.oid), obraHamilton)
      batch.set(db.collection('obras').doc(obraElReyLeon.oid), obraElReyLeon)
      batch.set(db.collection('obras').doc(obraFrozen.oid), obraFrozen)
      batch.set(db.collection('obras').doc(obraAnastasia.oid), obraAnastasia)

      this.mostrarOcupado({ titulo: 'Cargando Datos', mensaje: 'Cargando datos...' })

      try {
        batch.commit()

        this.mostrarExito('Se cargó la información exitosamente')
      }
      catch (error) {
        this.mostrarError('Ocurrió un error cargando la información')
      }
      finally {
        this.ocultarOcupado()
      }
    }
  }
}
</script>
