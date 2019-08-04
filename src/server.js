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

// const redirect = (req, res, destinationUrl) => {
//   const str = `Redirecting to ${destinationUrl}`

//   res.writeHead(302, {
//     Location: destinationUrl,
//     'Content-Type': 'text/plain',
//     'Content-Length': str.length
//   })

//   res.end(str)
// }

function hasSignedIn (req) {
  return req.session.user && req.cookies.uid
}
// middleware function to check for logged-in users
var sessionChecker = (req, res, next) => {
  console.log('sessionChecker url', req.url)
  if (!hasSignedIn(req) && req.url !== '/sign-in') {
    // console.log(req.url)
    // res.redirect('/sign-in')
  } else {
    next()
  }
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
  // .use(sessionChecker)
  .use(
    compression({ threshold: 0 }),
    sirv('static', { dev }),
    sapper.middleware({
      session: req => ({
        user: req.session && req.session.user
      })
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
