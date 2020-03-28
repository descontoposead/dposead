const goToNext = (
  opts = {
    inputEl: null,
    inputGroup: null,
    setNextFn: null,
    vibrateFn: null,
  }
) => (e) => {
  e.preventDefault()

  if (opts.hasOwnProperty('inputEl')) {
    let isValid = opts.inputEl().value

    if (!isValid) {
      opts.inputEl().classList.add('error')
      opts.vibrateFn()
    } else {
      opts.setNextFn()
    }
  }

  if (opts.hasOwnProperty('inputGroup')) {
    const invalidInputGroup = opts.inputGroup
      .map((inputEl) => {
        inputEl().classList.remove('error')
        return inputEl
      })
      .filter((inputEl) => !inputEl().value)
    if (invalidInputGroup.length) {
      invalidInputGroup.map((inputEl) => inputEl().classList.add('error'))
      opts.vibrateFn()
    } else {
      opts.setNextFn()
    }
  }
}

export default goToNext
