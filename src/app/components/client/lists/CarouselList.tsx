'use client';
import { configuration } from '@/api/configuration';
import PictureCard from '@/components/client/cards/PictureCard';
import { colors } from '@/lib/colors';
import { scrollLeftRight } from '@/lib/utils';
import {
  faChevronLeft,
  faChevronRight,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useRef } from 'react';
import {
  AiringTodayResult,
  Movie,
  Recommendation,
  OnTheAirResult,
  TopRatedTvShowResult,
  PopularTvShowResult,
} from 'tmdb-ts';

// TODO Styling list ending

type CarouselListProps = {
  mediaList:
    | Movie[]
    | Recommendation[]
    | AiringTodayResult[]
    | OnTheAirResult[]
    | TopRatedTvShowResult[]
    | PopularTvShowResult[];
  title: string;
  type: 'movies' | 'tvshows';
};

export default function CarouselList({
  mediaList,
  title,
  type,
}: CarouselListProps) {
  const carouselRef = useRef<HTMLDivElement | null>(null);

  return (
    <div id='media-category' className='mb-5 flex flex-col space-y-5'>
      <h2 className={'text-3xl font-extrabold uppercase text-white'}>
        {title}
      </h2>
      <div id='media-list' className='relative flex flex-row'>
        <div
          id='previous-button'
          className='absolute inset-y-0 -left-8 z-10 hidden w-6 justify-center hover:transition-colors tablet:flex tablet:flex-col'
        >
          <button
            onClick={() => scrollLeftRight('left', carouselRef)}
            aria-label='Left'
          >
            <FontAwesomeIcon
              icon={faChevronLeft}
              className={`${colors.main.text} h-8 hover:text-white`}
            />
          </button>
        </div>
        <div
          id='media-carousel'
          ref={carouselRef}
          className='z-0 flex snap-x snap-mandatory flex-row space-x-5 overflow-x-auto overscroll-x-auto'
        >
          {mediaList.map((item) => (
            <PictureCard
              type={type === 'movies' ? 'movie' : 'tv'}
              key={item.id}
              id={item.id}
              title={
                ((item as Movie) || (item as Recommendation)).title ||
                (
                  (item as AiringTodayResult) ||
                  (item as OnTheAirResult) ||
                  (item as TopRatedTvShowResult) ||
                  (item as PopularTvShowResult)
                ).name
              }
              image={
                item.poster_path
                  ? configuration.images.secure_base_url +
                    'w300' +
                    item.poster_path
                  : 'https://placehold.co/300x450/png?text=NO+POSTER'
              }
            />
          ))}
        </div>
        <div
          id='next-button'
          className='absolute -inset-y-0 -right-8 z-10 hidden w-6 justify-center hover:transition-colors tablet:flex tablet:flex-col'
        >
          <button
            onClick={() => scrollLeftRight('right', carouselRef)}
            aria-label='Right'
          >
            <FontAwesomeIcon
              icon={faChevronRight}
              className={`${colors.main.text} h-8 hover:text-white`}
            />
          </button>
        </div>
      </div>
    </div>
  );
}
