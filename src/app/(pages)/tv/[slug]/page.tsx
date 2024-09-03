import TVShow from '@/components/client/tvshow/TVShow';
import { DB_LOCALE } from '@/lib/utils';
import { tmdb } from '@/tmdb';

export default async function Page({ params }: { params: { slug: string } }) {
  // const movie = await getMedia(Number(params.slug), 'movie')

  const tvshow =
    (await tmdb.tvShows.details(
      Number(params.slug),
      [
        'credits',
        'recommendations',

        'similar',
        'videos',
        'images',
        'watch/providers',
      ],
      DB_LOCALE
    )) || undefined;
  return <TVShow tv={tvshow} />;
}
