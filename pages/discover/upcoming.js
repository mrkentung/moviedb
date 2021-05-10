import { Fragment } from 'react';
import Head from 'next/head';

import MainLayout from '../../layout/MainLayout';

const Upcoming = () => {
  return (
    <Fragment>
      <Head>
        <title>Upcoming</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <MainLayout>
        <div className="w-full h-full p-12 bg-white">
          <div className="uppercase">
            <h2 className="text-2xl font-light text-gray-800 dark:text-white">Upcoming</h2>
            <p className="text-base font-bold text-gray-800 dark:text-white">Movies</p>
          </div>
          <div className="relative mt-6"></div>
        </div>
      </MainLayout>
    </Fragment>
  );
};

export default Upcoming;
