import express, { Express, Request, Response } from 'express'

import dotenv from 'dotenv'
import playwright from './playwright'

dotenv.config()

const app: Express = express()
const port = process.env.PORT || 8000

app.use(express.json())
app.use(express.urlencoded())

app.post('/api', async (req: Request, res: Response) => {
  const response: any = await playwright(req.body)

  if (response.status === 400) {
    res.status(400).send(response)
  } else {
    res.send(response)
  }
})

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${port}`)
})
