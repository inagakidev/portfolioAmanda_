import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import styles from "./Sobre.module.css";
import useScrollReveal from "../../hooks/useScrollReveal";
import revealStyles from "../../styles/reveal.module.css";
import amandaPerfil from "../../assets/amandaPerfil.png";



function MetaIcon({ icon }) {
  const common = {
    width: 14,
    height: 14,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.8,
  };
  if (icon === "pin") {
    return (
      <svg {...common}>
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 21s7-6.5 7-11.5A7 7 0 0 0 5 9.5C5 14.5 12 21 12 21Z"
        />
        <circle cx="12" cy="9.5" r="2.3" />
      </svg>
    );
  }
  if (icon === "school") {
    return (
      <svg {...common}>
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M3 10.5 12 6l9 4.5-9 4.5-9-4.5Z"
        />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M7 12.5V17c0 1.1 2.24 2 5 2s5-.9 5-2v-4.5"
        />
      </svg>
    );
  }
  return (
    <svg {...common}>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M4 5.5A1.5 1.5 0 0 1 5.5 4H11a3 3 0 0 1 3 3v13a2.5 2.5 0 0 0-2.5-2.5H4V5.5Z"
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M20 5.5A1.5 1.5 0 0 0 18.5 4H13a3 3 0 0 0-3 3v13a2.5 2.5 0 0 1 2.5-2.5H20V5.5Z"
      />
    </svg>
  );
}

function TraitIcon({ icon }) {
  const common = {
    width: 18,
    height: 18,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.8,
  };
  if (icon === "users") {
    return (
      <svg {...common}>
        <circle cx="9" cy="8" r="3" />
        <path strokeLinecap="round" d="M3 20c0-3 2.7-5 6-5s6 2 6 5" />
        <path
          strokeLinecap="round"
          d="M16 4.5a3 3 0 0 1 0 5.9M20.5 20c0-2.6-2-4.4-4.5-4.9"
        />
      </svg>
    );
  }
  if (icon === "message") {
    return (
      <svg {...common}>
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M4 5.5h16v11H9.5L5 20v-3.5H4v-11Z"
        />
      </svg>
    );
  }
  if (icon === "bulb") {
    return (
      <svg {...common}>
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9 18h6M10 21h4M8 14a5 5 0 1 1 8 0c-.9 1-1.4 1.7-1.4 3H9.4c0-1.3-.5-2-1.4-3Z"
        />
      </svg>
    );
  }
  return (
    <svg {...common}>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="m2 9 10-4.5L22 9l-10 4.5L2 9Z"
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M6 11.5V16c0 1.4 2.7 2.5 6 2.5s6-1.1 6-2.5v-4.5"
      />
    </svg>
  );
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
            className={`${styles.statusPanel} ${revealStyles.revealChild} ${revealStyles.delay5}`}
          >
            <div className={styles.statusRow}>
              <span className={styles.statusKey}>
                {t("about.status.locationLabel")}
              </span>
              <span className={styles.statusValue}>
                {t("about.status.location")}
              </span>
            </div>
            <div className={styles.statusRow}>
              <span className={styles.statusKey}>
                {t("about.status.availabilityLabel")}
              </span>
              <span className={styles.statusValue}>
                <span className={styles.statusDot} aria-hidden="true" />
                {t("about.status.availability")}
              </span>
            </div>
            <div className={styles.statusRow}>
              <span className={styles.statusKey}>
                {t("about.status.stackLabel")}
              </span>
              <span className={styles.statusValue}>
                {t("about.status.stack")}
              </span>
            </div>
          </div>

          <div
            className={`${styles.summary} ${revealStyles.revealChild} ${revealStyles.delay7}`}
          >
            <p
              className={`${styles.summaryLabel} ${revealStyles.revealChild} ${revealStyles.delay7}`}
            >
              <span className={styles.summaryDot} aria-hidden="true" />
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