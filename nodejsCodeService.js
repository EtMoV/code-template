const nodejsCodeService = {
  generate: (port, headerParam, routeParam) => {
    // Add start code
    let stringCode = `const express = require('express');
    const cors = require('cors');\n
    const app = express();
    const port = ${port};\n
    `

    const codeHeader = nodejsCodeService.generateHeader(headerParam)
    const codeRoute = nodejsCodeService.generateRoute(routeParam)

    // Add header and route code
    stringCode += `${codeHeader}${codeRoute}`

    // Add end code
    // eslint-disable-next-line no-template-curly-in-string
    stringCode += 'app.listen(port, () => console.log(`Hello world app listening on port ${port}!`));\n'

    return stringCode
  },

  generateHeader: (headerParam) => {
    // Add cors code
    let codeCors

    switch (headerParam.cors) {
      case 'standard':
        codeCors = 'app.use(cors());\n'
        break
      default:
        Error('Unknow header param for cors in nodejs generation')
    }

    // Add accept code
    let codeAccept

    switch (headerParam.accept) {
      case 'json':
        codeAccept = 'app.use(express.urlencoded({extended: true}));\napp.use(express.json());\n\n'
        break
      default:
        Error('Unknow header param for accept in nodejs generation')
    }

    // Concat code generate
    const stringHeader = codeCors + codeAccept

    return stringHeader
  },

  generateRoute: (routeParam) => {
    let stringRoute = ''
    const todoString = '/*PUT YOUR CODE HERE*/'
    /* `
              \t/*
              \t\tPUT YOUR CODE HERE
              \t\t- use req.body to get data from request's body
              \t\t- use res.send(YOUR OBJECT) to send data by response's body
              \t */
    // `

    routeParam.forEach((route) => {
      console.log(route)
      switch (route.type) {
        case 'GET':
          stringRoute += `app.get('${route.url}', (req, res) => {${todoString}});\n\n`
          break
        case 'POST':
          stringRoute += `app.post('${route.url}', (req, res) => {${todoString}});\n\n`
          break
        case 'PUT':
          stringRoute += `app.put('${route.url}', (req, res) => {${todoString}});\n\n`
          break
        case 'DELETE':
          stringRoute += `app.delete('${route.url}', (req, res) => {${todoString}});\n`
          break
        default:
          Error('Unknow route type param for route in nodejs generation')
      }
    })

    return stringRoute
  },
}

module.exports = nodejsCodeService
