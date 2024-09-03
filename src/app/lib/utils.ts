import { MutableRefObject } from 'react';
import { Cast, Crew } from 'tmdb-ts';
import { DB_LOCALE } from '@/lib/constants';
import { tmdb } from '@/tmdb';
import { MovieQueryOptionsV2, TvShowQueryOptionsV2 } from '@/lib/patch';

// sorts

export const sortABC = (data: Array<any>, key: string | number) => {
  data.sort((a, b) => {
    if (a[key] < b[key]) return -1;
    if (a[key] > b[key]) return 1;
    return 0;
  });

  return data;
};

// helpers

export const yearsDuration = (
  release_date: number,
  last_date: number | null,
  status: string
) => {
  return `${release_date} ${(last_date && status === 'Ended' && release_date !== last_date && `- ${last_date}`) || ''}`;
};

export const minutesToHours = (minutes: number) => {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  const formattedHours = hours.toString().padStart(2, '0');
  const formattedMinutes = mins.toString().padStart(2, '0');

  return `${formattedHours}:${formattedMinutes}`;
};

export const toFullYear = (year: string) => {
  return new Date(year).getFullYear();
};

export const convertDate = (date: string) => {
  const options: Intl.DateTimeFormatOptions = {
    year: '2-digit',
    month: 'short',
    day: 'numeric',
  };
  return new Date(date).toLocaleDateString(DB_LOCALE, options);
};

export let USDollar = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
});

export const scrollLeftRight = (
  direction: string,
  ref: MutableRefObject<HTMLDivElement | null>
) => {
  if (ref.current) {
    ref.current.scrollBy({
      left: direction === 'left' ? -300 : direction === 'right' ? 300 : 0,
      behavior: 'smooth',
    });
  }
};

const removeMessFromDiscoverObject = (data: { [key: string]: any }) => {
  Object.keys(data).forEach((key) => {
    if (data[key] === undefined || data[key] === 'all') {
      delete data[key];
    }
  });
  return data;
};

export const discoverMovie = async (data: MovieQueryOptionsV2) => {
  const result = await tmdb.discover.movie(removeMessFromDiscoverObject(data));
  return result;
  // setDiscoverMovieResult(result);
};

export const discoverTVShow = async (data: TvShowQueryOptionsV2) => {
  const result = await tmdb.discover.tvShow(removeMessFromDiscoverObject(data));
  return result;
  // setDiscoverTVShowResult(result);
};

// lists

export const listOfDirectors = (crew: Crew[]) => {
  return crew
    .filter((person) => person.job === 'Director' || person.job === '')
    .map((person) => person.name)
    .join(', ');
};

export const listOfActors = (cast: Cast[]) => {
  return (
    cast
      .filter((person) => person.known_for_department === 'Acting')
      .map((person) => person.name)
      .slice(0, 10)
      .join(', ') + (cast.length > 10 ? ' and more...' : '')
  );
};
