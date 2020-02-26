module.exports = {
  get (nodeEnv) {
    return Object.assign({}, getEnvironment())[nodeEnv.toLowerCase()]
  }
}

function getEnvironment () {
  return {
    production: {
      PORT: 8080,
      baseUrl: `https://blog.sebastiansastre.co`
      // baseUrl: `https://sebastiansastre.co`
      // baseUrl: `http://seb-miniblog-5klzibstra-uc.a.run.app`
    },
    development: {
      baseUrl: `http://localhost:3000`
    }
  }
}
