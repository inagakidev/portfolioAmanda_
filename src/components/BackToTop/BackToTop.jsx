import { useEffect, useState, useCallback } from "react";
import { createPortal } from "react-dom";
import { ArrowUp } from "lucide-react";
import styles from "./BackToTop.module.css";

// Depois de quantos pixels rolados o botão aparece
const SCROLL_THRESHOLD = 24;

export default function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const getScrollTop = () => {
      return (
        document.scrollingElement?.scrollTop ||
        window.pageYOffset ||
        window.scrollY ||
        document.documentElement.scrollTop ||
        document.body.scrollTop ||
        0
      );
    };

    const handleScroll = () => {
      setVisible(getScrollTop() > SCROLL_THRESHOLD);
    };

    handleScroll();

    const scrollingElement = document.scrollingElement;
    const htmlElement = document.documentElement;

    window.addEventListener("scroll", handleScroll, { passive: true });
    htmlElement.addEventListener("scroll", handleScroll, { passive: true });
    scrollingElement?.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("wheel", handleScroll, { passive: true });
    window.addEventListener("touchmove", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);

    const timer = window.setTimeout(handleScroll, 100);

    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("scroll", handleScroll);
      htmlElement.removeEventListener("scroll", handleScroll);
      scrollingElement?.removeEventListener("scroll", handleScroll);
      window.removeEventListener("wheel", handleScroll);
      window.removeEventListener("touchmove", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  const scrollToTop = useCallback(() => {
    const scrollOptions = { top: 0, behavior: "smooth" };

    window.scrollTo(scrollOptions);
    document.scrollingElement?.scrollTo(scrollOptions);
    document.documentElement.scrollTo(scrollOptions);
    document.body.scrollTo?.(scrollOptions);
  }, []);

  const button = (
    <button
      type="button"
      onClick={scrollToTop}
      className={`${styles.button} ${visible ? styles.visible : ""}`}
      aria-label="Voltar ao topo da página"
      tabIndex={visible ? 0 : -1}
    >
      <ArrowUp size={20} strokeWidth={2.2} />
    </button>
  );

  // Renderiza direto no <body>, fora da árvore de componentes,
  // pra nunca ficar preso atrás de um background com contain/transform.
  return createPortal(button, document.body);
}