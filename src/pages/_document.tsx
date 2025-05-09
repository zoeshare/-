import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <script type="text/javascript" src="http://api.tianditu.gov.cn/api?v=4.0&tk=6fa31cea60680375feb4a8637a07cd88"></script>
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
} 