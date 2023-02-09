import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import type { FC } from 'react';
import { useCookies } from 'react-cookie';
import ROUTES from 'constants/routes';
import useStore from 'hooks/useStore';
import Loading from 'components/common/LoadingPage';

type withAuthHOC = (Component: FC) => FC;

const withAuth: withAuthHOC = (Component) => {
  const Authenticated: FC = (): JSX.Element | null => {
    const router = useRouter();
    const [cookies, , removeCookies] = useCookies();
    const { store } = useStore();
    const [authenticated, setAuthenticated] = useState(false);
    const initialized = Boolean(
      store.accessToken && store.company && store.user,
    );

    const ADMIN_ROUTES = ['/admin'];

    const USER_ROUTES = ['/user'];

    useEffect(() => {
      if (!cookies.accessToken) void router.push(ROUTES.LOGIN_ROUTE);
      else if (store.isAdmin) {
        // if admin allow every route

        setAuthenticated(true);
      }
      if (store.isUser) {
        if (USER_ROUTES.includes(router.pathname)) {
          setAuthenticated(true);
        }
      }
    }, [store.accessToken, store.isUser, store.isAdmin, cookies.accessToken]);

    return authenticated && (store.isAdmin || initialized) ? (
      <Component />
    ) : (
      <Loading />
    );
  };

  return Authenticated;
};

export default withAuth;
