import Image from 'next/image';

interface PictureCardProps {
  id: number;
  title: string;
  image: string;
  type: 'movie' | 'tv';
}

export default function PictureCard({
  id,
  title,
  image,
  type,
}: PictureCardProps) {
  return (
    <a
      id={'media-' + id}
      href={`/${type}/${id}?title=${title}`}
      className='relative h-60 w-40 shrink-0 snap-end snap-normal'
    >
      <Image
        src={image}
        fill
        alt={title}
        sizes='50vw'
        loading='lazy'
        className='rounded-lg object-cover shadow-lg'
      />
    </a>
  );
}
