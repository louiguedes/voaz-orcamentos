// ─── pages/_app.js ────────────────────────────────────────────────
import '../styles/globals.css'
import Head from 'next/head'

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>VOAZ Orçamentos</title>
        <meta name="application-name" content="VOAZ Orçamentos" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="VOAZ" />
        <meta name="theme-color" content="#1a1a1a" />
        <link rel="icon" href="/logo-voaz.png" />
        <link rel="apple-touch-icon" href="/logo-voaz.png" />
        <link rel="manifest" href="/manifest.json" />
      </Head>
      <Component {...pageProps} />
    </>
  )
}

// ─── styles/globals.css ───────────────────────────────────────────
// (salve em styles/globals.css)
/*
@tailwind base;
@tailwind components;
@tailwind utilities;

body { font-family: Arial, sans-serif; background: #f5f5f5; }

.btn-primary {
  @apply bg-black text-white font-bold py-2 px-4 rounded hover:bg-gray-800 transition;
}
.btn-secondary {
  @apply bg-white text-black border border-gray-300 font-bold py-2 px-4 rounded hover:bg-gray-100 transition;
}
.input-field {
  @apply border border-gray-300 rounded px-3 py-2 w-full text-sm focus:outline-none focus:ring-2 focus:ring-black;
}
.table-header {
  @apply bg-gray-800 text-white text-xs font-bold uppercase px-3 py-2 text-left;
}
.group-header {
  @apply bg-gray-200 text-gray-800 text-xs font-bold px-3 py-2;
}
.discipline-header {
  @apply bg-gray-800 text-white text-sm font-bold px-3 py-2;
}
*/