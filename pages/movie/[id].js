import Head from 'next/head';
import { useRouter } from 'next/router';
import { Fragment, useRef, useState, useEffect } from 'react';
import { FaDotCircle } from 'react-icons/fa';
import Slider from 'react-slick';
import { HiChevronLeft, HiChevronRight } from 'react-icons/hi';

import MainLayout from '../../layout/MainLayout';
import { getMovieDetail, getMovieCredits, getMovieRecomendations } from '../../fetch/movie';
import { getConfiguration } from '../../fetch/configuration';
import Rating from '../../components/Rating';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

function NextArrow({ onClick }) {
  return (
    <HiChevronRight
      style={{
        right: '-15px',
        position: 'absolute',
        top: '50%',
        display: 'block',
        width: '12px',
        height: '12px',
        padding: '0',
        transform: 'translate(0, -50%)',
        cursor: 'pointer',
      }}
      onClick={onClick}
      className="text-lg"
    />
  );
}

function PrevArrow({ onClick }) {
  return (
    <HiChevronLeft
      style={{
        left: '-15px',
        position: 'absolute',
        top: '50%',
        display: 'block',
        width: '12px',
        height: '12px',
        padding: '0',
        transform: 'translate(0, -50%)',
        cursor: 'pointer',
      }}
      onClick={onClick}
      className="text-lg"
    />
  );
}

export async function getServerSideProps(context) {
  const movie = await getMovieDetail(context.query.id);
  const credits = await getMovieCredits(context.query.id);
  const recommendations = await getMovieRecomendations(context.query.id);
  const config = await getConfiguration();

  return {
    props: {
      movie: movie.data,
      credits: credits.data,
      recommendations: recommendations.data,
      config: config.data,
    },
  };
}

const MovieDetail = ({ movie, credits, config }) => {
  console.log(movie, credits, config.images);
  const router = useRouter();

  const sliderElement = useRef();
  const [totalShow, setTotalShow] = useState(null);

  const settings = {
    dots: false,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 3000,
    swipeToSlide: true,
    speed: 500,
    slidesToShow: totalShow,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  };

  // Set amount of items to show on slider based on the width of the element
  const changeTotalShow = () => {
    let totalItems = Math.round(sliderElement.current.offsetWidth / 70);
    if (totalItems > credits.cast.length) {
      totalItems = credits.cast.length;
    }
    setTotalShow(totalItems);
  };

  useEffect(() => {
    changeTotalShow();
    window.addEventListener('resize', changeTotalShow);
    return () => window.removeEventListener('resize', changeTotalShow);
  }, []);

  return (
    <Fragment>
      <Head>
        <title>{movie.original_title} - MovieDB</title>
      </Head>
      <MainLayout>
        <div className="w-full h-full p-12 bg-white ml-64">
          <div className="max-w-5xl mx-auto flex py-4">
            <div className="w-1/3">
              <img
                src={`${config.images.base_url}/${config.images.poster_sizes[4]}${movie.poster_path}`}
                className="w-full rounded-lg shadow-2xl"
                alt={movie.original_title}
              />
            </div>
            <div className="w-2/3 px-16">
              <div className="mb-4">
                <h1 className="text-4xl font-light text-gray-700">{movie.original_title}</h1>
                <h2 className="text-xl font-bold text-gray-700">{movie.tagline}</h2>
              </div>
              <div className="mb-6">
                <Rating vote_average={movie.vote_average} isCenter={false} />
                <span className="inline-block ml-2">{movie.vote_average}</span>
              </div>
              <div className="mb-6">
                <p className="font-bold mb-2 text-xl">Genres</p>
                <div>
                  <ul className="flex">
                    {movie.genres?.map((item, i) => {
                      return (
                        <li
                          key={i}
                          className="mr-4 text-gray-600 cursor-pointer flex items-center hover:text-gray-700 transition-all ease-in-out duration-75">
                          <FaDotCircle className="inline-block mr-2 text-xs" />
                          {item.name}
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>
              <div className="mb-6">
                <p className="font-bold mb-2 text-xl">Synopsis</p>
                <p className="font-medium text-base">{movie.overview}</p>
              </div>
              <div className="mb-12 w-full">
                <p className="font-bold mb-2 text-xl">Cast</p>
                <div>
                  <div className="block text-lg" ref={sliderElement}>
                    <Slider {...settings}>
                      {credits.cast?.map((item, i) => {
                        if (item.profile_path) {
                          return (
                            <div
                              key={i}
                              className="mr-4 text-gray-600 cursor-pointer items-center hover:text-gray-700 transition-all ease-in-out duration-75 inline-block">
                              <img
                                src={`${config.images.base_url}/${config.images.profile_sizes[0]}${item.profile_path}`}
                                className="rounded-full w-12 h-12 object-cover"
                                alt={item.name}
                              />
                            </div>
                          );
                        }
                      })}
                    </Slider>
                  </div>
                </div>
              </div>
              <div className="mb-6">
                <div className="flex justify-between items-center">
                  <div>
                    {movie.homepage && (
                      <a className="px-12 py-2 border-gray-700 rounded-full border-2 mr-6 cursor-pointer hover:bg-gray-700 hover:text-white hover:shadow-xl transition-all duration-100 ease-in-out">
                        Website
                      </a>
                    )}
                    {movie.imdb_id && (
                      <a className="px-12 py-2 border-gray-700 rounded-full border-2 mr-6 cursor-pointer hover:bg-gray-700 hover:text-white hover:shadow-xl transition-all duration-100 ease-in-out">
                        Imdb
                      </a>
                    )}
                  </div>
                  <div>
                    <button
                      className="px-12 py-2 bg-gray-700 text-white rounded-full cursor-pointer hover:shadow-xl transition-all duration-100 ease-in-out"
                      onClick={() => router.back()}>
                      Back
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </MainLayout>
    </Fragment>
  );
};

export default MovieDetail;
