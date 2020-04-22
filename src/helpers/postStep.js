const postStep = (values, store = false) =>
  fetch('/api/students/steps', {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(values),
  })
    .then(async (res) => {
      if (res.status == 200 || res.status == 201) return await res.json()
      throw await res.json()
    })
    .then((data) => {
      if (store) {
        const values = JSON.parse(sessionStorage.getItem('values') || {})
        sessionStorage.setItem(
          'values',
          JSON.stringify(
            Object.assign(values, {
              email: data.email,
              name: data.name,
              phone: data.phone,
              whatsapp: data.whatsapp,
              personalDocument: data.personalDocument,
              personalRegistry: data.personalRegistry,
              stateOfBirth: data.stateOfBirth,
              cityOfBirth: data.cityOfBirth,
              dateOfBirth: data.dateOfBirth,
              parentName: data.parentName,
              motherName: data.motherName,
              graduation: data.graduation,
              dateOfGraduation: data.dateOfGraduation,
              address: data.address,
            })
          )
        )
      }

      return data
    })

export default postStep
