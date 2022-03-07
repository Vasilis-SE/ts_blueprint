import type { AppProps } from "next/app";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/globals.css";
import { useEffect, useState } from "react";
import GlobalContext from "../context/globalContext";
import LocalStorage from "../helpers/storage";

function MyApp({ Component, pageProps }: AppProps) {
  const [state, setState] = useState({ isLoggedIn: false, update });

  function update(data: any) {
    setState(Object.assign({}, state, data));
  }

  useEffect(() => {
    if(LocalStorage.getData('_token') && LocalStorage.getData('_user') )
      setState({isLoggedIn: true, update});
  }, []);

  return (
    <GlobalContext.Provider value={state}>
      <Component {...pageProps} />;
    </GlobalContext.Provider>
  );
}

export default MyApp;
