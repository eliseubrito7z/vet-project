import { Box, ChakraProvider, Flex, Spinner } from '@chakra-ui/react'
import { Hydrate, QueryClientProvider } from '@tanstack/react-query'
import type { AppProps } from 'next/app'
import { IntlProvider } from 'react-intl'
import { VetContextProvider } from '../context/VetContext'
import { queryClient } from '../services/react-query'
import { defaultTheme } from '../styles/theme/defaultTheme'

import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { Sidebar } from '../components/navigation/Sidebar'

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const loginPage = router.asPath === '/login'

  useEffect(() => {
    const handleStart = (url: string) => setLoading(true)
    const HandleCompleted = (url: string) => setLoading(false)

    router.events.on('routeChangeStart', handleStart)
    router.events.on('routeChangeComplete', HandleCompleted)
    router.events.on('routeChangeError', HandleCompleted)

    return () => {
      router.events.off('routeChangeStart', handleStart)
      router.events.off('routeChangeComplete', HandleCompleted)
      router.events.off('routeChangeError', HandleCompleted)
    }
  }, [])

  return (
    <QueryClientProvider client={queryClient}>
      <IntlProvider locale="br">
        <VetContextProvider>
          <ChakraProvider theme={defaultTheme}>
            <Hydrate state={pageProps.dehydratedState}>
              {loading && loginPage ? (
                <Flex w="100vw" h="100vh" justify="center" align="center">
                  <Spinner />
                </Flex>
              ) : (
                <Flex w="100vw" h="100vh">
                  {!loginPage && <Sidebar />}
                  {loading ? (
                    <Flex w="100vw" h="100vh" justify="center" align="center">
                      <Spinner />
                    </Flex>
                  ) : (
                    <>
                      <Box
                        w="100%"
                        h="100vh"
                        // ['0 1rem', '0.25rem 1rem 1rem 2.5rem']
                        overflow="auto"
                      >
                        <Component {...pageProps} />
                      </Box>
                    </>
                  )}
                </Flex>
              )}
            </Hydrate>
          </ChakraProvider>
        </VetContextProvider>
      </IntlProvider>
    </QueryClientProvider>
  )
}
