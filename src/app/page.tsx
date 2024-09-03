import CarouselList from '@/components/client/lists/CarouselList';
import CollectionList from './components/client/lists/CollectionsList';
import { colors } from './lib/colors';
import { tmdb } from './tmdb';

export default async function Home() {
  const nowPlayingMovies = (await tmdb.movies.nowPlaying()).results;
  const popularMovies = (await tmdb.movies.popular()).results;
  const topRatedMovies = (await tmdb.movies.topRated()).results;
  const upcomingMovies = (await tmdb.movies.upcoming()).results;
  const onTheAirTVShows = (await tmdb.tvShows.onTheAir()).results;
  const popularTVShows = (await tmdb.tvShows.popular()).results;
  const topRatedTVShows = (await tmdb.tvShows.topRated()).results;
  const airingTodayTVShows = (await tmdb.tvShows.airingToday()).results;

  return (
    <main
      className={
        // 'w-full px-5 tablet:px-20 desktop:px-[120px] ' + colors.bg.gradient
        'w-full px-5 tablet:px-20 desktop:px-[120px]'
      }
    >
      <CollectionList />
      <h2 className='text my-5 text-4xl font-extrabold text-white'>Films</h2>
      <CarouselList
        mediaList={nowPlayingMovies}
        title='Now Playing'
        type='movies'
      />
      <CarouselList mediaList={popularMovies} title='Popular' type='movies' />
      <CarouselList
        mediaList={topRatedMovies}
        title='Top Rated'
        type='movies'
      />
      <CarouselList mediaList={upcomingMovies} title='Upcoming' type='movies' />
      <h2 className='text my-5 text-4xl font-extrabold text-white'>TV Shows</h2>
      <CarouselList
        mediaList={onTheAirTVShows}
        title='Now Playing'
        type='tvshows'
      />
      <CarouselList mediaList={popularTVShows} title='Popular' type='tvshows' />
      <CarouselList
        mediaList={topRatedTVShows}
        title='Top Rated'
        type='tvshows'
      />
      <CarouselList
        mediaList={airingTodayTVShows}
        title='Upcoming'
        type='tvshows'
      />
    </main>
  );
}
