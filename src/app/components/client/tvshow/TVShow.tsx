'use client';
// import { movies } from "@/movies" //debug
import { colors } from '@/lib/colors';
import React, { useEffect, useRef, useState } from 'react';
import Loading from '../Loading';
import CarouselList from '../lists/CarouselList';
import MediaCreditTab from '../common/MediaCreditTab';
import MediaFilesTab from '../common/MediaFilesTab';
import { AppendToResponse, TvShowDetails } from 'tmdb-ts';
import TVShowInfo from './TVShowInfo';
import TVShowDetailsTab from './TVShowDetailsTab';
import TVShowEpisodesTab from './TVShowEpisodesTab';

type TVDetailsProps = {
  tv: AppendToResponse<
    TvShowDetails,
    ('similar' | 'recommendations' | 'credits' | 'videos' | 'images')[],
    'tvShow'
  >;
};

export default function TVShow({ tv }: TVDetailsProps) {
  const tab1 = useRef<HTMLDivElement | null>(null);
  const tab2 = useRef<HTMLDivElement | null>(null);
  const tab3 = useRef<HTMLDivElement | null>(null);
  const tab4 = useRef<HTMLDivElement | null>(null);

  const changeTab = (tab: React.RefObject<HTMLDivElement>, id?: string) => {
    const buttons = ['btn-episodes', 'btn-media', 'btn-cast', 'btn-details'];
    const tabs = [tab1, tab2, tab3, tab4];
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

  useEffect(() => changeTab(tab1, 'btn-episodes'));
  useEffect(() => {
    setIsLoading(false);
  }, []);
  return (
    <main className='flex flex-col space-y-5 px-5 text-white tablet:px-20 desktop:px-[120px]'>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <TVShowInfo tv={tv} />

          <section id='similar'>
            <CarouselList
              mediaList={tv.similar.results}
              title={'Similar'}
              type='tvshows'
            />
          </section>
          <section id='recommendations'>
            <CarouselList
              mediaList={tv.recommendations.results}
              title={'Recommendations'}
              type='tvshows'
            />
          </section>
          <section id='tv-details' className='tablet:mt-16'>
            <div
              className={`flex flex-row justify-between space-x-5 border-b-4 ${colors.addition.gray_dark.border} mb-2 box-border tablet:mt-16`}
            >
              <button
                id='btn-episodes'
                className='btn w-1/3 py-3 text-left text-xl font-bold'
                onClick={(e) => changeTab(tab1, e.currentTarget.id)}
              >
                Episodes
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
              <button
                id='btn-details'
                className='btn w-1/3 py-3 text-left text-xl font-bold'
                onClick={(e) => changeTab(tab4, e.currentTarget.id)}
              >
                Details
              </button>
            </div>
            <section id='episodes' ref={tab1} className='hidden'>
              <TVShowEpisodesTab tv={tv} />
            </section>
            <section id='media' ref={tab2} className='hidden'>
              <MediaFilesTab
                videos={tv.videos.results}
                images={tv.images.backdrops}
                backDropImage={tv.backdrop_path}
              />
            </section>
            <section id='cast' ref={tab3} className='hidden'>
              <MediaCreditTab credits={tv.credits.cast} />
            </section>
            <section id='details' ref={tab4} className='hidden'>
              <TVShowDetailsTab tv={tv} />
            </section>
          </section>
        </>
      )}
    </main>
  );
}
