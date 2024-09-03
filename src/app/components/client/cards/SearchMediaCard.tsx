import { configuration } from '@/api/configuration';
import Image from 'next/image';

interface SearchMediaCardProps {
  id: number;
  title: string;
  image: string;
  type: 'movie' | 'tv';
  desc: string;
}

export default function SearchMediaCard({
  id,
  title,
  image,
  type,
  desc,
}: SearchMediaCardProps) {
  return (
    <a
      id={'media-' + id}
      href={`/${type}/${id}?title=${title}`}
      className='flex w-full flex-row'
    >
      {/* <div className='w-[300px] relative'> */}
      <Image
        src={
          image
            ? configuration.images.secure_base_url + 'w300' + image
            : 'https://placehold.co/300x450/png?text=NO+POSTER'
        }
        // fill
        alt={title}
        // sizes='50vw'
        width={300}
        height={450}
        loading='lazy'
        className='h-32 w-fit rounded-l-lg object-contain shadow-lg laptop:h-48 desktop:h-64'
      />
      <div className='w-full space-y-5 rounded-r-lg bg-black/50 px-5 py-2 tablet:rounded-bl-lg'>
        <h2 className='text-md laptop:text-xl desktop:text-2xl'>{title}</h2>
        <p></p>
        <p className='laptop:text-md hidden tablet:block tablet:text-sm'>
          {desc}
        </p>
      </div>
    </a>
  );
}
