const express = require('express')
const cors = require('cors')
const apiService = require('./apiService')

const app = express()
const port = 3000

let cptNbRequest = 0

app.use(cors())

app.use(express.urlencoded({
  extended: true,
}))

app.use(express.json()) // To parse the incoming requests with JSON payloads

app.post('/api', (req, res) => {
  const dataCreation = req.body

  const headersApi = apiService.checkHeadersParam(dataCreation.headers)

  const routesApi = apiService.checkRouteParam(dataCreation.routes)

  const codeGenerate = apiService.determineCode(
    dataCreation.language, dataCreation.port, headersApi, routesApi,
  )

  // Update nb of request and log it
  cptNbRequest += 1
  console.log(`Nb request : ${cptNbRequest}`)
  res.send({
    text_code: codeGenerate,
  })
})

app.post('/register_mail', (req, res) => {
  const bodyContent = req.body
  console.log(bodyContent)

  res.sendStatus(200)
})

app.listen(port, () => console.log(`Hello world app listening on port ${port}!`))
