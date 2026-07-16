import { useTranslation } from 'react-i18next';
import styles from './Experiences.module.css';
import useScrollReveal from '../../hooks/useScrollReveal';
import revealStyles from '../../styles/reveal.module.css';

const TIMELINE_META = [
  { id: 'ads', icon: 'target' },
  { id: 'exploration', icon: 'compass' },
  { id: 'frontend', icon: 'code', current: true },
];

function TimelineIcon({ icon }) {
  const common = { width: 16, height: 16, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 1.8 };
  if (icon === 'code') {
    return (
      <svg {...common}>
        <path strokeLinecap="round" strokeLinejoin="round" d="m9 8-4 4 4 4M15 8l4 4-4 4" />
      </svg>
    );
  }
  if (icon === 'target') {
    return (
      <svg {...common}>
        <circle cx="12" cy="12" r="8" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="12" cy="12" r="0.6" fill="currentColor" />
      </svg>
    );
  }
  return (
    <svg {...common}>
      <circle cx="12" cy="12" r="8.5" />
      <path strokeLinecap="round" strokeLinejoin="round" d="m14.8 9.2-2 4.2-4.2 2 2-4.2 4.2-2Z" />
    </svg>
  );
}

export default function Experiencias() {
  const { t } = useTranslation();
  const [containerRef, isVisible] = useScrollReveal({ once: true });

  const TIMELINE = TIMELINE_META.map((meta) => ({
    ...meta,
    period: t(`experiences.timeline.${meta.id}.period`),
    title: t(`experiences.timeline.${meta.id}.title`),
    description: t(`experiences.timeline.${meta.id}.description`),
    tags: t(`experiences.timeline.${meta.id}.tags`, { returnObjects: true }),
  }));

  return (
    <section
      id="experiencias"
      ref={containerRef}
      className={`${styles.experiencias} ${isVisible ? revealStyles.revealActive : revealStyles.reveal}`}
    >
      <div className={`${styles.eyebrow} ${revealStyles.revealChild} ${revealStyles.delay1}`}>
        <span className={styles.eyebrowIndex}>04</span>
        <span className={styles.eyebrowLine} aria-hidden="true" />
        <span className={styles.eyebrowLabel}>{t('experiences.eyebrow')}</span>
      </div>

      <h2 className={`${styles.heading} ${revealStyles.revealChild} ${revealStyles.delay2}`}>
        <span className={styles.headingPrimary}>{t('experiences.headingPrimary')}</span>
        <span className={styles.headingMuted}>{t('experiences.headingMuted')}</span>
      </h2>

      <ol className={`${styles.timeline} ${revealStyles.revealChild} ${revealStyles.delay3}`}>
        {TIMELINE.map((item, index) => (
          <li
            key={item.id}
            className={`${styles.item} ${item.current ? styles.itemCurrent : ''} ${revealStyles.revealChild} ${revealStyles['delay' + (index + 3)]}`}
          >
            <div className={styles.markerColumn}>
              <span className={`${styles.marker} ${item.current ? styles.markerCurrent : ''}`} aria-hidden="true">
                <TimelineIcon icon={item.icon} />
              </span>
              {index < TIMELINE.length - 1 && <span className={styles.connector} aria-hidden="true" />}
            </div>

            <div className={styles.details}>
              <p className={styles.period}>
                {item.period}
                {item.current && <span className={styles.currentBadge}>{t('experiences.currentLabel')}</span>}
              </p>
              <h3 className={styles.title}>{item.title}</h3>
              <p className={styles.description}>{item.description}</p>
              <ul className={styles.tags}>
                {item.tags.map((tag) => (
                  <li key={tag} className={styles.tag}>
                    {tag}
                  </li>
                ))}
              </ul>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}