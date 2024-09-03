import { collections } from '@/fakedb'; //debug
import CollectionCard from '../cards/CollectionCard';

export default function CollectionList() {
  return (
    <div
      id='media-carousel'
      className='flex snap-x snap-mandatory flex-row space-x-5 overflow-x-auto overscroll-x-auto'
    >
      {collections.map((collection) => (
        <CollectionCard key={collection.name} collection={collection} />
      ))}
    </div>
  );
}
