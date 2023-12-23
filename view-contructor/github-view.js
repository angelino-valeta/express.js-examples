'use strict'


const https = require('https')
const path = require('path')
const extname = path.extname

module.exports = GithubView


/**
 * Custom view that fetches and renders
 * remove github templates. You could
 *  render templates from a database etc.
 */


function GithubView(name, options) {
  this.name = name
  options = options || {}
  this.engine = options.engines[extname(name)]
  // "root" is the app.set('view') setting, however
  // in your own implementation you could ignore this
  this.path = '/' + options.root + '/master/' + name
}

/**
 * Render the view
 */

GithubView.prototype.render = function (options, fn) {
  var self = this
  var opt = {
    host: 'raw.githubusercontent.com',
    port: 443,
    path: this.path,
    method: 'GET'
  }

  https.request(opt, function (res) {
    var buff = ''
    res.setEncoding('utf-8')
    res.on('data', function (str) { buf += str })
    res.on('end', function () {
      self.engine(buf, options, fn)
    })
  }).end()
}
