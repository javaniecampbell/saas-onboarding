import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import RegistrationForm from '../components/RegistrationForm'

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>SaaS Onboarding</title>
        <meta name="description" content="SaaS Onboarding app for B2B customers through a third party and subscriptions" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

     <RegistrationForm />
    </div>
  )
}

export default Home
