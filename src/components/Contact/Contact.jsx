import { useState } from "react";
import { useTranslation } from "react-i18next";
import ContactForm from "./ContactForm";
import { sendContactEmail } from "./apiClient";
import useScrollReveal from "../../hooks/useScrollReveal";
import revealStyles from "../../styles/reveal.module.css";
import styles from "./Contact.module.css";
import { FaGithub, FaLinkedinIn, FaRegCopy } from "react-icons/fa";
import { MdOutlineEmail, MdLocalPostOffice } from "react-icons/md";
import { FaLocationDot } from "react-icons/fa6";
import { FiExternalLink } from "react-icons/fi";

const CHANNEL_DATA = {
  email: {
    icon: "email",
    value: "inagakilanding@gmail.com",
    href: "mailto:inagakilanding@gmail.com",
    copyable: true,
  },
  location: {
    icon: "pin",
    href: null,
  },
  github: {
    icon: "github",
    href: "https://github.com/inagakidev",
  },
};

function ChannelIcon({ icon }) {
  const common = {
    width: 18,
    height: 18,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.8,
  };
  if (icon === "email") {
    return <MdOutlineEmail />;
  }
  if (icon === "pin") {
    return <FaLocationDot />;
  }
  if (icon === "github") {
    return <FaGithub />;
  }
}

function ExternalArrow() {
  return <FiExternalLink />;
}

function CopyIcon() {
  return <FaRegCopy />;
}

export default function Contato() {
  const { t } = useTranslation();
  const [containerRef, isVisible] = useScrollReveal({ once: true });
  const [copiedId, setCopiedId] = useState(null);

  const CHANNELS = [
    {
      id: "email",
      ...CHANNEL_DATA.email,
      label: t("contact.channels.email.label"),
    },
    {
      id: "location",
      ...CHANNEL_DATA.location,
      label: t("contact.channels.location.label"),
      value: t("contact.channels.location.value"),
    },
    {
      id: "github",
      ...CHANNEL_DATA.github,
      label: t("contact.channels.github.label"),
      value: t("contact.channels.github.value"),
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
      console.error("Failed to copy to clipboard", err);
    }
  };

  return (
    <section
      id="contato"
      ref={containerRef}
      className={`${styles.contato} ${isVisible ? revealStyles.revealActive : revealStyles.reveal}`}
    >
      <div
        className={`${styles.eyebrow} ${revealStyles.revealChild} ${revealStyles.delay1}`}
      >
        <span className={styles.eyebrowIndex}>07</span>
        <span className={styles.eyebrowLine} aria-hidden="true" />
        <span className={styles.eyebrowLabel}>{t("contact.eyebrow")}</span>
      </div>

      <div className={styles.grid}>
        <div
          className={`${styles.intro} ${revealStyles.revealChild} ${revealStyles.delay2}`}
        >
          <h2
            className={`${styles.heading} ${revealStyles.revealChild} ${revealStyles.delay3}`}
          >
            <span className={styles.headingPrimary}>
              {t("contact.headingPrimary")}
            </span>
            <span className={styles.headingAccent}>
              {t("contact.headingAccent")}
            </span>
          </h2>

          <p
            className={`${styles.description} ${revealStyles.revealChild} ${revealStyles.delay4}`}
          >
            {t("contact.description")}
          </p>

          <ul
            className={`${styles.channels} ${revealStyles.revealChild} ${revealStyles.delay5}`}
          >
            {CHANNELS.map((channel, index) => {
              const Wrapper = channel.href ? "a" : "div";
              const wrapperProps = channel.href
                ? {
                    href: channel.href,
                    target: channel.href.startsWith("http")
                      ? "_blank"
                      : undefined,
                    rel: channel.href.startsWith("http")
                      ? "noreferrer noopener"
                      : undefined,
                  }
                : {};
              const isCopied = copiedId === channel.id;

              return (
                <li key={channel.id}>
                  <div className={styles.channelRow}>
                    <Wrapper
                      className={`${styles.channel} ${revealStyles.revealChild} ${revealStyles["delay" + (6 + index)]}`}
                      {...wrapperProps}
                    >
                      <span className={styles.channelIcon} aria-hidden="true">
                        <ChannelIcon icon={channel.icon} />
                      </span>
                      <span className={styles.channelText}>
                        <span className={styles.channelLabel}>
                          {channel.label}
                        </span>
                        <span className={styles.channelValue}>
                          {channel.value}
                        </span>
                      </span>
                      {channel.href && !channel.copyable && (
                        <span
                          className={styles.channelArrow}
                          aria-hidden="true"
                        >
                          <ExternalArrow />
                        </span>
                      )}
                    </Wrapper>

                    {channel.copyable && (
                      <button
                        type="button"
                        className={`${styles.copyButton} ${isCopied ? styles.copyButtonActive : ""}`}
                        onClick={(event) => handleCopy(event, channel)}
                        aria-label={isCopied ? t("copied") : t("copy")}
                      >
                        {isCopied ? <CheckIcon /> : <CopyIcon />}
                        <span className={styles.copyTooltip}>
                          {isCopied ? t("copied") : t("copy")}
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
          <ContactForm onSubmit={sendContactEmail} />
        </div>
      </div>

      <footer className={styles.footer}>
        <p className={styles.footerText}>{t("contact.footer")}</p>
      </footer>
    </section>
  );
}
