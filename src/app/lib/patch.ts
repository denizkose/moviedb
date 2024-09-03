import { MovieQueryOptions, TvShowQueryOptions } from 'tmdb-ts';

// types
export interface MovieQueryOptionsV2 extends MovieQueryOptions {
  with_origin_country?: string;
}

export interface TvShowQueryOptionsV2 extends TvShowQueryOptions {
  with_origin_country?: string;
}
