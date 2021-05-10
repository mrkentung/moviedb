import { Fragment, useState, useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useQueryClient } from 'react-query';
import { animateScroll as scroll } from 'react-scroll';

import { getMovieByGenre, useMovieByGenre } from '../../fetch/movie';
import MainLayout from '../../layout/MainLayout';
import MovieItem from '../../components/MovieItem';

const Genres = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [page, setPage] = useState(1);

  const { data, isSuccess } = useMovieByGenre(router.query.id, page);

  useEffect(() => {
    if (data?.data.page > data?.data.total_page) {
      getMovieByGenre(router.query.id, page);
    }
  }, [data, page, queryClient]);

  return (
    <Fragment>
      <Head>
        <title>Movie by genres</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <MainLayout>
        <div className="w-full h-full p-12 bg-white ml-64">
          <div className="uppercase">
            <h2 className="text-2xl font-light text-gray-800 dark:text-white">Movie by genres</h2>
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

export default Genres;
