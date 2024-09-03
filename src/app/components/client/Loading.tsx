import { colors } from '@/lib/colors';

export default function Loading() {
  return (
    <div className='absolute left-0 top-0 z-50 flex h-screen w-screen flex-col items-center justify-center bg-black'>
      <div className='flex space-x-2'>
        <div
          className={`h-4 w-4 rounded-full ${colors.main.bg} animate-bounce`}
        ></div>
        <div
          className={`h-4 w-4 rounded-full ${colors.accent.bg} animate-bounce2`}
        ></div>
        <div
          className={`h-4 w-4 rounded-full ${colors.main.bg} animate-bounce`}
        ></div>
      </div>
      <div className='mt-4 text-center'>
        <p className={`text-lg font-semibold ${colors.addition.gray_light}`}>
          Loading...
        </p>
        <p className={`text-sm ${colors.addition.gray_light}`}>
          Your data is on its way!
        </p>
      </div>
    </div>
  );
}
