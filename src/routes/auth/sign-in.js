const validEmail = process.env.BLOG_EMAIL || 'guy@example.com'
const validPassword = process.env.BLOG_PASSWORD || '123456'

export function post (req, res) {
  const credentials = req.body

  if (hasValidCredentials(credentials)) {
    res.setHeader('Content-Type', 'application/json')
    req.session.user = { email: validEmail }
    res.end(
      JSON.stringify({
        user: req.session.user
      })
    )
  } else {
    return res.end(JSON.stringify({ errors: { login: 'failed' } }))
  }
}

function hasValidCredentials (credentials) {
  return (
    credentials.email === validEmail && credentials.password === validPassword
  )
}
