import { VercelRequest, VercelResponse } from '@vercel/node'
import playwright from '../utils/playwright'

module.exports = async (req: VercelRequest, res: VercelResponse) => {
  const response: any = await playwright(req.body)

  if (response.status === 400) {
    res.status(400).json(response)
  } else {
    res.status(200).json(response)
  }
}
