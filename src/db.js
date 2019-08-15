import { datastore } from 'nedb-promise'

const dataPath = process.env.BLOG_DB_PATH || './db'

export const db = {}

db.articles = datastore({
  filename: `${dataPath}/articles.json`,
  autoload: true
})
