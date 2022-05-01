import Head from 'next/head'
import Image from 'next/image'

function Layout() {
  return (
    <div className={'px-0 py-8 font-sans'}>
    <Head>
      <title>SaaS Onboarding</title>
      <meta name="description" content="SaaS Onboarding app for B2B customers through a third party and subscriptions" />
      <link rel="icon" href="/favicon.ico" />
    </Head>

    <main className={'h-screen flex flex-col justify-center items-center flex-1 py-16 px-0 '}>
      <h1 className={''}>
        Welcome to SaaS Onboarding
      </h1>

    </main>

    <footer className={'flex flex-col justify-center items-center border-t flex-1 p-4'}>
      <a
        href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
        target="_blank"
        rel="noopener noreferrer"
      >
        Powered by{' '}
        <span className={''}>
          <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
        </span>
      </a>
    </footer>
  </div>
  )
}

export default Layout