import { useSession } from 'next-auth/client'
import { useTheme } from 'next-themes'
import React from 'react'

import { SEO } from '@/components/atoms/SEO'
import { SEOProps } from '@/typings/SEO/SEOProps'

import * as S from './styles'
export interface Session {
  user: {
    name: string
    email: string
    image: string
  }
  id: number
  role: string
  permissions: Array<string>
  email: string
  username: string
  jwt: string
  role_forHumans: string | null
  error: string | undefined
}
type LayoutPrivateProps = SEOProps & {
  style?: React.CSSProperties
}
const LayoutPrivate: React.FC<LayoutPrivateProps> = ({
  children,
  style,
  ...rest
}) => {
  const [data]: Session | any = useSession()
  const [openSidebar, setOpenSidebar] = React.useState(false)
  const { setTheme } = useTheme()


  return (
    <S.Wrapper onLoad={() => setTheme('light')} style={style}>
      {data ? (
        <>
          <SEO {...rest} />
          <S.Main
            onClick={() => {
              openSidebar !== false && setOpenSidebar(!openSidebar)
            }}
            className={openSidebar ? 'main openSidebar' : 'main'}
          >
            <S.Content>{children}</S.Content>
          </S.Main>
        </>
      ) : (
        <p>Sem usuario logado</p>
      )}
    </S.Wrapper>
  )
}

export { LayoutPrivate }
