import { Fragment, useState, useEffect } from 'react';
import Head from 'next/head';
import { useQueryClient } from 'react-query';
import { animateScroll as scroll } from 'react-scroll';

import { useTopRated, getTopRated } from '../../fetch/top-rated';
import MainLayout from '../../layout/MainLayout';
import MovieItem from '../../components/MovieItem';

const TopRated = () => {
  const queryClient = useQueryClient();
  const [page, setPage] = useState(1);
  const { data, isSuccess } = useTopRated(page);

  useEffect(() => {
    if (data?.data.page > data?.data.total_page) {
      getTopRated(page);
    }
  }, [data, page, queryClient]);

  return (
    <Fragment>
      <Head>
        <title>Top Rated Movies</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <MainLayout>
        <div className="w-full h-full p-12 bg-white ml-64">
          <div className="uppercase">
            <h2 className="text-2xl font-light text-gray-800 dark:text-white">Top Rated</h2>
            <p className="text-base font-bold text-gray-800 dark:text-white">Movies</p>
          </div>
          {isSuccess && (
            <div className="my-12">
              <div className="w-full grid grid-cols-4 gap-8">
                {data.data.results?.map((item, i) => {
                  return (
                    <MovieItem
                      key={i}
                      id={item.id}
                      poster_path={item.poster_path}
                      original_title={item.original_title}
                      vote_average={item.vote_average}
                    />
                  );
                })}
              </div>
            </div>
          )}
          <div className={`flex ${page === 1 ? 'justify-end' : 'justify-between'} w-full`}>
            <button
              className={`bg-red-600 text-white px-8 py-2 rounded-full focus:outline-none ${
                page === 1 ? 'hidden' : 'block'
              }`}
              onClick={() => {
                scroll.scrollToTop({
                  smooth: true,
                });
                setPage((old) => Math.max(old - 1, 0));
              }}
              disabled={page === 1}>
              Page {page}
            </button>

            <button
              className="bg-red-600 text-white px-8 py-2 rounded-full focus:outline-none"
              onClick={() => {
                scroll.scrollToTop({
                  smooth: true,
                });
                setPage((old) => old + 1);
              }}
              disabled={data?.data.page > data?.data.total_page}>
              Page {page + 1}
            </button>
          </div>
        </div>
      </MainLayout>
    </Fragment>
  );
};

export default TopRated;
