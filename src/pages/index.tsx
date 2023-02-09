/* eslint-disable jsx-a11y/anchor-is-valid */

import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import LoadingPage from 'components/common/LoadingPage';

export default function IndexPage(): JSX.Element {
  const router = useRouter();

  useEffect(() => {
    void router.push('/auth/login');
  }, []);

  return <LoadingPage />;
}
