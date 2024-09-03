'use client';

import { movieSearchObject, tvSearchObject } from '@/lib/constants';
import { tmdb } from '@/tmdb';
import { ChangeEvent, useEffect, useState } from 'react';
import {
  Certification,
  CountryConfiguration,
  LanguageConfiguration,
  MovieDiscoverResult,
  TvShowDiscoverResult,
  WatchProvider,
} from 'tmdb-ts';

import { MovieQueryOptionsV2, TvShowQueryOptionsV2 } from '@/lib/patch';
import Filter from '@/components/client/search/Filter';
import SwitcherMovieTv from '@/components/client/search/SwitcherMovieTv';
import { discoverMovie, discoverTVShow } from '@/lib/utils';
import FilterLanguages from '@/components/client/search/FilterLanguages';
import FilterGenres from '@/components/client/search/FilterGenres';
import FilterInputNumber from '@/components/client/search/FilterInputNumber';
import FilterInputText from '@/components/client/search/FilterInputText';
import FilterInputCheckbox from '@/components/client/search/FilterInputCheckbox';
import FilterCountries from '@/components/client/search/FilterCountries';
import FilterProviders from '@/components/client/search/FilterProviders';
import FilterInputSelect from '@/components/client/search/FilterInputSelect';
import SearchMediaList from '@/components/client/lists/SearchMediaList';

