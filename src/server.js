import sirv from 'sirv'
import express from 'express'
import compression from 'compression'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import session from 'express-session'
import sessionFileStore from 'session-file-store'
import * as sapper from '@sapper/server'

const app = express()
const FileStore = sessionFileStore(session)

const { PORT, NODE_ENV } = process.env
const dev = NODE_ENV === 'development'

function hasSignedIn (req) {
  return req.session.user && req.cookies.uid
}

app
  .use(bodyParser.json())
  .use(
    session({
      key: 'uid',
      secret: 'miniblog',
      resave: false,
      saveUninitialized: true,
      cookie: {
        maxAge: 31536000
      },
      store: new FileStore({
        path: process.env.NOW ? `/tmp/sessions` : `.sessions`
      })
    })
  )
  // initialize cookie-parser to allow us access the cookies stored in the browser.
  .use(cookieParser())
  .use(
    compression({ threshold: 0 }),
    sirv('static', { dev }),
    sapper.middleware({
      session: req => {
        /** Stores the initial path to redirect after the sign-in guard */
        !req.session.initialPath ? (req.session.initialPath = req.path) : null
        return {
          user: req.session && req.session.user,
          initialPath: req.session && req.session.initialPath
        }
      }
    })
  )
  /**
   * This middleware will check if user's cookie is still saved
   * in the browser and username is not set, then automatically log the user out.
   * This usually happens when you stop your express server after login,
   * your cookie still remains saved in the browser.
   */
  .use((req, res, next) => {
    if (req.cookies.uid && !req.session.user) {
      res.clearCookie('uid')
    }
    next()
  })
  .listen(PORT, err => {
    if (err) console.log('error', err)
  })
