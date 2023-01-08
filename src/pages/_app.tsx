import { NextComponentType, NextPageContext } from 'next'
import { Provider as AuthProvider } from 'next-auth/client'
import { ThemeProvider } from 'next-themes'
import NextNprogress from 'nextjs-progressbar'
import { QueryClientProvider } from 'react-query'
import { ToastContainer } from 'react-toastify'

import 'react-toastify/dist/ReactToastify.min.css'
import '../styles/global.css'

import { queryClient } from '@/lib/queryClient'
type AppProps = {
  pageProps: any
  Component:
    | (NextComponentType<NextPageContext, any, Record<string, unknown>> & {
        layoutProps: any
      })
    | any
}
function App({ Component, pageProps }: AppProps) {
  const removeSpinner = { showSpinner: false }
  return (
    <AuthProvider session={pageProps.session}>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        value={{
          dark: 'dark',
          light: 'light'
        }}
      >
        {/* <Shield> </Shield> */} {/* WITH RBAC */ }
        <NextNprogress
            color="var(--colors-primary)"
            startPosition={0.3}
            stopDelayMs={200}
            height={5}
            options={removeSpinner}
          />
          <QueryClientProvider client={queryClient}>
            <Component {...pageProps} />
          </QueryClientProvider>
      </ThemeProvider>
      <ToastContainer />
    </AuthProvider>
  )
}

export default App
