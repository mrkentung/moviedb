import React, { useContext } from 'react';
import { HiHeart, HiChartSquareBar, HiCalendar } from 'react-icons/hi';
import { FaDotCircle } from 'react-icons/fa';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useGenres } from '../fetch/popular';
import { Context } from '../utils/common/context';

const Sidebar = () => {
  const { asPath } = useRouter();

  const path = asPath.split('/');

  const genres = useGenres();

  const { dispatch } = useContext(Context);

  return (
    <div className="flex flex-col w-64 h-screen px-8 py-8 bg-white border-r dark:bg-gray-800 dark:border-gray-600 fixed overflow-y-auto scrollbar scrollbar-thin">
      <Link href="/">
        <h2 className="text-3xl font-semibold text-gray-800 dark:text-white cursor-pointer">
          MovieDB
        </h2>
      </Link>
      <div className="justify-between my-8">
        <h2 className="text-base font-semibold text-gray-700 mb-4">Discover</h2>
        <nav className="flex flex-col">
          <Link href="/discover/popular">
            <a
              className={`${
                path[2] === 'popular' ? 'text-gray-700' : 'text-gray-500'
              } text-sm mb-2 cursor-pointer hover:text-gray-700`}>
              <HiHeart className="inline-block mr-2" />
              Popular
            </a>
          </Link>
          <Link href="/discover/top-rated">
            <a
              className={`${
                path[2] === 'top-rated' ? 'text-gray-700' : 'text-gray-500'
              } text-sm mb-2 cursor-pointer hover:text-gray-700`}>
              <HiChartSquareBar className="inline-block mr-2" />
              Top Rated
            </a>
          </Link>
          <Link href="/discover/upcoming">
            <a
              className={`${
                path[2] === 'upcoming' ? 'text-gray-700' : 'text-gray-500'
              } text-sm mb-2 cursor-pointer hover:text-gray-700`}>
              <HiCalendar className="inline-block mr-2" />
              Upcoming
            </a>
          </Link>
        </nav>
      </div>
      {genres.isLoading && <p>Loading...</p>}
      {genres.isSuccess && (
        <div className="my-8">
          <h2 className="text-base font-semibold text-gray-700 mb-4">Genres</h2>
          <nav className="flex flex-col">
            {genres.data.data.genres.map((item, i) => {
              return (
                <Link key={i} href={`/genres/${item.id}`}>
                  <button
                    className={`${
                      path[2] == item.id ? 'text-gray-700' : 'text-gray-500'
                    } text-sm mb-4 cursor-pointer hover:text-gray-700 text-left outline-none focus:outline-none`}
                    onClick={() =>
                      dispatch({
                        type: 'SELECTED_GENRE',
                        payload: item,
                      })
                    }>
                    <FaDotCircle className="inline-block mr-2 text-xs" />
                    {item.name}
                  </button>
                </Link>
              );
            })}
          </nav>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
