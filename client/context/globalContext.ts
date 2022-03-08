import React from 'react';
import { IGlobalContextProperties } from '../interfaces/contexts';

const GlobalContext = React.createContext({
  isLoggedIn: false,
  exp: 0,
  user: {},
  update: (data: IGlobalContextProperties) => {}
})

export default GlobalContext