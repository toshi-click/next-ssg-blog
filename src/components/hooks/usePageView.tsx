import { useEffect } from 'react'
import { useRouter } from 'next/router'

import { GA_TRACKING_ID, pageview } from '@libs/gtag';

export default function usePageView() {
  const router = useRouter()

  useEffect(() => {
    // GA_TRACKING_ID が設定されていない場合は、処理終了
    if (!GA_TRACKING_ID) return;

    const handleRouteChange = (url: string) => {
      pageview(url);
    }

    router.events.on('routeChangeComplete', handleRouteChange)
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange)
    }
  }, [router.events])
}
