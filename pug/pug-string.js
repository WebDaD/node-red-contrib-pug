var pug = require('pug')
module.exports = function (RED) {
  function pugStringNode (config) {
    RED.nodes.createNode(this, config)

    this.name = config.name
    this.options = config.options
    var node = this

    node.on('input', function (msg) {
      // Options
      var options = {}
      node.options.forEach(function (option) {
        var value = RED.util.evaluateNodeProperty(option.value, option.value_type, node, null)
        options[option.key] = value
      })
      for (var option in msg.options) {
        if (msg.options.hasOwnProperty(option)) {
          options[option] = msg.options[option]
        }
      }
      msg.payload = pug.render(msg.payload, options)
      msg.html = msg.payload
      node.send(msg)
    })
  }

  RED.nodes.registerType('pug-string', pugStringNode)
}
