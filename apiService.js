const nodejsCodeService = require('./nodejsCodeService')

const apiService = {
  checkHeadersParam: (headerParam) => {
    // Determine accept parameter
    let acceptHeader

    switch (headerParam.accept) {
      case 'application/json':
        acceptHeader = 'json'
        break
      default:
        Error('Unknow header param for accept')
    }

    // Determine accept parameter
    let corsHeader

    switch (headerParam.cors) {
      case 'standard':
        corsHeader = 'standard'
        break
      default:
        Error('Unknow header param for cors')
    }

    const headerApi = {
      accept: acceptHeader,
      cors: corsHeader,
    }

    return headerApi
  },

  checkRouteParam: (routeParam) => {
    // Determine type of route
    const routes = []

    routeParam.forEach((route) => {
      const { type, url, object } = route
      const newRoute = { url: `/${url}`, object }
      switch (type) {
        case 'get':
          newRoute.type = 'GET'
          break
        case 'post':
          newRoute.type = 'POST'
          break
        case 'put':
          newRoute.type = 'PUT'
          break
        case 'delete':
          newRoute.type = 'DELETE'
          break
        default:
          Error('unknow route param for type')
      }

      routes.push(newRoute)
    })

    return routes
  },

  determineCode: (lang, port, headerParam, routeParam) => {
    let code

    switch (lang) {
      case 'nodejs':
        code = nodejsCodeService.generate(port, headerParam, routeParam)
        break
      default:
        Error('unknow code param for lang')
    }

    return code
  },
}

module.exports = apiService
