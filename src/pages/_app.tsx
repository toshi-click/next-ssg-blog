import { AppProps } from 'next/app'
import '../styles/index.css'
import 'tailwindcss/tailwind.css';
import usePageView from '@components/hooks/usePageView'

export default function MyApp({ Component, pageProps }: AppProps) {
  usePageView()
  return <Component {...pageProps} />
}
