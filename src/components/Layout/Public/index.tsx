import { useTheme } from 'next-themes'
import React from 'react'

import { SEO } from '@/components/atoms/SEO'
import { SEOProps } from '@/typings/SEO/SEOProps'

import * as S from './styles'

const LayoutPublic: React.FC<SEOProps> = ({ children, ...rest }) => {
  const { setTheme } = useTheme()

  return (
    <S.Wrapper onLoad={() => setTheme('light')}>
      <SEO {...rest} />
      <S.Content>{children}</S.Content>
    </S.Wrapper>
  )
}

export { LayoutPublic }
