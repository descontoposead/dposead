import scraper from 'osmosis'

export default (req, res) => {
  let data

  const {
    query: { page },
  } = req

  scraper
    .get('https://www.faculdadeunicaposgraduacao.com.br/pos-graduacao/', {
      pg: page || 1,
    })
    .find('.graduacao > .items')
    .set({
      courses: scraper
        .find('a')
        .set('name', 'h3.name')
        .set('hours', 'span.duration')
        .set(
          '_detail',
          (link) => '/api/courses&link=' + link.getAttribute('href')
        ),
    })
    .data((scrpData) => (data = scrpData))
    .done(() =>
      data.courses.length
        ? res.status(200).json(data.courses)
        : res.status(404).json([])
    )
}
