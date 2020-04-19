const goToNext = (
  opts = {
    inputEl: null,
    inputGroup: null,
    navigationByStep: null,
    vibrateOnError: null,
  }
) => (e) => {
  e.preventDefault()

  //validate on one input step
  if (opts.hasOwnProperty('inputEl')) {
    opts.inputEl().classList.remove('empty-value-error', 'invalid-value-error') //clean

    opts.validatorEmpty = () => [!!opts.inputEl().value, 'empty-value-error']

    if (!opts.hasOwnProperty('validator')) {
      opts.validator = opts.validatorEmpty
    }

    const [isValid, errorClass] = !opts.inputEl().value
      ? opts.validatorEmpty()
      : opts.validator()

    if (!isValid) {
      opts.inputEl().classList.add(errorClass)
      opts.vibrateOnError()
    } else {
      opts.navigationByStep()
    }
  }

  //validate on group input step
  if (opts.hasOwnProperty('inputGroup')) {
    let hasErrors = false

    opts.inputGroup
      .map((inputControl) => {
        const control = inputControl()
        control.inputEl.classList.remove(
          'empty-value-error',
          'invalid-value-error'
        ) //clean

        control.validatorEmpty = () => [
          !!control.inputEl.value,
          'empty-value-error',
        ]

        if (!control.hasOwnProperty('validator')) {
          control.validator = control.validatorEmpty
        }

        return !control.inputEl.value
          ? {
              inputEl: control.inputEl,
              errors: control.validatorEmpty(),
            }
          : {
              inputEl: control.inputEl,
              errors: control.validator(),
            }
      })
      .forEach((validateInput) => {
        const [isValid, errorClass] = validateInput.errors
        if (!isValid) {
          hasErrors = true
          validateInput.inputEl.classList.add(errorClass)
          opts.vibrateOnError()
        }
      })

    if (!hasErrors) {
      opts.navigationByStep()
    }
  }
}

export default goToNext
