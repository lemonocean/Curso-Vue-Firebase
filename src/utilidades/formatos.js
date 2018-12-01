const generarFormatoFecha = (fecha, separador, incluirHora) => {
  let dd = fecha.getDate().toString()
  let MM = (fecha.getMonth() + 1).toString()
  let yyyy = fecha.getFullYear().toString()

  if (dd.length == 1) {
    dd = '0' + dd
  }

  if (MM.length == 1) {
    MM = '0' + MM
  }

  let formato = yyyy + separador + MM + separador + dd

  if (incluirHora) {
    let hh = fecha.getHours().toString()
    let mm = fecha.getMinutes().toString()

    if (hh.length == 1) {
      hh = '0' + hh
    }

    if (mm.length == 1) {
      mm = '0' + mm
    }

    formato += separador + hh + separador + mm
  }

  return formato
}

const generarFormatoHora = fecha => {
  let hh = fecha.getHours().toString()
  let mm = fecha.getMinutes().toString()

  if (hh.length == 1) {
    hh = '0' + hh
  }

  if (mm.length == 1) {
    mm = '0' + mm
  }
  
  return hh + ':' + mm
}

export { generarFormatoFecha, generarFormatoHora }