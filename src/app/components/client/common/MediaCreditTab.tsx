import { configuration } from '@/api/configuration';
import Image from 'next/image';
import { Cast, Crew } from 'tmdb-ts';

type CreditProp = {
  credits: Cast[] | Crew[];
};

export default function MediaCreditList({ credits }: CreditProp) {
  return (
    <ul className='grid grid-cols-2 gap-4 tablet:grid-cols-3 desktop:grid-cols-4'>
      {credits.map((person) => (
        <li key={person.id}>
          <div className='flex flex-col items-center'>
            <h4 className='mb-1 text-xl font-medium'>{person.name}</h4>
            <div className='relative aspect-[0.67/1] h-64 w-auto'>
              <Image
                src={
                  person.profile_path
                    ? configuration.images.secure_base_url +
                      'w500' +
                      person.profile_path
                    : 'https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-4-user-grey-d8fe957375e70239d6abdd549fd7568c89281b2179b5f4470e2e12895792dfa5.svg'
                }
                alt={person.original_name}
                fill
                className='mx-auto rounded-lg object-contain'
                loading='lazy'
                sizes='50vw'
              />
            </div>
            <p className='mb-1 italic'>
              {(person as Cast).character || (person as Crew).job}
            </p>
          </div>
        </li>
      ))}
    </ul>
  );
}
