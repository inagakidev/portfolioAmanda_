import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import ContactForm from './ContactForm';
import useScrollReveal from '../../hooks/useScrollReveal';
import revealStyles from '../../styles/reveal.module.css';
import styles from './Contact.module.css';

// Dados reais de contato — não fazem parte do i18n porque não mudam por idioma.
const CHANNEL_DATA = {
  email: {
    icon: 'mail',
    value: 'inagakilanding@gmail.com',
    href: 'mailto:inagakilanding@gmail.com',
    copyable: true,
  },
  location: {
    icon: 'pin',
    href: null,
  },
  github: {
    icon: 'github',
    href: 'https://github.com/inagakidev',
  },
};

function ChannelIcon({ icon }) {
  const common = { width: 16, height: 16, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 1.8 };
  if (icon === 'mail') {
    return (
      <svg {...common}>
        <rect x="3" y="5" width="18" height="14" rx="2" />
        <path strokeLinecap="round" strokeLinejoin="round" d="m4 7 8 6 8-6" />
      </svg>
    );
  }
  if (icon === 'pin') {
    return (
      <svg {...common}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 21s7-6.5 7-11.5A7 7 0 0 0 5 9.5C5 14.5 12 21 12 21Z" />
        <circle cx="12" cy="9.5" r="2.3" />
      </svg>
    );
  }
  if (icon === 'github') {
    return (
      <svg {...common} fill="currentColor" stroke="none">
        <path d="M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48v-1.7c-2.78.6-3.37-1.34-3.37-1.34-.46-1.16-1.11-1.47-1.11-1.47-.9-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.9 1.53 2.36 1.09 2.94.83.09-.65.35-1.09.63-1.34-2.22-.25-4.56-1.11-4.56-4.95 0-1.09.39-1.99 1.03-2.69-.1-.25-.45-1.27.1-2.65 0 0 .84-.27 2.75 1.03a9.53 9.53 0 0 1 5 0c1.9-1.3 2.75-1.03 2.75-1.03.55 1.38.2 2.4.1 2.65.64.7 1.03 1.6 1.03 2.69 0 3.85-2.34 4.7-4.57 4.94.36.31.68.92.68 1.85v2.74c0 .27.18.58.69.48A10 10 0 0 0 12 2Z" />
      </svg>
    );
  }
  return (
    <svg {...common} fill="currentColor" stroke="none">
      <path d="M6.94 8.5H3.56V20.4h3.38V8.5ZM5.25 3.1a1.96 1.96 0 1 0 0 3.92 1.96 1.96 0 0 0 0-3.92ZM20.44 20.4h-3.37v-6.24c0-1.49-.03-3.4-2.07-3.4-2.08 0-2.4 1.62-2.4 3.29v6.35H9.23V8.5h3.24v1.63h.05c.45-.85 1.56-1.75 3.2-1.75 3.42 0 4.72 2.25 4.72 5.71v6.31Z" />
    </svg>
  );
}

function ExternalArrow() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M7 17 17 7M9 7h8v8" />
    </svg>
  );
}

function CopyIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
      <rect x="9" y="9" width="12" height="12" rx="2" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 15H4a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v1" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="m5 13 4 4L19 7" />
    </svg>
  );
}

export default function Contato() {
  const { t } = useTranslation();
  const [containerRef, isVisible] = useScrollReveal({ once: true });
  const [copiedId, setCopiedId] = useState(null);

  const CHANNELS = [
    {
      id: 'email',
      ...CHANNEL_DATA.email,
      label: t('contact.channels.email.label'),
    },
    {
      id: 'location',
      ...CHANNEL_DATA.location,
      label: t('contact.channels.location.label'),
      value: t('contact.channels.location.value'),
    },
    {
      id: 'github',
      ...CHANNEL_DATA.github,
      label: t('contact.channels.github.label'),
      value: t('contact.channels.github.value'),
    },
  ];

  const handleCopy = async (event, channel) => {
    event.preventDefault();
    event.stopPropagation();
    try {
      await navigator.clipboard.writeText(channel.value);
      setCopiedId(channel.id);
      setTimeout(() => setCopiedId(null), 2000);
    } catch (err) {
      console.error('Failed to copy to clipboard', err);
    }
  };

  return (
    <section
      id="contato"
      ref={containerRef}
      className={`${styles.contato} ${isVisible ? revealStyles.revealActive : revealStyles.reveal}`}
    >
      <div className={`${styles.eyebrow} ${revealStyles.revealChild} ${revealStyles.delay1}`}>
        <span className={styles.eyebrowIndex}>07</span>
        <span className={styles.eyebrowLine} aria-hidden="true" />
        <span className={styles.eyebrowLabel}>{t('contact.eyebrow')}</span>
      </div>

      <div className={styles.grid}>
        <div className={`${styles.intro} ${revealStyles.revealChild} ${revealStyles.delay2}`}>
          <h2 className={`${styles.heading} ${revealStyles.revealChild} ${revealStyles.delay3}`}>
            <span className={styles.headingPrimary}>{t('contact.headingPrimary')}</span>
            <span className={styles.headingAccent}>{t('contact.headingAccent')}</span>
          </h2>

          <p className={`${styles.description} ${revealStyles.revealChild} ${revealStyles.delay4}`}>
            {t('contact.description')}
          </p>

          <ul className={`${styles.channels} ${revealStyles.revealChild} ${revealStyles.delay5}`}>
            {CHANNELS.map((channel, index) => {
              const Wrapper = channel.href ? 'a' : 'div';
              const wrapperProps = channel.href
                ? {
                    href: channel.href,
                    target: channel.href.startsWith('http') ? '_blank' : undefined,
                    rel: channel.href.startsWith('http') ? 'noreferrer noopener' : undefined,
                  }
                : {};
              const isCopied = copiedId === channel.id;

              return (
                <li key={channel.id}>
                  <div className={styles.channelRow}>
                    <Wrapper
                      className={`${styles.channel} ${revealStyles.revealChild} ${revealStyles['delay' + (6 + index)]}`}
                      {...wrapperProps}
                    >
                      <span className={styles.channelIcon} aria-hidden="true">
                        <ChannelIcon icon={channel.icon} />
                      </span>
                      <span className={styles.channelText}>
                        <span className={styles.channelLabel}>{channel.label}</span>
                        <span className={styles.channelValue}>{channel.value}</span>
                      </span>
                      {channel.href && !channel.copyable && (
                        <span className={styles.channelArrow} aria-hidden="true">
                          <ExternalArrow />
                        </span>
                      )}
                    </Wrapper>

                    {channel.copyable && (
                      <button
                        type="button"
                        className={`${styles.copyButton} ${isCopied ? styles.copyButtonActive : ''}`}
                        onClick={(event) => handleCopy(event, channel)}
                        aria-label={isCopied ? t('copied') : t('copy')}
                      >
                        {isCopied ? <CheckIcon /> : <CopyIcon />}
                        <span className={styles.copyTooltip}>
                          {isCopied ? t('copied') : t('copy')}
                        </span>
                      </button>
                    )}
                  </div>
                </li>
              );
            })}
          </ul>
        </div>

        <div className={`${revealStyles.revealChild} ${revealStyles.delay8}`}>
          <ContactForm />
        </div>
      </div>

      <footer className={styles.footer}>
        <p className={styles.footerText}>{t('contact.footer')}</p>
      </footer>
    </section>
  );
}