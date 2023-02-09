import IMAGES from 'assets';
import HeadWrapper from 'components/common/Head';
import React, { useState } from 'react';

type Props = {
  id?: string;
};

function HomeLayout({ id }: Props): JSX.Element {
  return (
    <>
      <div className="flex w-full" id={id}>
        <HeadWrapper />
      </div>
    </>
  );
}

HomeLayout.defaultProps = {
  children: '',
  className: '',
  id: '',
};

export default HomeLayout;
