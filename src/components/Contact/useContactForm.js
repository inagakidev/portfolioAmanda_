import { useCallback, useState } from 'react';
import i18n from '../../i18n';

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const INITIAL_VALUES = { nome: '', email: '', mensagem: '', empresa: '' };

function validateField(name, value) {
  switch (name) {
    case 'nome':
      if (!value.trim()) return i18n.t('form.validation.nameRequired');
      if (value.trim().length < 2) return i18n.t('form.validation.nameShort');
      return '';
    case 'email':
      if (!value.trim()) return i18n.t('form.validation.emailRequired');
      if (!EMAIL_PATTERN.test(value.trim())) return i18n.t('form.validation.emailInvalid');
      return '';
    case 'mensagem':
      if (!value.trim()) return i18n.t('form.validation.messageRequired');
      if (value.trim().length < 10) return i18n.t('form.validation.messageShort');
      return '';
    default:
      return '';
  }
}

export function useContactForm({ onSubmit } = {}) {
  const [values, setValues] = useState(INITIAL_VALUES);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [status, setStatus] = useState('idle');

  const handleChange = useCallback(
    (event) => {
      const { name, value } = event.target;
      setValues((prev) => ({ ...prev, [name]: value }));
      if (touched[name]) {
        setErrors((prev) => ({ ...prev, [name]: validateField(name, value) }));
      }
    },
    [touched]
  );

  const handleBlur = useCallback((event) => {
    const { name, value } = event.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    setErrors((prev) => ({ ...prev, [name]: validateField(name, value) }));
  }, []);

  const validateAll = useCallback(() => {
    const nextErrors = {
      nome: validateField('nome', values.nome),
      email: validateField('email', values.email),
      mensagem: validateField('mensagem', values.mensagem),
    };
    setErrors(nextErrors);
    setTouched({ nome: true, email: true, mensagem: true });
    return Object.values(nextErrors).every((error) => !error);
  }, [values]);

  const handleSubmit = useCallback(
    async (event) => {
      event.preventDefault();

      if (values.empresa) {
        setStatus('success');
        return;
      }

      const isValid = validateAll();
      if (!isValid) return;

      setStatus('submitting');
      try {
        if (onSubmit) {
          await onSubmit({ nome: values.nome, email: values.email, mensagem: values.mensagem });
        } else {
          await new Promise((resolve) => setTimeout(resolve, 900));
        }
        setStatus('success');
        setValues(INITIAL_VALUES);
        setTouched({});
        setErrors({});
      } catch (err) {
        console.error('Falha ao enviar contato:', err);
        setStatus('error');
      }
    },
    [onSubmit, validateAll, values]
  );

  const resetStatus = useCallback(() => setStatus('idle'), []);

  return { values, errors, touched, status, handleChange, handleBlur, handleSubmit, resetStatus };
}