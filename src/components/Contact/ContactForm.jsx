import { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { useContactForm } from "./useContactForm";
import revealStyles from "../../styles/reveal.module.css";
import styles from "./ContactForm.module.css";
import { FiSend } from "react-icons/fi";

function SendIcon() {
  return <FiSend />;
}

export default function ContactForm({ onSubmit }) {
  const { t } = useTranslation();
  const {
    values,
    errors,
    touched,
    status,
    handleChange,
    handleBlur,
    handleSubmit,
    resetStatus,
  } = useContactForm({ onSubmit });

  const liveRegionRef = useRef(null);

  useEffect(() => {
    if (status !== "success") return undefined;
    const timeout = setTimeout(resetStatus, 5000);
    return () => clearTimeout(timeout);
  }, [status, resetStatus]);

  const isSubmitting = status === "submitting";
  const isSuccess = status === "success";

  return (
    <div
      className={`${styles.panel} ${revealStyles.revealChild} ${revealStyles.delay1}`}
    >
      <p
        className={`${styles.eyebrow} ${revealStyles.revealChild} ${revealStyles.delay2}`}
      >
        <span className={styles.eyebrowDot} aria-hidden="true" />
        {t("form.eyebrow")}
      </p>

      <form className={styles.form} onSubmit={handleSubmit} noValidate>
        <div className={styles.field}>
          <label htmlFor="contato-nome" className={styles.label}>
           {t("form.name.label")}
          </label>
          <input
            id="contato-nome"
            name="nome"
            type="text"
            autoComplete="name"
            placeholder={t("form.name.placeholder")}
            value={values.nome}
            onChange={handleChange}
            onBlur={handleBlur}
            className={styles.input}
            aria-invalid={Boolean(touched.nome && errors.nome)}
            aria-describedby={
              touched.nome && errors.nome ? "contato-nome-error" : undefined
            }
            disabled={isSubmitting}
          />
          {touched.nome && errors.nome && (
            <p id="contato-nome-error" className={styles.error} role="alert">
              {errors.nome}
            </p>
          )}
        </div>

        <div className={styles.field}>
          <label htmlFor="contato-email" className={styles.label}>
            {t("form.email.label")}
          </label>
          <input
            id="contato-email"
            name="email"
            type="email"
            autoComplete="email"
            placeholder={t("form.email.placeholder")}
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
            className={styles.input}
            aria-invalid={Boolean(touched.email && errors.email)}
            aria-describedby={
              touched.email && errors.email ? "contato-email-error" : undefined
            }
            disabled={isSubmitting}
          />
          {touched.email && errors.email && (
            <p id="contato-email-error" className={styles.error} role="alert">
              {errors.email}
            </p>
          )}
        </div>

        <div className={styles.field}>
          <label htmlFor="contato-mensagem" className={styles.label}>
            {t("form.message.label")}
          </label>
          <textarea
            id="contato-mensagem"
            name="mensagem"
            rows={4}
            placeholder={t("form.message.placeholder")}
            value={values.mensagem}
            onChange={handleChange}
            onBlur={handleBlur}
            className={styles.textarea}
            aria-invalid={Boolean(touched.mensagem && errors.mensagem)}
            aria-describedby={
              touched.mensagem && errors.mensagem
                ? "contato-mensagem-error"
                : undefined
            }
            disabled={isSubmitting}
          />
          {touched.mensagem && errors.mensagem && (
            <p
              id="contato-mensagem-error"
              className={styles.error}
              role="alert"
            >
              {errors.mensagem}
            </p>
          )}
        </div>

        <div className={styles.honeypot} aria-hidden="true">
          <label htmlFor="contato-empresa">{t("form.company")}</label>
          <input
            id="contato-empresa"
            name="empresa"
            type="text"
            tabIndex={-1}
            autoComplete="off"
            value={values.empresa}
            onChange={handleChange}
          />
        </div>

        <button type="submit" className={styles.submit} disabled={isSubmitting}>
          {isSubmitting ? t("form.submitting") : t("form.submit")}
          {!isSubmitting && <FiSend />}
        </button>

        <p className={styles.hint} ref={liveRegionRef} aria-live="polite">
          {isSuccess ? (
            <span className={styles.success}>{t("form.success")}</span>
          ) : status === "error" ? (
            <span className={styles.errorHint}>{t("form.error")}</span>
          ) : (
            <>
              {t("form.hint")}
            </>
          )}
        </p>
      </form>
    </div>
  );
}
