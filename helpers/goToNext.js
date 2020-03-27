const goToNext = (
  opts = { inputEl: null, setNextFn: null, vibrateFn: null }
) => (e) => {
  e.preventDefault()

  const isValid = opts.inputEl.value

  if (!isValid) {
    opts.inputEl.classList.add('error')
    opts.vibrateFn()
  } else {
    opts.setNextFn()
  }
}

export default goToNext
