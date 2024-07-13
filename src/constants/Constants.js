// export const DISYMBOL = "&symbol=DI"
// import {EXISTINGACCURL as NEWACCURL} from './constants'

import { useEffect } from 'react';

export const limit = 1000;
export const BASE_URL =
  //   "https://5ho90yypzh.execute-api.us-east-1.amazonaws.com/api/v2";
  'https://0wb4i9f3m5.execute-api.us-east-1.amazonaws.com/api/v2';
//   "http://k8s-default-mainingr-63f836edef-504885888.us-east-1.elb.amazonaws.com/api/v2"

const urls = [
  'https://qf76c1kzcj.execute-api.us-east-1.amazonaws.com',
  'https://ps-asde-ggn-batch3-frontend-assets.s3.amazonaws.com',
  'https://developer.apple.com',
  'https://play.google.com'
];

function ResourceHints() {
  useEffect(() => {
    const cleanup = [];

    urls.forEach((url) => {
      const dnsPrefetch = document.createElement('link');
      dnsPrefetch.rel = 'dns-prefetch';
      dnsPrefetch.href = url;

      const preconnect = document.createElement('link');
      preconnect.rel = 'preconnect';
      preconnect.href = url;
      preconnect.crossOrigin = 'anonymous'; // Use "use-credentials" if credentials are involved

      document.head.appendChild(dnsPrefetch);
      document.head.appendChild(preconnect);

      cleanup.push(() => {
        document.head.removeChild(dnsPrefetch);
        document.head.removeChild(preconnect);
      });
    });

    return () => {
      cleanup.forEach((cleanupFn) => cleanupFn());
    };
  }, []);

  return null;
}

export default ResourceHints;

export const trendingPlansUrl =
  'https://qf76c1kzcj.execute-api.us-east-1.amazonaws.com/v2-trending/excitel-bucket/trendPlans.json';
