import VideoModal from '@/components/client/cards/VideoCard';
import Image from 'next/image';
import { configuration } from '@/api/configuration';
import { Image as IMage, Video } from 'tmdb-ts';

type FilesProps = {
  videos: Video[];
  images: IMage[];
};

type BackDropImage = {
  backDropImage: string;
};

export default function MediaFiles({
  videos,
  images,
  backDropImage,
}: FilesProps & BackDropImage) {
  const hasVideos = videos?.length > 0;
  const hasImages = images?.length > 0;
  const isEmpty = hasVideos === false && hasImages === false;
  return (
    <>
      {hasVideos && (
        <>
          <h3 className='my-5 w-2/5 border-b-4 border-white text-4xl font-light'>
            Videos
          </h3>
          <ul className='grid grid-cols-1 gap-4 tablet:grid-cols-3 desktop:grid-cols-4'>
            {videos.map((video) => {
              return (
                <div key={video.id} className='flex flex-col justify-between'>
                  <VideoModal
                    videoKey={video.key}
                    thumb={
                      configuration.images.secure_base_url +
                      'w500' +
                      backDropImage
                    }
                    title={video.name}
                    type={video.type}
                  />
                </div>
              );
            })}
          </ul>
        </>
      )}
      {hasImages && (
        <>
          <h3 className='my-5 w-2/5 border-b-4 border-white text-4xl font-light'>
            Pictures
          </h3>
          <ul className='grid grid-cols-1 gap-4 tablet:grid-cols-3 desktop:grid-cols-4'>
            {images.map((image, index) => (
              <li key={index}>
                <Image
                  src={
                    configuration.images.secure_base_url +
                    'w500' +
                    image.file_path
                  }
                  height={image.height}
                  width={image.width}
                  alt={`Backdrop ${index}`}
                  loading='lazy'
                />
              </li>
            ))}
          </ul>
        </>
      )}
      {isEmpty && (
        <>
          <p>Nothing to show</p>
        </>
      )}
    </>
  );
}
