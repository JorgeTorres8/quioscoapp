import '../styles/globals.css'
import { QuioscoProvider } from '../context/QuioscoProvider'
function MyApp({ Component, pageProps }) { //mod agg el provider

  return (
    <QuioscoProvider>
      <Component {...pageProps} />
      <script src="//cdn.jsdelivr.net/npm/sweetalert2@11"></script>
    </QuioscoProvider>
  );

}

export default MyApp
