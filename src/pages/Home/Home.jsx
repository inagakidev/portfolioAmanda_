import Background from '../../components/Background/Background';
import Telemetry from '../../components/Telemetry/Telemetry';
import Header from '../../components/Header/Header';
import Hero from '../../components/Hero/Hero';
import styles from './Home.module.css';

export default function Home() {
  return (
    <div className={styles.page}>
      <Background />
      <Telemetry />
      <Header />
      <main className={styles.main}>
        <Hero />
      </main>
    </div>
  );
}
