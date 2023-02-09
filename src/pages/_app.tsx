import React, { useEffect } from "react";

import { AppProps } from "next/app";
import { hotjar } from "react-hotjar";

import { StoreProvider } from "contexts/store";
import Toast from "components/common/Toast";
import { initIntercom } from "lib/Intercom";

import "styles/global.scss";

function App({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <StoreProvider>
      <Component {...pageProps} />
      <Toast />
    </StoreProvider>
  );
}

export default App;
