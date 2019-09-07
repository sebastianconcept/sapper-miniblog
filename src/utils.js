export function post (endpoint, data) {
  return fetch(endpoint, {
    method: 'POST',
    credentials: 'include',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json'
    }
  }).then(r => r.json())
}

// https://stackoverflow.com/a/13052187/485081
Date.prototype.toDateInputValue = function () {
  var local = new Date(this)
  local.setMinutes(this.getMinutes() - this.getTimezoneOffset())
  return local.toJSON().slice(0, 10)
}
