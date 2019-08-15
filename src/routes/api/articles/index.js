import { db } from '../../../db'
import slugify from 'slugify'

export async function get (req, res) {
  const selection = req.query.selection
  const answer = await getArticles(selection)
  res.end(JSON.stringify(answer))
}

export async function post (req, res) {
  const article = req.body
  const query = { _id: article._id }
  updateSlug(article)
  article.updatedAt = new Date()
  const result = await db.articles.update(query, article, { upsert: true })
  let answer
  if (typeof result === 'number') {
    answer = article._id
  } else {
    answer = result[1]._id
  }
  res.end(JSON.stringify(answer))
}

function updateSlug (article) {
  article.slug = slugify(article.title, {
    replacement: '-',
    remove: /[?¿*+~.()'"¡❞❝…;❛❜˚^!:@]/g,
    lower: true
  })
}

export async function getArticles (selection) {
  let query
  if (selection === 'all') {
    query = {} // all
  } else if (selection === 'published') {
    query = { publishedAt: { $exists: true } }
  } else if (selection === 'drafts') {
    query = { publishedAt: { $exists: false } }
  }
  const articles = await db.articles.find(query)

  console.log('query', query)
  console.log('articles', articles)
  return {
    articles: articles,
    articlesCount: articles.length
  }
}
