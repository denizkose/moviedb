import { configuration } from '@/api/configuration';
import { colors } from '@/lib/colors';
import {
  listOfActors,
  listOfDirectors,
  minutesToHours,
  toFullYear,
} from '@/lib/utils';
import { faCalendar, faClock } from '@fortawesome/free-solid-svg-icons';
import { faAngleDoubleDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Image from 'next/image';
import { AppendToResponse, MovieDetails } from 'tmdb-ts';

type MovieProp = {
  movie: AppendToResponse<MovieDetails, 'credits'[], 'movie'>;
};
export default function MovieInfo({ movie }: MovieProp) {
  const movieDetails = document.getElementById('similar') || undefined;

  const release_date = toFullYear(movie.release_date);
  const directors = listOfDirectors(movie.credits.crew);
  const cast = listOfActors(movie.credits.cast);

  return (
    <section
      id='media-info'
      className='mt-5 flex h-[calc(100lvh-20px)] flex-col justify-center space-y-5 tablet:mt-0 tablet:h-[calc(100vh-64px)]'
    >
      <h1 className='text-4xl font-semibold tablet:text-6xl'>{movie.title}</h1>
      <div id='row-1' className='flex flex-row items-center space-x-5'>
        <div id='categories'>
          {movie.genres.map((genre, index) => (
            <span key={genre.id}>
              {genre.name}
              {index + 1 === movie.genres.length ? '' : ', '}
            </span>
          ))}
        </div>
        <div id='date' className='flex flex-row items-center space-x-2'>
          <FontAwesomeIcon
            icon={faCalendar}
            className={`w-4 ${colors.main.text}`}
          />
          <span>{release_date}</span>
        </div>
        <div id='duration' className='flex flex-row items-center space-x-2'>
          <FontAwesomeIcon
            icon={faClock}
            className={`w-4 ${colors.main.text}`}
          />
          <span>{minutesToHours(movie.runtime)}</span>
        </div>
      </div>
      <div id='row-2'>
        <div id='imdb-rating' className='flex flex-row items-center space-x-5'>
          <span className='text-xl font-bold'>TMDB Rating</span>
          <span
            className={`rounded-lg px-2 py-1 text-sm font-semibold ${colors.main.bg}`}
          >
            {movie.vote_average.toFixed(1)}
          </span>
        </div>
      </div>
      <div id='row-3' className='tablet:w-1/2'>
        <a href={movie.homepage} target='_blank'>
          <button
            className={`btn w-48 rounded-lg px-2 py-2 ${colors.gradients.main} font-bold shadow-xl shadow-white/20 hover:outline hover:outline-2 hover:outline-yellow-400`}
          >
            Watch!
          </button>
        </a>
      </div>
      <div
        id='row-4'
        className='hidden flex-col space-y-2 tablet:flex tablet:w-1/2'
      >
        <div id='directors-list'>
          <span className='font-semibold'>Director:</span>{' '}
          <span className='font-light'>{directors}</span>
        </div>
        <div id='cast-list'>
          <span className='font-semibold'>Cast:</span>{' '}
          <span className='font-light'>{cast}</span>
        </div>
      </div>
      <div id='row-5' className='tablet:w-1/2'>
        <div id='short-description' className='font-light'>
          {movie.overview}
        </div>
      </div>
      <div id='image' className=''>
        <Image
          fill
          alt='dd'
          src={
            configuration.images.secure_base_url +
            'original' +
            movie.backdrop_path
          }
          className='-z-10 object-cover'
        />
        <div className='absolute bottom-0 left-0 right-0 top-0 -z-10 h-full w-full overflow-hidden bg-gradient-to-b from-[#00000070] to-black'></div>
      </div>
      <span
        aria-label='To Movie Deatils'
        className={`animate-pulse place-self-center pb-5`}
      >
        <FontAwesomeIcon icon={faAngleDoubleDown} />
      </span>
    </section>
  );
}