export default function Page() {
  const [discoverMovieResult, setDiscoverMovieResult] =
    useState<MovieDiscoverResult>();
  const [discoverTVShowResult, setDiscoverTVShowResult] =
    useState<TvShowDiscoverResult>();
  const [typeOfSearch, setTypeOfSearch] = useState<boolean>(false);
  const [certificationMeaning, setSertificationMeaning] = useState<string>();
  const [dataMovie, setDataMovie] =
    useState<MovieQueryOptionsV2>(movieSearchObject);
  const [dataTVShow, setDataTVShow] =
    useState<TvShowQueryOptionsV2>(tvSearchObject);

  type preparedDataType = {
    genres: { id: number; name: string }[];
    languages: LanguageConfiguration[];
    certifications: Certification[];
    countries: CountryConfiguration[];
    include_adult: boolean;
    with_watch_providers: WatchProvider[];
  };

  const [preparedData, setPreparedData] = useState<preparedDataType>({
    genres: [],
    languages: [],
    certifications: [],
    countries: [],
    include_adult: false,
    with_watch_providers: [],
  });

  const setDataMedia = (data?: object) => {
    data && setDataMovie({ ...dataMovie, ...data });
    data && setDataTVShow({ ...dataTVShow, ...data });
  };

  useEffect(() => {
    const getPreparedData = async () => {
      const genres = await tmdb.genres.movies();
      const unfiltered_languages = await tmdb.configuration.getLanguages();
      const languages = unfiltered_languages.sort((a, b) => {
        if (a.iso_639_1 < b.iso_639_1) return -1;
        else if (a.iso_639_1 > b.iso_639_1) return 1;
        else return 0;
      });
      const certifications = await tmdb.certifications.movies();
      const countries = await tmdb.configuration.getCountries();
      const providersMovie = await tmdb.watchProviders.getMovieProviders();
      const providersTV = await tmdb.watchProviders.getTvProviders();
      setPreparedData({
        genres: genres.genres,
        languages: languages,
        certifications: certifications.certifications.US,
        countries: countries,
        include_adult: false,
        with_watch_providers: providersMovie.results,
      });
    };

    getPreparedData();
  }, []);

  return (
    <main className='container mx-auto flex p-5'>
      <section id='filters' className='w-1/5'>
        <form method='post'>
          <SwitcherMovieTv
            type={typeOfSearch}
            tumbler={() => setTypeOfSearch(!typeOfSearch)}
          />
          <FilterLanguages
            languages={preparedData.languages}
            setData={(e: React.ChangeEvent<HTMLInputElement>) =>
              setDataMedia({ language: e.target.value })
            }
          />

          <Filter title='Sort by' id='sort-by'>
            <select
              name='sort-by'
              id='sort-by'
              className='focus:shadow-outline mb-3 w-full appearance-none rounded border border-white px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none'
              onChange={(e) => {
                const options = Array.from(e.target.selectedOptions);
                setDataMedia({
                  with_genres: String(options.map((o) => o.value)),
                });
                console.log(e.target.selectedOptions);
              }}
              multiple
              defaultValue={['all']}
            >
              <option value='all'>All</option>
              {preparedData.genres.map((g) => (
                <option key={g.id} value={g.id}>
                  {g.name}
                </option>
              ))}
            </select>
          </Filter>

          <Filter title='Vote Average' id='vote-average'>
            <div
              id='vote-average'
              className='flex flex-row items-center justify-center space-x-5 object-center'
            >
              <FilterInputNumber
                title='min'
                setData={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setDataMedia({ 'vote_average.gte': Number(e.target.value) })
                }
                id={'vote-average-min'}
                min={0}
                max={10.0}
                step={0.5}
                defaultValue={1.0}
                placeholder='From'
              />
              <FilterInputNumber
                title='max'
                setData={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setDataMedia({ 'vote_average.lte': Number(e.target.value) })
                }
                id={'vote-average-max'}
                min={0}
                max={10.0}
                step={0.5}
                defaultValue={10.0}
                placeholder='To'
              />
            </div>
          </Filter>

          <Filter title='Vote Count' id='vote-count'>
            <div
              id='vote-count'
              className='flex flex-row items-center justify-center space-x-5 object-center'
            >
              <FilterInputNumber
                title='min'
                setData={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setDataMedia({ 'vote_count.gte': Number(e.target.value) })
                }
                id={'vote-count-min'}
                placeholder='From'
              />
              <FilterInputNumber
                title='max'
                setData={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setDataMedia({ 'vote_count.lte': Number(e.target.value) })
                }
                id={'vote-count-max'}
                placeholder='To'
              />
            </div>
          </Filter>

          <FilterInputText
            title='Provider'
            setData={(e: React.ChangeEvent<HTMLInputElement>) =>
              setDataMedia({ with_watch_providers: e.target.value })
            }
            id={'with-watch-providers'}
            placeholder='Provider'
          />

          <FilterInputSelect
            title='Provider'
            id='with-watch-providers'
            data={preparedData.with_watch_providers}
            data_name='provider_name'
            data_key='provider_id'
            multiple
            setData={(e: React.ChangeEvent<HTMLSelectElement>) => {
              setDataMedia({
                with_watch_providers: String(
                  Array.from(e.target.selectedOptions).map((o) => o.value)
                ),
              });
            }}
          />

          <FilterCountries
            countries={preparedData.countries}
            setData={(e: React.ChangeEvent<HTMLSelectElement>) =>
              setDataMedia({ with_origin_country: e.target.value })
            }
            title={'Watch Region'}
            id={'watch-region'}
          />
          <FilterInputText
            title='Without Company'
            setData={(e: React.ChangeEvent<HTMLInputElement>) =>
              setDataMedia({ without_companies: e.target.value })
            }
            id={'without-companies'}
            placeholder='Company'
          />
          <FilterInputText
            title='With Company'
            setData={(e: React.ChangeEvent<HTMLInputElement>) =>
              setDataMedia({ without_companies: e.target.value })
            }
            id={'with-companies'}
            placeholder='Company'
          />

          <Filter title='Runtime' id='runtime'>
            <div
              id='runtime'
              className='flex flex-row items-center justify-center space-x-5 object-center'
            >
              <FilterInputNumber
                title='min'
                setData={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setDataMedia({ 'with_runtime.gte': Number(e.target.value) })
                }
                id={'runtime-min'}
                min={0}
                defaultValue={20}
                placeholder='From'
              />
              <FilterInputNumber
                title='max'
                setData={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setDataMedia({ 'with_runtime.lte': Number(e.target.value) })
                }
                id={'runtime-max'}
                min={1}
                defaultValue={120}
                placeholder='To'
              />
            </div>
          </Filter>

          <FilterGenres
            title='Without Genres'
            id='without-genres'
            genres={preparedData.genres}
            setData={(e: React.ChangeEvent<HTMLSelectElement>) => {
              setDataMedia({
                without_genres: String(
                  Array.from(e.target.selectedOptions).map((o) => o.value)
                ),
              });
            }}
          />

          <Filter title='Original Language' id='original-language'>
            <select
              className='focus:shadow-outline mb-3 w-full appearance-none rounded border border-white px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none'
              id='original-language'
              onChange={(e) =>
                setDataMedia({ with_original_language: e.target.value })
              }
            >
              <option value='all'>All</option>
              {preparedData.languages.map((l) => (
                <option key={l.iso_639_1} id={l.iso_639_1} value={l.iso_639_1}>
                  {l.english_name} {l.name && `| ${l.name}`}
                </option>
              ))}
            </select>
          </Filter>
          <FilterInputText
            title='With Keywords'
            setData={(e: React.ChangeEvent<HTMLInputElement>) =>
              setDataMedia({ with_keywords: e.target.value })
            }
            id={'with-keywords'}
            placeholder='Disney'
          />
          <FilterInputText
            title='Without Keywords'
            setData={(e: React.ChangeEvent<HTMLInputElement>) =>
              setDataMedia({ without_keywords: e.target.value })
            }
            id={'without-keywords'}
            placeholder='Disney'
          />
          <FilterInputCheckbox
            title='Adult'
            checked={dataMovie.include_adult}
            setData={(e: React.ChangeEvent<HTMLInputElement>) =>
              setDataMedia({ include_adult: e.target.checked })
            }
            id={'adult'}
          />

          {typeOfSearch ? (
            <>
              <Filter title='Air Date' id='air-date'>
                <div
                  id='air-date'
                  className='flex flex-row items-center justify-center space-x-5 object-center'
                >
                  <FilterInputText
                    title='min'
                    setData={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setDataTVShow({
                        ...dataTVShow,
                        'air_date.gte': e.target.value,
                      })
                    }
                    id={'air-date-min'}
                    placeholder='1999'
                  />
                  <FilterInputText
                    title='max'
                    setData={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setDataTVShow({
                        ...dataTVShow,
                        'air_date.lte': e.target.value,
                      })
                    }
                    id={'air-date-max'}
                    placeholder='2007'
                  />
                </div>
              </Filter>
              <Filter title='First Air Date' id='first-air-date'>
                <div
                  id='first-air-date'
                  className='flex flex-row items-center justify-center space-x-5 object-center'
                >
                  <FilterInputText
                    title='min'
                    setData={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setDataTVShow({
                        ...dataTVShow,
                        'first_air_date.gte': e.target.value,
                      })
                    }
                    id={'first-air-date-min'}
                    placeholder='1999'
                  />
                  <FilterInputText
                    title='max'
                    setData={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setDataTVShow({
                        ...dataTVShow,
                        'first_air_date.lte': e.target.value,
                      })
                    }
                    id={'first-air-date-max'}
                    placeholder='2007'
                  />
                </div>
              </Filter>
              <FilterInputNumber
                title='First Air Date Year'
                setData={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setDataTVShow({
                    ...dataTVShow,
                    first_air_date_year: Number(e.target.value),
                  })
                }
                id={'first-air-date-year'}
              />
              <FilterInputText
                title='Timezone'
                setData={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setDataTVShow({ ...dataTVShow, timezone: e.target.value })
                }
                id={'timezone'}
                placeholder='2007'
              />
              <FilterInputText
                title='Networks'
                setData={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setDataTVShow({
                    ...dataTVShow,
                    with_networks: e.target.value,
                  })
                }
                id={'with-networks'}
                placeholder='2007'
              />
              <FilterInputCheckbox
                title='Include null first air dates'
                checked={dataTVShow.include_null_first_air_dates}
                setData={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setDataTVShow({
                    ...dataTVShow,
                    include_null_first_air_dates: e.target.checked,
                  })
                }
                id={'include-null-first-air-dates'}
              />
              <FilterInputCheckbox
                title='Screened theatrically'
                checked={dataTVShow.screened_theatrically}
                setData={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setDataTVShow({
                    ...dataTVShow,
                    screened_theatrically: e.target.checked,
                  })
                }
                id={'screened-theatrically'}
              />
              <FilterInputText
                title='Status'
                setData={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setDataTVShow({ ...dataTVShow, with_status: e.target.value })
                }
                id={'status'}
                placeholder='2007'
              />
              <FilterInputText
                title='Networks'
                setData={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setDataTVShow({ ...dataTVShow, with_type: e.target.value })
                }
                id={'type'}
                placeholder='2007'
              />
            </>
          ) : (
            <>
              <FilterCountries
                countries={preparedData.countries}
                setData={(e: React.ChangeEvent<HTMLSelectElement>) =>
                  setDataMovie({
                    ...dataMovie,
                    region: e.target.value,
                  })
                }
                title={'Region'}
                id={'region'}
              />
              <FilterInputText
                title='Certification Country'
                setData={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setDataMovie({
                    ...dataMovie,
                    certification_country: e.target.value,
                  })
                }
                id={'certification-country'}
                placeholder='Disney'
              />
              <FilterInputText
                title='Certification'
                setData={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setDataMovie({ ...dataMovie, certification: e.target.value })
                }
                id={'certification'}
                placeholder='Disney'
              />

              <Filter title='Certification' id='certification-range'>
                <div
                  id='certification-range'
                  className='flex flex-row items-center justify-center space-x-5 object-center'
                >
                  <FilterInputText
                    title='min'
                    setData={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setDataMovie({
                        ...dataMovie,
                        'certification.gte': e.target.value,
                      })
                    }
                    id={'certification-range-min'}
                    placeholder='PG-13'
                  />
                  <FilterInputText
                    title='max'
                    setData={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setDataMovie({
                        ...dataMovie,
                        'certification.lte': e.target.value,
                      })
                    }
                    id={'certification-range-max'}
                    placeholder='R'
                  />
                </div>
              </Filter>

              <FilterInputCheckbox
                title='Include video'
                checked={dataMovie.include_video}
                setData={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setDataMovie({
                    ...dataMovie,
                    include_video: e.target.checked,
                  })
                }
                id={'include_video'}
              />

              <FilterInputNumber
                title='Primary Release Year'
                setData={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setDataMovie({
                    ...dataMovie,
                    primary_release_year: Number(e.target.value),
                  })
                }
                id={'primary_release_year'}
              />

              <Filter title='Primary Release Date' id='primary-release-date'>
                <div
                  id='primary-release-date'
                  className='flex flex-row items-center justify-center space-x-5 object-center'
                >
                  <FilterInputText
                    title='min'
                    setData={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setDataMovie({
                        ...dataMovie,
                        'primary_release_date.gte': e.target.value,
                      })
                    }
                    id={'primary-release-date-min'}
                    placeholder='1999'
                  />
                  <FilterInputText
                    title='max'
                    setData={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setDataMovie({
                        ...dataMovie,
                        'primary_release_date.lte': e.target.value,
                      })
                    }
                    id={'primary-release-date-max'}
                    placeholder='2007'
                  />
                </div>
              </Filter>

              <Filter title='Release Date' id='release-date'>
                <div
                  id='release-date'
                  className='flex flex-row items-center justify-center space-x-5 object-center'
                >
                  <FilterInputText
                    title='min'
                    setData={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setDataMovie({
                        ...dataMovie,
                        'release_date.gte': e.target.value,
                      })
                    }
                    id={'release-date-min'}
                    placeholder='1999'
                  />
                  <FilterInputText
                    title='max'
                    setData={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setDataMovie({
                        ...dataMovie,
                        'release_date.lte': e.target.value,
                      })
                    }
                    id={'release-date-max'}
                    placeholder='2007'
                  />
                </div>
              </Filter>
              <FilterInputText
                title='Release Type'
                setData={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setDataMovie({
                    ...dataMovie,
                    with_release_type: e.target.value,
                  })
                }
                id={'with-release-type'}
                placeholder='2007'
              />

              <FilterInputNumber
                title='Year'
                setData={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setDataMovie({ ...dataMovie, year: Number(e.target.value) })
                }
                id={'year'}
              />

              <FilterInputText
                title='Cast'
                setData={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setDataMovie({ ...dataMovie, with_cast: e.target.value })
                }
                id={'with-cast'}
                placeholder='2007'
              />
              <FilterInputText
                title='Crew'
                setData={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setDataMovie({ ...dataMovie, with_crew: e.target.value })
                }
                id={'with-crew'}
                placeholder='2007'
              />

              <FilterInputText
                title='People'
                setData={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setDataMovie({ ...dataMovie, with_people: e.target.value })
                }
                id={'with-people'}
                placeholder='2007'
              />
            </>
          )}

          <button
            id='btn-search'
            type='submit'
            className='btn rounded-lg bg-white px-3 py-2'
            onClick={async (e) => {
              e.preventDefault();
              {
                typeOfSearch
                  ? setDiscoverTVShowResult(await discoverTVShow(dataTVShow))
                  : setDiscoverMovieResult(await discoverMovie(dataMovie));
              }
            }}
          >
            Search
          </button>
        </form>
      </section>
      <section id='search-results' className='w-4/5'>
        <div className='p-5 text-white'>
          {typeOfSearch
            ? JSON.stringify(dataTVShow, null, 3)
            : JSON.stringify(dataMovie, null, 3)}

          {/* {typeOfSearch ? (
            <ul>
              {discoverTVShowResult &&
                discoverTVShowResult.results.map((show) => (
                  <li key={show.id}>{show.name}</li>
                ))}
            </ul>
          ) : (
            <ul>
              {discoverMovieResult &&
                discoverMovieResult?.results.map((movie) => (
                  <li key={movie.id}>{movie.title}</li>
                ))}
            </ul>
          )} */}
          {typeOfSearch
            ? discoverTVShowResult && (
                <SearchMediaList data={discoverTVShowResult} />
              )
            : discoverMovieResult && (
                <SearchMediaList data={discoverMovieResult} />
              )}
        </div>
      </section>
    </main>
  );
}
