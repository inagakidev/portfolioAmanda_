import { useTranslation } from 'react-i18next';
import styles from './LanguageSwitcher.module.css';

export default function LanguageSwitcher() {
  const { i18n, t } = useTranslation();
  const currentLanguage = i18n.resolvedLanguage?.startsWith('en') ? 'en' : 'pt';

  const handleChange = (language) => {
    i18n.changeLanguage(language);
  };

  return (
    <div className={styles.switcher} role="group" aria-label={t('languageSwitcher.label')}>
      <button
        type="button"
        className={`${styles.option} ${currentLanguage === 'pt' ? styles.active : ''}`}
        onClick={() => handleChange('pt')}
        aria-pressed={currentLanguage === 'pt'}
      >
        PT
      </button>
      <button
        type="button"
        className={`${styles.option} ${currentLanguage === 'en' ? styles.active : ''}`}
        onClick={() => handleChange('en')}
        aria-pressed={currentLanguage === 'en'}
      >
        EN
      </button>
    </div>
  );
}
