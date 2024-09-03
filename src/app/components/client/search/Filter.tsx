type FilterType = {
  children: any;
  title?: string;
  id: string;
  desc?: string;
};

export default function Filter({ children, title, id, desc }: FilterType) {
  return (
    <div className='flex flex-col'>
      <label className='mb-2 block text-sm font-bold text-white' htmlFor={id}>
        {title}
      </label>
      {children}
      {desc && <p className='text-xs italic text-red-500'>{desc}</p>}
    </div>
  );
}
