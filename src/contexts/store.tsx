/* eslint-disable no-param-reassign */
import ACTIONS from 'constants/actions';
import ENV from 'constants/environment';
import React, { createContext, useEffect, useReducer } from 'react';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import { useRouter } from 'next/router';
import ROUTES, { AUTH_ROUTE } from 'constants/routes';
import api from 'api';
const initialStore: StoreType = {
  user: null,

  accessToken: null,

  isUser: false,
  isAdmin: false,
};

const reducer = (store: StoreType, action: ActionType): StoreType => {
  if (ENV.IS_DEV) {
    console.log(
      `${String(action.type).replace(/-/g, '_').toUpperCase()}`,
      action.payload,
    );
  }

  switch (action.type) {
    case ACTIONS.USER.SET:
      return {
        ...store,
        user: action.payload!.user!,
      };
    case ACTIONS.USER.SET_ACCESS_TOKEN:
      return {
        ...store,
        accessToken: action.payload!.accessToken!,
      };

    case ACTIONS.USER.SET_IS_USER:
      return {
        ...store,
        isUser: action.payload!.isUser!,
      };
    case ACTIONS.USER.SET_IS_ADMIN:
      return {
        ...store,
        isAdmin: action.payload!.isAdmin!,
      };
    case ACTIONS.RESET:
      return initialStore;

    default:
      throw new Error();
  }
};

const defaultDispatch: React.Dispatch<ActionType> = () => initialStore;
const StoreContext = createContext({
  store: initialStore,
  dispatch: defaultDispatch,
});

export { StoreContext, StoreProvider };

type StoreProviderProps = {
  children: React.ReactNode;
};

function StoreProvider(props: StoreProviderProps): JSX.Element {
  const [store, dispatch] = useReducer<React.Reducer<StoreType, ActionType>>(
    reducer,
    initialStore,
  );
  const [cookies, setCookies, deleteCookies] = useCookies();
  const router = useRouter();

  const { children } = props;

  useEffect(() => {
    // if accessToken cookies are added
    if (cookies.accessToken) {
      // set accessToken to store
      dispatch({
        type: ACTIONS.USER.SET_ACCESS_TOKEN,
        payload: { accessToken: cookies.accessToken },
      });

      // check if user is admin
      const isAdmin = parseJWT(cookies.accessToken)
        .data.access.map((access) => access.role)
        .includes('admin');

      dispatch({
        type: ACTIONS.USER.SET_IS_ADMIN,
        payload: { isAdmin },
      });

      // get user data
      api.user
        .get(cookies.accessToken)
        .then((res) => {
          // set user data to store
          dispatch({ type: ACTIONS.USER.SET, payload: { user: res.data } });
        })
        .catch((err) => {
          console.log(err);
        });
    }
    // if there is no accessToken
    else {
      dispatch({ type: ACTIONS.RESET });
    }
  }, [cookies.accessToken]);

  axios.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      if (error.response.status === 401 || error.response.status === 403) {
        deleteCookies('accessToken', { path: '/' });
        void router.push(`${ROUTES.LOGIN_ROUTE}?from=${router.asPath}`);
      }

      return error;
    },
  );

  return (
    <StoreContext.Provider value={{ store, dispatch }}>
      {children}
    </StoreContext.Provider>
  );
}
