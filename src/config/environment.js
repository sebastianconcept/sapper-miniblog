module.exports = {
  get (nodeEnv) {
    return Object.assign({}, getEnvironment())[nodeEnv.toLowerCase()]
  }
}

function getEnvironment () {
  return {
    production: {
      baseUrl: `https://blog.sebastiansastre.co`
    },
    development: {
      baseUrl: `http://localhost:3000`
    }
  }
}
