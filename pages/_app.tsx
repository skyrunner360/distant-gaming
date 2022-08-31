import '../styles/globals.css'
import type { AppProps } from 'next/app'
import DrawerAppBar from '../Components/Navbar'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
    {/* aka Navbar */}
    <DrawerAppBar/> 
    <Component {...pageProps} />
    </>
  )
}

export default MyApp
