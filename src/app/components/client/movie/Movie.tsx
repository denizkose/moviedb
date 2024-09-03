'use client';
// import { movies } from "@/movies" //debug
import { colors } from '@/lib/colors';
import React, { useEffect, useRef, useState } from 'react';
import Loading from '../Loading';
import CarouselList from '../lists/CarouselList';
import MediaCreditTab from '../common/MediaCreditTab';
import MediaFilesTab from '../common/MediaFilesTab';
import MediaDetailsTab from './MovieDetailsTab';
import MovieInfo from './MovieInfo';
import { AppendToResponse, MovieDetails } from 'tmdb-ts';

type MovieDetailsProps = {
  movie: AppendToResponse<
    MovieDetails,
    (
      | 'similar'
      | 'recommendations'
      | 'credits'
      | 'videos'
      | 'images'
      | 'lists'
    )[],
    'movie'
  >;
};

export default function Movie({ movie }: MovieDetailsProps) {
  const tab1 = useRef<HTMLDivElement | null>(null);
  const tab2 = useRef<HTMLDivElement | null>(null);
  const tab3 = useRef<HTMLDivElement | null>(null);

  const changeTab = (tab: React.RefObject<HTMLDivElement>, id?: string) => {
    const buttons = ['btn-details', 'btn-media', 'btn-cast'];
    const tabs = [tab1, tab2, tab3];
    tabs.map((_tab) => _tab !== tab && _tab.current?.classList.add('hidden'));
    tab.current?.classList.replace('hidden', 'block');
    buttons.forEach((button) => {
      const btn = document.getElementById(button);

      btn &&
        (button === id
          ? btn.classList.add(
              '-mb-1',
              'border-solid',
              'border-b-white',
              'border-b-4'
            )
          : btn.classList.remove(
              '-mb-1',
              'border-solid',
              'border-b-white',
              'border-b-4'
            ));
    });
  };

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => changeTab(tab1, 'btn-details'));
  useEffect(() => {
    setIsLoading(false);
  }, []);
  return (
    <main className='flex flex-col space-y-5 px-5 text-white tablet:px-20 desktop:px-[120px]'>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <MovieInfo movie={movie} />
          <section id='similar'>
            <CarouselList
              mediaList={movie.similar.results}
              title={'Similar'}
              type='movies'
            />
          </section>
          <section id='recommendations'>
            <CarouselList
              type='movies'
              mediaList={movie.recommendations.results}
              title={'Recommendations'}
            />
          </section>
          <section id='movie-details' className='tablet:mt-16'>
            <div
              className={`flex flex-row justify-between space-x-5 border-b-4 ${colors.addition.gray_dark.border} mb-2 box-border tablet:mt-16`}
            >
              <button
                id='btn-details'
                className='btn w-1/3 py-3 text-left text-xl font-bold'
                onClick={(e) => changeTab(tab1, e.currentTarget.id)}
              >
                Details
              </button>
              <button
                id='btn-media'
                className='btn w-1/3 py-3 text-left text-xl font-bold'
                onClick={(e) => changeTab(tab2, e.currentTarget.id)}
              >
                Media
              </button>
              <button
                id='btn-cast'
                className='btn w-1/3 py-3 text-left text-xl font-bold'
                onClick={(e) => changeTab(tab3, e.currentTarget.id)}
              >
                Cast
              </button>
            </div>
            <section id='details' ref={tab1} className='hidden'>
              <MediaDetailsTab movie={movie} />
            </section>
            <section id='media' ref={tab2} className='hidden'>
              <MediaFilesTab
                videos={movie.videos.results}
                images={movie.images.backdrops}
                backDropImage={movie.backdrop_path}
              />
            </section>
            <section id='cast' ref={tab3} className='hidden'>
              <MediaCreditTab credits={movie.credits.cast} />
            </section>
          </section>
        </>
      )}
    </main>
  );
}
