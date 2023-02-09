import React from "react";
import Head from "next/head";

const HeadWrapper = (): JSX.Element => (
  <div>
    <Head>
      <title>Dashboard</title>
      <link rel="shortcut icon" href="/favicon.ico" />
    </Head>
  </div>
);

export default HeadWrapper;
