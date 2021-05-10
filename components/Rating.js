import { HiStar, HiOutlineStar } from 'react-icons/hi';
import Stars from 'react-rating';

const Rating = ({ vote_average, isCenter = true }) => {
  return (
    <div className={`${isCenter ? 'text-center' : 'text-left'} inline-block`}>
      <Stars
        emptySymbol={<HiOutlineStar className="inline-block mr-2" />}
        fullSymbol={<HiStar className="inline-block mr-2" />}
        initialRating={vote_average / 2}
        readonly
      />
    </div>
  );
};

export default Rating;
