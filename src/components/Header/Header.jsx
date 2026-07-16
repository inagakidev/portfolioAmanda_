import { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../../context/ThemeContext';
import useScrollReveal from '../../hooks/useScrollReveal';
import LanguageSwitcher from '../LanguageSwitcher/LanguageSwitcher';
import revealStyles from '../../styles/reveal.module.css';
import styles from './Header.module.css';

const NAV_ITEMS = [
  { id: 'home', href: '#inicio', labelKey: 'nav.home' },
  { id: 'about', href: '#sobre', labelKey: 'nav.about' },
  { id: 'projects', href: '#projetos', labelKey: 'nav.projects' },
  { id: 'experiences', href: '#experiencias', labelKey: 'nav.experiences' },
  { id: 'process', href: '#processo', labelKey: 'nav.process' },
  { id: 'contact', href: '#contato', labelKey: 'nav.contact' },
];

const SECTION_IDS = ['inicio', 'sobre', 'projetos', 'experiencias', 'processo', 'contato'];

export default function Header() {
  const { isDark, toggleTheme } = useTheme();
  const { t } = useTranslation();
  const [containerRef, isVisible] = useScrollReveal({ once: true });
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('inicio');

  const navItems = useMemo(
    () =>
      NAV_ITEMS.map((item, index) => ({
        ...item,
        label: t(item.labelKey),
        index: `${String(index + 1).padStart(2, '0')}`,
      })),
    [t]
  );

  useEffect(() => {
    const sections = SECTION_IDS.map((id) => document.getElementById(id)).filter(Boolean);
    if (!sections.length) {
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntry = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visibleEntry) {
          setActiveSection(visibleEntry.target.id);
        }
      },
      {
        rootMargin: '-30% 0px -55% 0px',
        threshold: [0.2, 0.5, 0.75],
      }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  const toggleMenu = () => setMenuOpen((current) => !current);
  const closeMenu = () => setMenuOpen(false);

  return (
    <header
      ref={containerRef}
      className={`${styles.header} ${isVisible ? revealStyles.revealActive : revealStyles.reveal}`}
    >
      <a
        className={`${styles.logo} ${revealStyles.revealChild} ${revealStyles.delay1}`}
        href="#inicio"
        aria-label={t('header.logoAria')}
        onClick={closeMenu}
      >
        <span className={styles.logoText}>{t('header.logoText')}</span>
      </a>

      <button
        type="button"
        className={`${styles.menuToggle} ${revealStyles.revealChild} ${revealStyles.delay2}`}
        aria-label={menuOpen ? t('header.closeMenu') : t('header.openMenu')}
        aria-expanded={menuOpen}
        aria-controls="primary-navigation"
        onClick={toggleMenu}
      >
        <span aria-hidden="true" />
        <span aria-hidden="true" />
        <span aria-hidden="true" />
      </button>

      <nav
        id="primary-navigation"
        className={`${styles.nav} ${menuOpen ? styles.navOpen : ''} ${revealStyles.revealChild} ${revealStyles.delay3}`}
        aria-label={t('header.navAria')}
      >
        <ul className={styles.navList}>
          {navItems.map((item) => (
            <li key={item.id}>
              <a
                href={item.href}
                onClick={closeMenu}
                className={`${styles.navItem} ${activeSection === item.href.slice(1) ? styles.navItemActive : ''}`}
                aria-current={activeSection === item.href.slice(1) ? 'page' : undefined}
              >
                <span className={styles.navIndex}>{item.index}</span>
                <span className={styles.navLabel}>{item.label}</span>
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <div className={`${styles.actions} ${revealStyles.revealChild} ${revealStyles.delay4}`}>
        <LanguageSwitcher />
        <button
          type="button"
          onClick={toggleTheme}
          className={styles.themeToggle}
          aria-label={
            isDark
              ? t('header.themeToggleAriaDark')
              : t('header.themeToggleAriaLight')
          }
          aria-pressed={!isDark}
        >
          {isDark ? (
            <svg
              viewBox="0 0 24 24"
              width="15"
              height="15"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
            >
              <circle cx="12" cy="12" r="4" />
              <path
                strokeLinecap="round"
                d="M12 2v2M12 20v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M2 12h2M20 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4"
              />
            </svg>
          ) : (
            <svg
              viewBox="0 0 24 24"
              width="15"
              height="15"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8Z"
              />
            </svg>
          )}
        </button>
      </div>
    </header>
  );
}
