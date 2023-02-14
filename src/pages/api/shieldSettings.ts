import axios from 'axios'
import { NextApiRequest, NextApiResponse } from 'next'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { method } = req
    if (method !== 'GET') {
      throw new Error('Method invalid')
    }
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/oauth/token`,
      new URLSearchParams({
        client_id: `${process.env.NEXT_PUBLIC_AUTH_ID_GENERATE_URLS_PRIVATE}`,
        client_secret: `${process.env.NEXT_PUBLIC_AUTH_SECRET_GENERATE_URLS_PRIVATE}`,
        grant_type: `${process.env.NEXT_PUBLIC_AUTH_TYPE_GENERATE_URLS_PRIVATE}`
      }),
      {
        headers: { 'Access-Control-Allow-Origin': '*' }
      }
    )
    const data = await response.data
    if (data?.access_token) {
      const responseSet = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/api/v1/setSettings`,
        {
          headers: {
            'Access-Control-Allow-Origin': '*',
            Authorization: `Bearer ${data?.access_token}`
          }
        }
      )
      return res.status(200).json((await responseSet?.data?.data) ?? undefined)
    }
    throw new Error('service unavailable')
  } catch (err) {
    res.status(500).json({ error: 'service unavailable' })
  }
}

export default handler
