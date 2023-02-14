import { GetServerSideProps, GetServerSidePropsContext } from 'next'
import React from 'react'

import { LayoutPublic } from '@/components'

export const getServerSideProps: GetServerSideProps = async (
  _: GetServerSidePropsContext
) => {

  return {
    redirect: {
      destination: '/login',
      permanent: true
    }
  }
}
export default function Index() {
  return (
    <LayoutPublic title="Carregando...">
    </LayoutPublic>
  )
}
