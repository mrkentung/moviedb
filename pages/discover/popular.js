import { Fragment, useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { HiStar, HiOutlineStar } from 'react-icons/hi';
import Stars from 'react-rating';
import { animateScroll as scroll } from 'react-scroll';
import { useQueryClient } from 'react-query';
import { getPopular, usePopular } from '../../fetch/popular';
import MainLayout from '../../layout/MainLayout';

const Popular = () => {
  const queryClient = useQueryClient();
  const [page, setPage] = useState(1);
  const { data, isSuccess } = usePopular(page);

  useEffect(() => {
    if (data?.data.page > data?.data.total_page) {
      getPopular(page);
    }
  }, [data, page, queryClient]);
  return (
    <Fragment>
      <Head>
        <title>Popular Movies</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <MainLayout>
        <div className="w-full h-full p-12 bg-white ml-64">
          <div className="uppercase">
            <h2 className="text-2xl font-light text-gray-800 dark:text-white">Popular</h2>
            <p className="text-base font-bold text-gray-800 dark:text-white">Movies</p>
          </div>
          {isSuccess && (
            <div className="my-12">
              <div className="w-full grid grid-cols-4 gap-8">
                {data.data.results?.map((item, i) => {
                  return (
                    <div key={i} className="w-full cursor-pointer">
                      <Link href={`/movie/${item.id}`}>
                        <a>
                          <img
                            src={`https://image.tmdb.org/t/p/w342${item.poster_path}`}
                            className="w-full rounded shadow-sm mb-2 object-cover hover:shadow-2xl transition-all duration-300 ease-in-out"
                            style={{ height: '38rem' }}
                            alt={item.original_title}
                          />
                          <p className="text-gray-600 text-base text-center">
                            {item.original_title}
                          </p>
                          <div className="text-center">
                            <Stars
                              emptySymbol={<HiOutlineStar className="inline-block mr-2" />}
                              fullSymbol={<HiStar className="inline-block mr-2" />}
                              initialRating={item.vote_average / 2}
                              readonly
                            />
                          </div>
                        </a>
                      </Link>
                    </div>
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

export default Popular;
