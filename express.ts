import express from 'express'
import playwright from './utils/playwright'

const app = express()
const port = process.env.PORT || 8000

app.use(express.json())
app.use(express.urlencoded())

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html')
})

app.post('/api', async (req, res) => {
  const response = await playwright(req.body)
  res.status(200).send(response)
})

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${port}`)
})
