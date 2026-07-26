import { useEffect, useMemo, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FiHome, FiUser, FiFolder, FiBriefcase, FiSettings, FiMail } from 'react-icons/fi';
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

const NAV_ICONS = {
  home: FiHome,
  about: FiUser,
  projects: FiFolder,
  experiences: FiBriefcase,
  process: FiSettings,
  contact: FiMail,
};

const SECTION_IDS = ['inicio', 'sobre', 'projetos', 'experiencias', 'processo', 'contato'];

const MOBILE_BREAKPOINT = 900;

export default function Header() {
  const { isDark, toggleTheme } = useTheme();
  const { t } = useTranslation();
  const [containerRef, isVisible] = useScrollReveal({ once: true });
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('inicio');
  const [isScrolled, setIsScrolled] = useState(false);

  const menuToggleRef = useRef(null);
  const firstNavLinkRef = useRef(null);
  const didMountRef = useRef(false);

  const navItems = useMemo(
    () =>
      NAV_ITEMS.map((item, index) => ({
        ...item,
        label: t(item.labelKey),
      })),
    [t]
  );

  const toggleMenu = () => setMenuOpen((current) => !current);
  const closeMenu = () => setMenuOpen(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 8);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const sections = SECTION_IDS.map((id) => document.getElementById(id)).filter(Boolean);
    if (sections.length === 0) return undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (visible.length > 0) {
          setActiveSection(visible[0].target.id);
        }
      },
      { rootMargin: '-35% 0px -55% 0px', threshold: [0, 0.25, 0.5, 0.75, 1] }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!menuOpen) return undefined;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') closeMenu();
    };
    const handleResize = () => {
      if (window.innerWidth > MOBILE_BREAKPOINT) closeMenu();
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('resize', handleResize);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('resize', handleResize);
    };
  }, [menuOpen]);

  useEffect(() => {
    if (!didMountRef.current) {
      didMountRef.current = true;
      return;
    }
    if (menuOpen) {
      firstNavLinkRef.current?.focus();
    } else {
      menuToggleRef.current?.focus();
    }
  }, [menuOpen]);

  return (
    <header
      ref={containerRef}
      className={`${styles.header} ${isScrolled ? styles.headerScrolled : ''} ${
        isVisible ? revealStyles.revealActive : revealStyles.reveal
      }`}
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
        ref={menuToggleRef}
        type="button"
        className={`${styles.menuToggle} ${menuOpen ? styles.menuToggleOpen : ''} ${
          revealStyles.revealChild
        } ${revealStyles.delay2}`}
        aria-label={menuOpen ? t('header.closeMenu') : t('header.openMenu')}
        aria-expanded={menuOpen}
        aria-controls="primary-navigation"
        onClick={toggleMenu}
      >
        <span aria-hidden="true" />
        <span aria-hidden="true" />
        <span aria-hidden="true" />
      </button>

      {menuOpen && (
        <div className={styles.overlay} onClick={closeMenu} aria-hidden="true" />
      )}

      <nav
        id="primary-navigation"
        className={`${styles.nav} ${menuOpen ? styles.navOpen : ''} ${revealStyles.revealChild} ${revealStyles.delay3}`}
        aria-label={t('header.navAria')}
      >
        <ul className={styles.navList}>
          {navItems.map((item, itemIndex) => {
            const Icon = NAV_ICONS[item.id];
            return (
              <li key={item.id}>
                <a
                  ref={itemIndex === 0 ? firstNavLinkRef : undefined}
                  href={item.href}
                  onClick={closeMenu}
                  aria-label={item.label}
                  className={`${styles.navItem} ${activeSection === item.href.slice(1) ? styles.navItemActive : ''}`}
                  aria-current={activeSection === item.href.slice(1) ? 'page' : undefined}
                >
                  {Icon && <Icon className={styles.navIcon} aria-hidden="true" />}
                  <span className={styles.navLabel}>{item.label}</span>
                </a>
              </li>
            );
          })}
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
          aria-pressed={isDark}
        >
          {isDark ? (
            <svg
              viewBox="0 0 24 24"
              width="15"
              height="15"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              aria-hidden="true"
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
              aria-hidden="true"
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