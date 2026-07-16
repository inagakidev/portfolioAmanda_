import { useTranslation } from 'react-i18next';
import styles from './Hero.module.css';
import useScrollReveal from '../../hooks/useScrollReveal';
import revealStyles from '../../styles/reveal.module.css';

function SocialIcon({ icon }) {
  if (icon === 'github') {
    return (
      <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
        <path d="M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48v-1.7c-2.78.6-3.37-1.34-3.37-1.34-.46-1.16-1.11-1.47-1.11-1.47-.9-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.9 1.53 2.36 1.09 2.94.83.09-.65.35-1.09.63-1.34-2.22-.25-4.56-1.11-4.56-4.95 0-1.09.39-1.99 1.03-2.69-.1-.25-.45-1.27.1-2.65 0 0 .84-.27 2.75 1.03a9.53 9.53 0 0 1 5 0c1.9-1.3 2.75-1.03 2.75-1.03.55 1.38.2 2.4.1 2.65.64.7 1.03 1.6 1.03 2.69 0 3.85-2.34 4.7-4.57 4.94.36.31.68.92.68 1.85v2.74c0 .27.18.58.69.48A10 10 0 0 0 12 2Z" />
      </svg>
    );
  }
  if (icon === 'linkedin') {
    return (
      <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
        <path d="M6.94 8.5H3.56V20.4h3.38V8.5ZM5.25 3.1a1.96 1.96 0 1 0 0 3.92 1.96 1.96 0 0 0 0-3.92ZM20.44 20.4h-3.37v-6.24c0-1.49-.03-3.4-2.07-3.4-2.08 0-2.4 1.62-2.4 3.29v6.35H9.23V8.5h3.24v1.63h.05c.45-.85 1.56-1.75 3.2-1.75 3.42 0 4.72 2.25 4.72 5.71v6.31Z" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.8">
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path strokeLinecap="round" strokeLinejoin="round" d="m4 7 8 6 8-6" />
    </svg>
  );
}

export default function Hero() {
  const { t } = useTranslation();
  const [heroRef, heroVisible] = useScrollReveal({ once: true });
  const socialLinks = [
    { label: t('hero.socials.github'), href: 'https://github.com/inagakidev', icon: 'github' },
    { label: t('hero.socials.linkedin'), href: 'https://linkedin.com/in/amandainagaki', icon: 'linkedin' },
    { label: t('hero.socials.email'), href: 'mailto:inagakilanding@gmail.com', icon: 'mail' },
  ];

  return (
    <section id="inicio" ref={heroRef} className={`${styles.hero} ${heroVisible ? revealStyles.revealActive : revealStyles.reveal}`}>
      <p className={`${styles.badge} ${revealStyles.revealChild} ${revealStyles.delay1}`}>
        <span className={styles.badgeDot} aria-hidden="true" />
        {t('hero.badge')}
      </p>

      <h1 className={`${styles.title} ${revealStyles.revealChild} ${revealStyles.delay2}`}>
        <span className={styles.titlePrimary}>{t('hero.titlePrimary')}</span>
        <span className={styles.titleAccent}>{t('hero.titleAccent')}</span>
      </h1>

      <p className={`${styles.subtitle} ${revealStyles.revealChild} ${revealStyles.delay3}`}>
        {t('hero.subtitle')}
      </p>

      <div className={`${styles.actions} ${revealStyles.revealChild} ${revealStyles.delay4}`}>
        <a
          href="#projetos"
          className={styles.primaryCta}
          aria-label={`${t('hero.primaryCta')} — ${t('hero.subtitle')}`}
        >
          {t('hero.primaryCta')}
          <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 5v14M5 12l7 7 7-7" />
          </svg>
        </a>
        <a href="#contato" className={styles.secondaryCta} aria-label={t('hero.secondaryCta')}>
          {t('hero.secondaryCta')}
        </a>
      </div>

      <ul className={`${styles.socials} ${revealStyles.revealChild} ${revealStyles.delay6}`}>
        {socialLinks.map((social) => (
          <li key={social.label}>
            <a
              href={social.href}
              aria-label={social.label}
              className={styles.socialLink}
              target={social.href.startsWith('http') ? '_blank' : undefined}
              rel={social.href.startsWith('http') ? 'noreferrer noopener' : undefined}
            >
              <SocialIcon icon={social.icon} />
            </a>
          </li>
        ))}
      </ul>

      <p className={`${styles.availability} ${revealStyles.revealChild} ${revealStyles.delay7}`}>
        <span className={styles.availabilityDot} aria-hidden="true" />
        {t('hero.availability')}
      </p>
    </section>
  );
}
