import { colors } from '@/lib/colors';
import { faYoutube } from '@fortawesome/free-brands-svg-icons';
import { faPlay } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Image from 'next/image';

interface VideoProps {
  videoKey: string;
  thumb: string;
  title: string;
  type: string;
}

export default function VideoModal({
  videoKey,
  thumb,
  title,
  type,
}: VideoProps) {
  const showVideo = (videoId: string) => {
    const frame = document.getElementById(videoId);
    frame?.classList.replace('invisible', 'visible');
  };
  return (
    <div className='relative z-10 flex h-64 w-full flex-col'>
      <Image
        src={thumb}
        alt={title}
        fill
        className='aspect-video object-cover brightness-[.30]'
        sizes='100vw'
      />
      <FontAwesomeIcon
        icon={faYoutube}
        className='z-0 h-9 w-9 place-self-start pl-5 pt-5 text-red-600'
      />
      <div className='absolute inset-y-0 z-0 place-self-center text-center text-lg font-semibold'>
        <h3 className='text-lg font-semibold'>
          {title} | {type}
        </h3>
        <button
          className={`h-14 w-full ${colors.accent.text_hover}`}
          onClick={() => showVideo(videoKey)}
        >
          <FontAwesomeIcon
            icon={faPlay}
            className={`hover:${colors.accent.text}`}
          />
        </button>
      </div>

      <div
        id={videoKey}
        className='invisible absolute inset-0 z-10 aspect-video w-full place-self-center'
      >
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${videoKey}`}
          allow='autoplay; encrypted-media'
          allowFullScreen
          className='z-20 h-full w-full'
        ></iframe>
      </div>
    </div>
  );
}
