import scraper from 'osmosis'

export default (req, res) => {
  let data

  const {
    query: { link },
  } = req

  if (!link) {
    return res.status(400).json({
      link: 'required',
      example: '/api/courses&link=example.com',
    })
  }

  scraper
    .get(link)
    .find('#grades')
    .set({
      grades: scraper
        .find('.discipline')
        .set('discipline', 'td:first-child')
        .set('hours', 'td:last-child'),
    })
    .data(
      (scrpData) =>
        (data = scrpData.grades.map(({ discipline, hours }) => ({
          discipline: discipline.replace(/(\*|\t|\n)(=?\s.)/g, ''),
          hours: hours,
        })))
    )
    .done(() => res.status(200).json(data))
}
