export default {
  namespaced: true,
  state: {
    obras: [{
        oid: 'hamilton',
        titulo: 'Hamilton',
        portada: require('@/assets/obras/hamilton.png'),
        presentaciones: [{
          pid: 'hamilton-teatro-super-opera-2019-02-20-18-00',
          obra: {
            oid: 'hamilton',
            titulo: 'Hamilton'
          },
          teatro: {
            tid: 'teatro-super-opera',
            nombre: 'Teatro de la Súper Ópera'
          },
          fecha: '2019-02-20-18-00'
        }]
      },
      {
        oid: 'el-rey-leon',
        titulo: 'El Rey León',
        portada: require('@/assets/obras/el-rey-leon.png'),
        presentaciones: [{
          pid: 'el-rey-leon-teatro-super-opera-2019-02-20-21-30',
          obra: {
            oid: 'el-rey-leon',
            titulo: 'El Rey León'
          },
          teatro: {
            tid: 'teatro-super-opera',
            nombre: 'Teatro de la Súper Ópera'
          },
          fecha: '2019-02-20-21-30'
        }]
      },
      {
        oid: 'frozen',
        titulo: 'Frozen',
        portada: require('@/assets/obras/frozen.png'),
        presentaciones: [{
          pid: 'frozen-teatro-super-opera-2019-02-20-15-30',
          obra: {
            oid: 'frozen',
            titulo: 'Frozen'
          },
          teatro: {
            tid: 'teatro-super-opera',
            nombre: 'Teatro de la Súper Ópera'
          },
          fecha: '2019-02-20-15-30'
        }]
      },
      {
        oid: 'anastasia',
        titulo: 'Anastasia',
        portada: require('@/assets/obras/anastasia.png'),
        presentaciones: [{
          pid: 'anastasia-teatro-super-opera-2019-02-20-12-15',
          obra: {
            oid: 'anastasia',
            titulo: 'Anastasia'
          },
          teatro: {
            tid: 'teatro-super-opera',
            nombre: 'Teatro de la Súper Ópera'
          },
          fecha: '2019-02-20-12-15'
        }]
      }
    ]
  }
}