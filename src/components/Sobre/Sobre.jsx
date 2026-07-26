import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import styles from "./Sobre.module.css";
import useScrollReveal from "../../hooks/useScrollReveal";
import revealStyles from "../../styles/reveal.module.css";
import amandaPerfil from "../../assets/amandaPerfil.png";

import { FaMapMarkerAlt, FaGraduationCap, FaBriefcase, FaWhatsapp, FaLinkedin, FaFileDownload, FaUsers, FaComments, FaLightbulb, FaLayerGroup } from "react-icons/fa";




const META_ICONS = {
  pin: FaMapMarkerAlt,
  school: FaGraduationCap,
  briefcase: FaBriefcase,
};

const TRAIT_ICONS = {
  users: FaUsers,
  message: FaComments,
  bulb: FaLightbulb,
  layout: FaLayerGroup,
};

function MetaIcon({ icon }) {
  const Icon = META_ICONS[icon] || FaBriefcase;
  return <Icon size={14} />;
}

function TraitIcon({ icon }) {
  const Icon = TRAIT_ICONS[icon] || FaLayerGroup;
  return <Icon size={18} />;
}

export default function About() {
  const { t } = useTranslation();

  const TRAITS = [
    {
      title: t("about.traits.collaboration.title"),
      description: t("about.traits.collaboration.description"),
      icon: "users",
    },
    {
      title: t("about.traits.communication.title"),
      description: t("about.traits.communication.description"),
      icon: "message",
    },
    {
      title: t("about.traits.innovation.title"),
      description: t("about.traits.innovation.description"),
      icon: "bulb",
    },
    {
      title: t("about.traits.organization.title"),
      description: t("about.traits.organization.description"),
      icon: "layout",
    },
  ];

  const [containerRef, isVisible] = useScrollReveal({ once: true });

  const portraitRef = useRef(null);
  const [ringsActive, setRingsActive] = useState(true);

  useEffect(() => {
    const node = portraitRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => setRingsActive(entry.isIntersecting),
      { threshold: 0.1 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="sobre"
      ref={containerRef}
      className={`${styles.sobre} ${isVisible ? revealStyles.revealActive : revealStyles.reveal}`}
    >
      <div
        className={`${styles.eyebrow} ${revealStyles.revealChild} ${revealStyles.delay1}`}
      >
        <span className={styles.eyebrowIndex}>01</span>
        <span className={styles.eyebrowLine} aria-hidden="true" />
        <span className={styles.eyebrowLabel}>{t("about.eyebrow")}</span>
      </div>

      <div className={styles.content}>
        <div
          className={`${styles.portraitWrap} ${revealStyles.revealChild} ${revealStyles.delay2}`}
        >
          <div
            ref={portraitRef}
            className={styles.portrait}
            style={{ "--anim-state": ringsActive ? "running" : "paused" }}
          >
            <span className={styles.ring} style={{ "--size": "100%" }} />
            <span className={styles.ring} style={{ "--size": "112%" }} />

            <span className={styles.ringSweep} style={{ "--size": "100%" }} />
            <span
              className={`${styles.ringSweep} ${styles.inner}`}
              style={{ "--size": "112%" }}
            />

            <span
              className={styles.satelliteOrbit}
              style={{ "--size": "112%" }}
            >
              <span className={styles.satellite} />
            </span>

            <div className={styles.portraitInner}>
              <img
                src={amandaPerfil}
                alt="Foto de Amanda Inagaki"
                loading="lazy"
                decoding="async"
              />
            </div>
            <span className={styles.tag}>{t("about.age")}</span>
          </div>
          <div className={styles.socialLinks}>
            <a
              href="/src/assets/cv-amanda-inagaki.pdf"
              download
              className={styles.iconButton}
              aria-label="Baixar currículo"
            >
              <FaFileDownload size={18} />
            </a>
            <a
              href="https://www.linkedin.com/in/amanda-inagaki"
              target="blank"
              rel="noopener noreferrer"
              className={styles.iconButton}
              aria-label="LinkedIn"
            >
              <FaLinkedin size={18} />
            </a>
            <a
              href="https://wa.me/5512997936774"
              target="blank"
              rel="noopener noreferrer"
              className={styles.iconButton}
              aria-label="WhatsApp"
            >
              <FaWhatsapp size={18} />
            </a>
          </div>
        </div>

        <div
          className={`${styles.info} ${revealStyles.revealChild} ${revealStyles.delay3}`}
        >
          <h2
            className={`${styles.name} ${revealStyles.revealChild} ${revealStyles.delay4}`}
          >
            Amanda Inagaki
          </h2>

          <div
            className={`${styles.summary} ${revealStyles.revealChild} ${revealStyles.delay7}`}
          >
            <p
              className={`${styles.summaryLabel} ${revealStyles.revealChild} ${revealStyles.delay7}`}
            >
              {t("about.summaryLabel")}
            </p>
            <p
              className={`${styles.summaryText} ${revealStyles.revealChild} ${revealStyles.delay8}`}
            >
              {t("about.summaryText")}
            </p>
          </div>

          <div
            className={`${styles.traits} ${revealStyles.revealChild} ${revealStyles.delay8}`}
          >
            {TRAITS.map((trait, index) => (
              <article
                key={trait.title}
                className={`${styles.traitCard} ${revealStyles.revealChild} ${revealStyles["delay" + (index + 2)]}`}
              >
                <span className={styles.traitIcon} aria-hidden="true">
                  <TraitIcon icon={trait.icon} />
                </span>
                <h3 className={styles.traitTitle}>{trait.title}</h3>
                <p className={styles.traitDescription}>{trait.description}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
