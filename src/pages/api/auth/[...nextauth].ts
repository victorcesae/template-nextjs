import { NextApiRequest, NextApiResponse } from 'next'
import NextAuth, { Account, NextAuthOptions, Session, User } from 'next-auth'
import Providers from 'next-auth/providers'

async function refreshAccessToken(token: any) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/oauth/token`,
      {
        body: new URLSearchParams({
          client_id: `${process.env.NEXT_PUBLIC_AUTH_ID}`,
          client_secret: `${process.env.NEXT_PUBLIC_AUTH_SECRET}`,
          grant_type: `refresh_token`,
          refresh_token: token.refreshToken
        }),
        headers: {
          Accept: 'application/json',
          'Access-Control-Allow-Origin': '*'
        },
        method: 'POST'
      }
    )

    const refreshedTokens = await response.json()
    if (refreshedTokens.error || response.status !== 200) {
      throw new Error('Token invalid')
    }

    const expires = new Date()
    expires.setSeconds(expires.getSeconds() + refreshedTokens.expires_in - 10)
    return {
      ...token,
      accessTokenExpires: expires,
      jwt: refreshedTokens.access_token,
      refreshToken: refreshedTokens.refresh_token ?? token.refreshToken // Fall back to old refresh token
    }
  } catch (error) {
    return {
      ...token,
      error: 'RefreshAccessTokenError'
    }
  }
}

type TokenProps = {
  accessTokenExpires: number
  email: string
  id: number
  image: string
  jwt: string
  permissions: string[]
  refreshToken: string
  role: string
  role_forHumans: string
  username: string
  error?: string
  name: string
}

const options: NextAuthOptions = {
  callbacks: {
    jwt: async (
      token: TokenProps,
      user: User,
      account: Account | undefined
    ) => {
      if (account && user) {
        token.id = user.id as number
        token.email = user.email as string
        token.username = user.username as string
        token.role = user.role as string
        token.role_forHumans =
          (user.role_forHumans as string) ?? token.role_forHumans
        token.accessTokenExpires =
          (user.accessTokenExpires as number) ?? token.accessTokenExpires
        token.jwt = (user.jwt as string) ?? token.jwt
        token.image = user.image as string
        token.refreshToken = (user.refreshToken as string) ?? token.refreshToken
        token.name = user.name as string
      }
      // Return previous token if the access token has not expired yet
      return await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/v1/verifyIfIsValidToken`,
        {
          headers: {
            Accept: 'application/json',
            'Access-Control-Allow-Origin': '*',
            Authorization: `Bearer ${token.jwt}`
          },
          method: 'GET'
        }
      )
        .then((response: Response) => {
          if (response.status !== 200) {
            throw new Error('Error Ocurred!')
          }
          return Promise.resolve(token)
        })
        .catch(() => {
          return Promise.resolve(refreshAccessToken(token))
        })
    },
    session: async (session: Session, token: TokenProps) => {
      session.user = {
        ...session.user,
        email: token.email,
        image: token.image,
        name: token.name
      }
      session.jwt = token.jwt
      session.id = token.id
      session.email = token.email
      session.username = token.username
      session.role = token.role
      session.role_forHumans = token.role_forHumans
      session.error = token?.error

      return Promise.resolve(session)
    }
  },
  pages: {
    error: '/login',
    signIn: '/'
  },
  providers: [
    Providers.Credentials({
      async authorize({ username, password }: any) {
        return await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/oauth/token`,
          {
            body: new URLSearchParams({
              client_id: `${process.env.NEXT_PUBLIC_AUTH_ID}`,
              client_secret: `${process.env.NEXT_PUBLIC_AUTH_SECRET}`,
              grant_type: `${process.env.NEXT_PUBLIC_AUTH_TYPE}`,
              password,
              username
            }),
            headers: {
              Accept: 'application/json',
              'Access-Control-Allow-Origin': '*'
            },
            method: 'POST'
          }
        )
          .then(async (response: Response) => {
            const data = await response.json()
            if (data.access_token) {
              const expires = new Date()
              expires.setSeconds(expires.getSeconds() + data.expires_in - 10)
              return {
                ...data.user,
                accessTokenExpires: expires,
                jwt: data.access_token,
                refreshToken: data.refresh_token
              }
            }
            return null
          })
          .catch(() => {
            return null
          })
      },
      credentials: {},
      name: 'Sign-in'
    })
  ]
}

const Auth = (req: NextApiRequest | any, res: NextApiResponse | any) =>
  NextAuth(req, res, options)

export default Auth
