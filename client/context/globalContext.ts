import React from 'react';
import { IGlobalContextProperties } from '../interfaces/contexts';

const GlobalContext = React.createContext({
  isLoggedIn: false,
  update: (data: IGlobalContextProperties) => {}
})

export default GlobalContext