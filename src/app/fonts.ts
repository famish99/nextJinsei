import localFont from 'next/font/local'

export const firago = localFont({
  src: [
    {
      path: 'fonts/FiraGO-Book.woff2',
      weight: '300',
      style: 'normal',
    },
    {
      path: 'fonts/FiraGO-Regular.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: 'fonts/FiraGO-Medium.woff2',
      weight: '500',
      style: 'normal',
    },
    {
      path: 'fonts/FiraGO-SemiBold.woff2',
      weight: '600',
      style: 'normal',
    },
    {
      path: 'fonts/FiraGO-Bold.woff2',
      weight: '700',
      style: 'normal',
    },
  ],
})
