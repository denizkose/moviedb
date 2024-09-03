import { configuration } from '@/api/configuration';
import { colors } from '@/lib/colors';
import { convertDate, minutesToHours } from '@/lib/utils';
import { tmdb } from '@/tmdb';
import { faCalendar, faClock } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { AppendToResponse, SeasonDetails, TvShowDetails } from 'tmdb-ts';

type TVDetailsProps = {
  tv: AppendToResponse<
    TvShowDetails,
    ('similar' | 'recommendations' | 'credits' | 'videos' | 'images')[],
    'tvShow'
  >;
};

export default function TVShowEpisodesTab({ tv }: TVDetailsProps) {
  const [seasons, setSeasons] = useState<SeasonDetails[]>([]);

  const getEpisodes = async (show_id: number, total_seasons: number) => {
    const seasons = [];

    for (let i = 0; i <= total_seasons; i++) {
      try {
        const season = await tmdb.tvSeasons.details(
          { tvShowID: show_id, seasonNumber: i },
          ['images', 'translations']
        );
        seasons.push(season);
      } catch (error) {
        console.error(error);
      }
    }
    return seasons;
  };

  useEffect(() => {
    const getSeasons = async () => {
      const res = await getEpisodes(tv.id, tv.number_of_seasons);
      setSeasons(res.filter((season) => season.air_date !== null));
    };
    getSeasons();
  }, [tv.id, tv.number_of_seasons]);

  const changeSeason = (season_number: number) => {
    // Cache DOM elements
    const chosenButton = document.getElementById(`btn-season-${season_number}`);
    const chosenTab = document.getElementById(`tab-season-${season_number}`);

    // Early return if elements are not found
    if (!chosenButton || !chosenTab) return;

    seasons.forEach((season) => {
      const button = document.getElementById(
        `btn-season-${season.season_number}`
      );
      const tab = document.getElementById(`tab-season-${season.season_number}`);

      if (button && tab) {
        if (season.season_number === season_number) {
          // Activate the chosen tab and button
          button.classList.replace('text-gray-400', 'text-white');
          tab.classList.remove('hidden');
          setTimeout(
            () => tab.classList.replace('opacity-0', 'opacity-100'),
            1
          );
        } else {
          // Deactivate other tabs and buttons
          button.classList.replace('text-white', 'text-gray-400');
          tab.classList.replace('opacity-100', 'opacity-0');
          setTimeout(() => tab.classList.add('hidden'), 500);
        }
      }
    });
  };

  changeSeason(seasons.length);
  return (
    <>
      <div className='my-5 flex flex-row items-center space-x-5 overflow-x-auto laptop:overflow-x-hidden'>
        {seasons.map((season) => (
          <button
            className='text-nowrap font-semibold text-white'
            key={season.season_number}
            id={`btn-season-${season.season_number}`}
            onClick={() => changeSeason(season.season_number)}
          >
            {season.name}
          </button>
        ))}
      </div>
      <div className='flex flex-col'>
        {seasons.map((season) => (
          <div
            key={season.season_number}
            id={`tab-season-${season.season_number}`}
            className={`${
              season.season_number === seasons.length - 1
                ? 'opacity-100'
                : 'hidden opacity-0'
            } flex flex-col transition-opacity duration-500 ease-in-out`}
          >
            <h3 className='mb-5 text-lg text-white'>{season.name}</h3>
            <ul className='grid grid-cols-1 gap-5 tablet:grid-cols-3 laptop:grid-cols-4 desktop:grid-cols-5'>
              {season.episodes.map((episode, index) => (
                <li key={episode.id} className=''>
                  <div className='flex flex-col space-y-5'>
                    <div className='relative aspect-video h-auto'>
                      <Image
                        fill
                        src={
                          configuration.images.secure_base_url +
                          'original' +
                          episode.still_path
                        }
                        alt={tv.name}
                        className='object-cover'
                        loading='lazy'
                      />
                    </div>
                    <h4 className='flex w-full flex-col space-y-5'>
                      <span className='space-x-2 font-semibold'>
                        <span>
                          {index + 1}. {episode.name}
                        </span>{' '}
                        <span
                          className={`rounded-md px-1 py-1 text-sm ${colors.main.bg}`}
                        >
                          {episode.vote_average.toFixed(1)}
                        </span>
                      </span>
                      <span className='space-x-2'>
                        <FontAwesomeIcon
                          icon={faCalendar}
                          className={`w-4 ${colors.main.text}`}
                        />
                        <span>{convertDate(episode.air_date)}</span>
                        <FontAwesomeIcon
                          icon={faClock}
                          className={`w-4 ${colors.main.text}`}
                        />
                        <span>{minutesToHours(episode.runtime)}</span>
                      </span>
                    </h4>
                    <div>
                      <p>{episode.overview}</p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </>
  );
}
