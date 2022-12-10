const express = require('express')
const playwright = require('./playwright')
require('dotenv').config()

const app = express()
const port = process.env.PORT || 8000

app.use(express.json())
app.use(express.urlencoded())

app.post('/api', async (req, res) => {
  const response = await playwright(req.body)
  if (response.status === 400) {
    res.status(400).send(response)
  } else {
    res.send(response)
  }
})
app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${port}`)
})
