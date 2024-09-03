import Image from 'next/image';

interface CollectionCardProps {
  name: string;
  color: string;
  bgcolor: string;
  imageURL: string;
}

interface CollectionCard {
  collection: CollectionCardProps;
}

export default function CollectionCard({ collection }: CollectionCard) {
  const { name, color, bgcolor, imageURL } = collection;
  return (
    <div
      className={`my-5 flex flex-row ${bgcolor} ${color} h-32 w-32 shrink-0 snap-end snap-normal rounded-xl shadow-xl tablet:h-48 tablet:w-48 laptop:h-64 laptop:w-64`}
    >
      <div className='relative w-2/3 rounded-xl p-1'>
        <Image
          src={imageURL}
          alt={name}
          fill
          loading='lazy'
          className='object-contain object-left-bottom'
        />
      </div>

      <div className='tablet:text-md flex w-1/3 flex-row items-center pt-2 font-bold uppercase [writing-mode:vertical-rl] laptop:text-2xl desktop:text-3xl'>
        <span className='tablet:pt-3 laptop:pt-4 desktop:pt-5'>{name}</span>
      </div>
    </div>
  );
}
