import Head from 'next/head'
import React from 'react'

import { SEOProps } from '@/typings/SEO/SEOProps'

const SEO: React.FC<SEOProps> = ({ description, title }) => (
  <Head>
    <title>Modelo | {title}</title>
    <meta property="og:type" content="website" />
    <meta name="og:title" property="og:title" content={title} />
    <meta
      name="og:description"
      property="og:description"
      content={description}
    />
    {/*  <meta property="og:site_name" content="" />
    <meta property="og:url" content="" /> */}
    <meta property="og:image" content="" />
    <link rel="icon" type="image/png" href="/img/icon-192.jpg" />
    <link rel="apple-touch-icon" type="image/jpg" href="/img/icon-192.jpg" />
  </Head>
)


export { SEO }
