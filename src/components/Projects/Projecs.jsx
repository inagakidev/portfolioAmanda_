import { useTranslation } from 'react-i18next';
import styles from './Projects.module.css';
import useScrollReveal from '../../hooks/useScrollReveal';
import revealStyles from '../../styles/reveal.module.css';
import canilMrBeaglesImg from '../../assets/canil-mr-beagles.png';

const PROJECTS = [
  {
    id: 'portfolio',
    category: 'Frontend',
    badge: 'UI',
    icon: 'rocket',
    image: canilMrBeaglesImg,
    title: 'Canil Mr. Beagles — Site Institucional para Criador de Cães',
    year: '2026',
    description: 'Desenvolvimento completo do site para um canil especializado em Beagles e Fox Terriers, unindo identidade visual acolhedora com estrutura funcional. O site apresenta as raças, o plantel de matrizes e padreadores, depoimentos reais de tutores e um fluxo de conversão pensado para gerar contato via WhatsApp, tudo com SEO otimizado para buscas locais.',
    stack: ['HTML', 'CSS', 'JavaScript'],
    liveHref: 'https://canilmrbeagle.com.br',
  },
];

function ProjectIcon({ icon }) {
  const common = { width: 18, height: 18, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 1.8 };
  if (icon === 'rocket') {
    return (
      <svg {...common}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 15c3.5-1 6-4.5 6-9 0 0-4.5-.5-8 3-2 2-3 4.5-3 7 0 0 2.5-.2 5-1Z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 15c-2 .5-3 2-3.5 4.5C8 19 9.5 18 10 16" />
        <circle cx="14.5" cy="9.5" r="1.4" />
      </svg>
    );
  }
  if (icon === 'shop') {
    return (
      <svg {...common}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 8.5 6.2 4h11.6l1.2 4.5" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 8.5h15V19a1 1 0 0 1-1 1h-13a1 1 0 0 1-1-1V8.5Z" />
        <path strokeLinecap="round" d="M9 12a3 3 0 0 0 6 0" />
      </svg>
    );
  }
  if (icon === 'chart') {
    return (
      <svg {...common}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 20V10M10 20V4M16 20v-7M22 20H2" />
      </svg>
    );
  }
  return (
    <svg {...common}>
      <path strokeLinecap="round" strokeLinejoin="round" d="m12 3 8 4.5-8 4.5-8-4.5L12 3Z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="m4 12 8 4.5 8-4.5M4 16.5 12 21l8-4.5" />
    </svg>
  );
}

function ArrowUpRight() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M7 17 17 7M9 7h8v8" />
    </svg>
  );
}

function CodeIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48v-1.7c-2.78.6-3.37-1.34-3.37-1.34-.46-1.16-1.11-1.47-1.11-1.47-.9-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.9 1.53 2.36 1.09 2.94.83.09-.65.35-1.09.63-1.34-2.22-.25-4.56-1.11-4.56-4.95 0-1.09.39-1.99 1.03-2.69-.1-.25-.45-1.27.1-2.65 0 0 .84-.27 2.75 1.03a9.53 9.53 0 0 1 5 0c1.9-1.3 2.75-1.03 2.75-1.03.55 1.38.2 2.4.1 2.65.64.7 1.03 1.6 1.03 2.69 0 3.85-2.34 4.7-4.57 4.94.36.31.68.92.68 1.85v2.74c0 .27.18.58.69.48A10 10 0 0 0 12 2Z" />
    </svg>
  );
}

export default function Projects() {
  const { t } = useTranslation();
  const [containerRef, isVisible] = useScrollReveal({ once: true });

  return (
    <section
      id="projetos"
      ref={containerRef}
      className={`${styles.projetos} ${isVisible ? revealStyles.revealActive : revealStyles.reveal}`}
    >
      <div className={`${styles.eyebrow} ${revealStyles.revealChild} ${revealStyles.delay1}`}>
        <span className={styles.eyebrowIndex}>02</span>
        <span className={styles.eyebrowLine} aria-hidden="true" />
        <span className={styles.eyebrowLabel}>Projetos selecionados</span>
      </div>

      <div className={`${styles.headingRow} ${revealStyles.revealChild} ${revealStyles.delay2}`}>
        <h2 className={`${styles.heading} ${revealStyles.revealChild} ${revealStyles.delay3}`}>
          <span className={styles.headingPrimary}>Cases construídos com</span>
          <span className={styles.headingMuted}>precisão e propósito.</span>
        </h2>
        <span className={`${styles.count} ${revealStyles.revealChild} ${revealStyles.delay4}`}>· {PROJECTS.length} projetos</span>
      </div>

      <div className={`${styles.grid} ${revealStyles.revealChild} ${revealStyles.delay5}`}>
        {PROJECTS.map((project, index) => (
          <article
            key={project.id}
            className={`${styles.card} ${revealStyles.revealChild} ${revealStyles['delay' + ((index % 4) + 3)]}`}
          >
            <div className={styles.thumb}>
              <span className={styles.thumbTag}>{project.category}</span>
              <span className={styles.thumbBadge}>{project.badge}</span>
              {project.image ? (
                <img
                  src={project.image}
                  alt={project.title}
                  className={styles.thumbImage}
                  loading="lazy"
                />
              ) : (
                <span className={styles.thumbIcon} aria-hidden="true">
                  <ProjectIcon icon={project.icon} />
                </span>
              )}
            </div>

            <div className={styles.body}>
              <div className={styles.titleRow}>
                <h3 className={styles.title}>{project.title}</h3>
                <span className={styles.year}>{project.year}</span>
              </div>

              <p className={styles.description}>{project.description}</p>

              <ul className={styles.stack}>
                {project.stack.map((tech) => (
                  <li key={tech} className={styles.stackItem}>
                    {tech}
                  </li>
                ))}
              </ul>

              <div className={styles.actions}>
                <a
                  href={project.liveHref}
                  className={styles.primaryLink}
                  target="_blank"
                  rel="noreferrer noopener"
                  aria-label={`${t('projects.actions.viewProject')} ${project.title}`}
                >
                  {t('projects.actions.viewProject')}
                  <ArrowUpRight />
                </a>
                {project.codeHref && (
                  <a
                    href={project.codeHref}
                    className={styles.secondaryLink}
                    target="_blank"
                    rel="noreferrer noopener"
                    aria-label={`${t('projects.actions.viewCode')} ${project.title}`}
                  >
                    <CodeIcon />
                    {t('projects.actions.viewCode')}
                  </a>
                )}
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}