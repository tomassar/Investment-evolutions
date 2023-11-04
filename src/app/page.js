import Head from 'next/head';
import Dashboard from '../components/Dashboard';

export default function Home() {
  return (
    <div>
      <Head>
        <title>Investment Evolution</title>
        <meta name="description" content="Real-time investment chart" />
      </Head>
      <main>
        <Dashboard/>
      </main>
    </div>
  );
}
