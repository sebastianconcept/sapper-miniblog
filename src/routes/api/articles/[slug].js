import { getArticles } from '.'

export function get (req, res) {
  const answer = getArticle(req.params.slug)
  res.end(JSON.stringify(answer))
}

function getArticle (slug) {
  return {
    article: getArticles('all').articles.find(e => e.slug === slug)
  }
}
