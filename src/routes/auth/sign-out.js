export function post (req, res) {
  delete req.session.user
  res.clearCookie('uid')
  res.end(JSON.stringify({ ok: true }))
}
