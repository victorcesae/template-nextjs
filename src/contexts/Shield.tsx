import axios from 'axios'
import { useRouter } from 'next/router'
import { useSession } from 'next-auth/client'
import { NextShield } from 'next-shield'
import { RoleAccess } from 'next-shield/dist/types/props'
import { ReactNode } from 'react'
import { useQuery } from 'react-query'

import { LayoutPublic } from '@/components'
import Logout from '@/pages/logout'

interface Children {
  children: ReactNode
}

type ShieldProps = {
  RBAC: RoleAccess<[]>
  privateRoutes: string[]
} | null

const Shield = ({ children }: Children) => {
  const [data, status] = useSession()
  const router = useRouter()
  const { data: shield, isFetching } = useQuery<ShieldProps>(
    ['getRBACList'],
    async () => {
      const response = await axios.get(`/api/shieldSettings`)
      return response.data
    },
    {
      staleTime: 1000 * 60 * 15 // 15 minutos
    }
  )
  if (shield && !isFetching) {
    const shieldProps = {
      LoadingComponent: null,
      RBAC: shield.RBAC,
      hybridRoutes: [
        '/logout',
        '/slides',
        '/powerbi/huntervendas',
        '/powerbi/relatorio_de_vendas',
        '/powerbi/financiamento'
      ],
      isAuth: !!data?.user?.name,
      isLoading: status,
      loginRoute: '/login',
      privateRoutes: shield.privateRoutes,
      publicRoutes: [''],
      router,
      userRole: data?.role as string
    }
    if (Object.keys(shieldProps.RBAC).includes(data?.role as string) || !data) {
      return <NextShield {...shieldProps}>{children}</NextShield>
    } else {
      return <Logout />
    }
  }
  if (!shield && !isFetching) {
    return <Logout />
  }
  return (
    <LayoutPublic title="Carregando...">
    </LayoutPublic>
  )
}
export { Shield }
