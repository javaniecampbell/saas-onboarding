import CreateAccountForm from '@/components/CreateAccountForm'
import { useUser } from '@auth0/nextjs-auth0'
import type { NextPage } from 'next'
import Head from 'next/head'
import RegistrationForm from '../components/RegistrationForm'

const Home: NextPage = () => {
  const { user, isLoading } = useUser()
  return (
    <div>
      <Head>
        <title>SaaS Onboarding</title>
        <meta name="description" content="SaaS Onboarding app for B2B customers through a third party and subscriptions" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {(!isLoading && !user) ? <RegistrationForm /> :
        <CreateAccountForm image={user?.picture!} email={user?.email!} firstName={user?.name?.split(" ")[0]} lastName={user?.name?.split(" ")[1]} />}

      {(!isLoading && user) ? (<div className="min-h-full flex flex-col justify-center py-12 sm:px-6 lg:px-8 ">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
            <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10 ">
              <pre className="">{JSON.stringify(user, null, 4)}</pre>
            </div>
          </div>
        </div>
      </div>) : null}
    </div>
  )
}

export default Home
