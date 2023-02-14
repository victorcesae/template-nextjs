import { signOut } from 'next-auth/client'

import { LayoutPublic } from '@/components'
export default function Logout() {
  // fazer um vc foi deslogado sera direcionado para o login em 5.4.3 timer
  async function exit() {
    await signOut({
      callbackUrl: '/login',
      redirect: true
    })
  }
  exit()

  return (
    <LayoutPublic title="Carregando...">
    </LayoutPublic>
  )
}
