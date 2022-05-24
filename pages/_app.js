import '../styles/globals.css'
import Head from 'next/head'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { Provider } from 'react-redux'
import { CookiesProvider } from "react-cookie"
import store from './store'


library.add(fab)



function MyApp({ Component, pageProps }) {
  return (
 <>
 <Provider store={store}>
  <Head>
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous"></link>
  
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@5.15.4/css/fontawesome.min.css" integrity="sha384-jLKHWM3JRmfMU0A5x5AkjWkw/EYfGUAGagvnfryNV3F9VqM98XiIH7VBGVoxVSc7" crossorigin="anonymous"/> 
  <link rel="stylesheet" href="https://unpkg.com/primeicons/primeicons.css" />
    <link rel="stylesheet" href="https://unpkg.com/primereact/resources/themes/lara-light-indigo/theme.css" />
    <link rel="stylesheet" href="https://unpkg.com/primereact/resources/primereact.min.css" />
    <link rel="stylesheet" href="https://unpkg.com/primeflex@2.0.0/primeflex.min.css" />

    
    <script src="https://unpkg.com/react/umd/react.production.min.js"></script>
    <script src="https://unpkg.com/react-dom/umd/react-dom.production.min.js"></script>
    <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
    <script src="https://unpkg.com/react-transition-group@4.4.2/dist/react-transition-group.js"></script>
    <script src="//cdnjs.cloudflare.com/ajax/libs/numeral.js/2.0.6/numeral.min.js"></script>

<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-ka7Sk0Gln4gmtz2MlQnikT1wXgYsOg+OMhuP+IlRH9sENBO0LRn5q+8nbTov4+1p" crossorigin="anonymous"></script>
  </Head>
  <CookiesProvider>
   <Component {...pageProps} />
   </CookiesProvider>
   </Provider>

  </>

  )


}

export default MyApp
