import Document, { Head, Html, Main, NextScript } from 'next/document'


class MyDocument extends Document {
  render() {
    return (
      <Html lang="pt-BR">
        <Head>
          <link
            rel="shortcut icon"
            href="/assets/icons/favicon.ico"
            type="image/png"
          />
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link
            rel="preconnect"
            href="https://fonts.gstatic.com"
            crossOrigin="anonymous"
          />

          <link
            href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap"
            rel="stylesheet"
          />
          <link
            href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,400;0,500;0,600;0,700;0,900;1,400;1,500;1,600;1,700;1,900&display=swap"
            rel="stylesheet"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

/* // This function needs to be a String
const themeInitializerScript = `(function() {
	${setInitialColorMode.toString()}
	setInitialColorMode();
})()
`

function setInitialColorMode() {
  // Check initial color preference
  function getInitialColorMode() {
    const persistedPreferenceMode = window.localStorage.getItem('theme')
    const hasPersistedPreference = typeof persistedPreferenceMode === 'string'

    if (hasPersistedPreference) {
      return persistedPreferenceMode
    }

    // Check the current preference
    const preference = window.matchMedia('(prefers-color-scheme: dark)')
    const hasMediaQueryPreference = typeof preference.matches === 'boolean'

    if (hasMediaQueryPreference) {
      return preference.matches ? 'dark' : 'light'
    }

    return preference.matches
  }

  const currentColorMode = getInitialColorMode()
  const element = document.documentElement
  element.style.setProperty('--initial-color-mode', currentColorMode)

  // If darkmode apply darkmode
  if (currentColorMode === 'dark')
    window.document.documentElement.classList.add('dark')
}
 */
export default MyDocument
