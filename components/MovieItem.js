import Link from 'next/link';
import Rating from './Rating';

const MovieItem = (props) => {
  return (
    <div className="w-full cursor-pointer">
      <Link href={`/movie/${props.id}`}>
        <a>
          <img
            src={`https://image.tmdb.org/t/p/w342${props.poster_path}`}
            className="w-full rounded shadow-sm mb-2 object-cover hover:shadow-2xl transition-all duration-300 ease-in-out"
            style={{ height: '38rem' }}
            alt={props.original_title}
          />
          <p className="text-gray-600 text-base text-center">{props.original_title}</p>
          <Rating vote_average={props.vote_average} isCenter={true} />
        </a>
      </Link>
    </div>
  );
};

export default MovieItem;
