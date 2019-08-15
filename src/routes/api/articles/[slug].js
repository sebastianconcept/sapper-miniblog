import { db } from '../../../db'

export async function get (req, res) {
  const { slug } = req.params
  const found = await db.articles.findOne({ slug })
  if (found) {
    res.end(JSON.stringify(found))
  } else {
    res.end(null)
  }
}
