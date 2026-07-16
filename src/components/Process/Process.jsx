import { useTranslation } from 'react-i18next';
import styles from './Process.module.css';
import useScrollReveal from '../../hooks/useScrollReveal';
import revealStyles from '../../styles/reveal.module.css';



export default function Processo() {
  const { t } = useTranslation();
  const [containerRef, isVisible] = useScrollReveal({ once: true });
  const steps = [
    {
      number: '01',
      title: t('process.steps.discovery.title'),
      description: t('process.steps.discovery.description'),
    },
    {
      number: '02',
      title: t('process.steps.strategy.title'),
      description: t('process.steps.strategy.description'),
    },
    {
      number: '03',
      title: t('process.steps.design.title'),
      description: t('process.steps.design.description'),
    },
    {
      number: '04',
      title: t('process.steps.development.title'),
      description: t('process.steps.development.description'),
    },
    {
      number: '05',
      title: t('process.steps.launch.title'),
      description: t('process.steps.launch.description'),
    },
  ];

  return (
    <section id="processo" ref={containerRef} className={`${styles.wrapper} ${isVisible ? revealStyles.revealActive : revealStyles.reveal}`}>
      <div className={styles.panel}>
        <div className={styles.panelGrid} aria-hidden="true" />
        <span className={styles.edgeLine} aria-hidden="true" />
        <span className={`${styles.edgeLine} ${styles.edgeLineBottom}`} aria-hidden="true" />

        <div className={styles.content}>
          <div className={`${styles.eyebrow} ${revealStyles.revealChild} ${revealStyles.delay1}`}>
            <span className={styles.eyebrowIndex}>06</span>
            <span className={styles.eyebrowLine} aria-hidden="true" />
            <span className={styles.eyebrowLabel}>{t('process.eyebrow')}</span>
          </div>

          <h2 className={`${styles.heading} ${revealStyles.revealChild} ${revealStyles.delay2}`}>
            <span className={styles.headingPrimary}>{t('process.headingPrimary')}</span>
            <span className={styles.headingMuted}>{t('process.headingMuted')}</span>
          </h2>

          <ol className={styles.steps}>
            {steps.map((step, index) => (
              <li key={step.number} className={`${styles.step} ${revealStyles.revealChild} ${revealStyles['delay' + (index + 3)]}`}>
                <p className={styles.stepIndex}>
                  <span aria-hidden="true">·</span> {step.number}
                </p>
                <h3 className={styles.stepTitle}>{step.title}</h3>
                <p className={styles.stepDescription}>{step.description}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}