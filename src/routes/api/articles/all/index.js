export async function get (req, res) {
  const prefix = new Date()
    .toISOString()
    .replace(/T/, ' ') // replace T with a space
    .replace(/\..+/, '')
    .split(' ')[0]
    .replace(/-/g, '.')

  const file = `db/articles.json`
  res.download(file, `${prefix}.articles.json`)
}
