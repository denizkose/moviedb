import Movie from '@/components/client/movie/Movie';
import { DB_LOCALE } from '@/lib/utils';
import { tmdb } from '@/tmdb';

export default async function Page({ params }: { params: { slug: string } }) {
  // const movie = await getMedia(Number(params.slug), 'movie')

  const movie =
    (await tmdb.movies.details(
      Number(params.slug),
      [
        'credits',
        'recommendations',
        'lists',
        'similar',
        'videos',
        'images',
        'watch/providers',
      ],
      DB_LOCALE
    )) || undefined;
  return <Movie movie={movie} />;
}
