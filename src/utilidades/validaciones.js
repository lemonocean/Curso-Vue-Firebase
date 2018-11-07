const nombreCompuesto = value => {
  if(value === undefined || value === null || value === '') {
    return true
  }

  return /^(?! )(?!.*  )[a-zA-ZáéíóúÁÉÍÓÚüÜñÑ ]+$/.test(value)
}

export { nombreCompuesto }