import { createContext, useReducer } from 'react';
import jwtDecodeMechanism from 'jwt-decode';

const initialState = {
  user: null
}

const AuthenticationContext = createContext({
  user: null,
  login: (data) => {},
  logout: () => {}
});

function authenticationReducer(state, action) {
  switch(action.type) {
    case 'LOGIN':
      return {
        ...state,
        user: action.payload
      }
    case 'LOGOUT':
      return {
        ...state,
        user: null
      }
    default:
      return state;
  }
}


function isTokenValid() {
  const lsToken = localStorage.getItem('jwt');
  if(lsToken) {
    const decodedToken = jwtDecodeMechanism(lsToken);
    // Check token
    if(decodedToken.exp * 1000 < Date.now()) {
      // Expired
      localStorage.removeItem('jwt');
    } else {
      initialState.user = decodedToken
    }
  }
}

isTokenValid();

function AuthenticationProvider(props) {
  const [state, dispatch] = useReducer(authenticationReducer, initialState);
  const login = data => {
    localStorage.setItem('jwt', data.token)
    dispatch({
      type: 'LOGIN',
      payload: data
    })
  }
  const logout = () => {
    localStorage.removeItem('jwt')
    dispatch({
      type: 'LOGOUT'
    })
  }
  return (
    <AuthenticationContext.Provider 
      value={{ user: state.user, login, logout }}
      {...props}
    />
  )
}

export {
  AuthenticationContext,
  AuthenticationProvider
}