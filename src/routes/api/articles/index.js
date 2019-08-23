import { db } from '../../../db'
import slugify from 'slugify'
import { remove as removeDiacritics } from 'diacritics'

export async function get (req, res) {
  const { selection, filter, limit, offset } = req.query
  if (!limit || !offset) {
    return res.end(JSON.stringify({ articles: [], articlesCount: 0 }))
  }
  const answer = await getArticles(
    selection,
    filter,
    parseInt(limit),
    parseInt(offset)
  )
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

export async function getArticles (selection, filterTarget, limit, offset) {
  let query
  if (selection === 'all') {
    query = {} // all
  } else if (selection === 'published') {
    query = { publishedAt: { $exists: true } }
  } else if (selection === 'drafts') {
    query = { publishedAt: { $exists: false } }
  }
  const all = await db.articles.find(query)
  const articles = all.filter(article => isArticleMatch(article, filterTarget))
  const start = offset
  const end = start + limit
  const filteredArticles = articles.slice(start, end)
  return {
    articles: filteredArticles,
    articlesCount: filteredArticles.length
  }
}

function isArticleMatch (article, filterTarget) {
  return ['title', 'subtitle', 'body'].some(propertyName =>
    !filterTarget
      ? true
      : !!removeDiacritics(article[propertyName])
        .toLowerCase()
        .match(
          new RegExp(`.*${removeDiacritics(filterTarget).toLowerCase()}.*`)
        )
  )
}
