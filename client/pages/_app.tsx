import type { AppProps } from "next/app";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/globals.css";
import { useEffect, useState } from "react";
import GlobalContext from "../context/globalContext";
import LocalStorageStore from "../helpers/storage";
import IEncryptedProperties from "../interfaces/security";
import { IUserStorage } from "../interfaces/user";
import Router from "next/router";

function MyApp({ Component, pageProps }: AppProps) {
  const [state, setState] = useState({ isLoggedIn: false, exp: 0, user: {}, update });

  function update(data: any) {
    setState(Object.assign({}, state, data));
  }

  useEffect(() => {
    let _token = LocalStorageStore.getData('_token');
    let _user = LocalStorageStore.getData('_user');

    if(_token && _user) {
      let token: IEncryptedProperties = JSON.parse(_token);
      let user: IUserStorage = JSON.parse(_user);

      setState({
        isLoggedIn: true, 
        exp: token.exp,
        user: user,
        update
      });

      // console.log((token.exp - Math.floor(Date.now() / 1000)));
      // // Redirect if token died
      // setTimeout(() => {
      //   LocalStorageStore.clearLocalStorage();
      //   Router.push('/');
      // }, (token.exp - Math.floor(Date.now() / 1000)))
    }
  }, []);

  return (
    <GlobalContext.Provider value={state}>
      <Component {...pageProps} />;
    </GlobalContext.Provider>
  );
}

export default MyApp;
