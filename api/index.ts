import { VercelRequest, VercelResponse } from '@vercel/node'
import playwright from '../utils/playwright'

module.exports = async (req: VercelRequest, res: VercelResponse) => {
  const response: any = await playwright(req.body)
  res.status(200).send(response)
}
