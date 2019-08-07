export function get (req, res) {
  const answer = {
    tags: [
      'butt',
      'dragons',
      'test',
      'training',
      'tags',
      'as',
      'coffee',
      'animation',
      'flowers',
      'caramel',
      'baby',
      'cars',
      'money',
      'happiness',
      'clean',
      'sushi',
      'japan',
      'sugar',
      'cookies',
      'well'
    ]
  }
  res.end(JSON.stringify(answer))
}
