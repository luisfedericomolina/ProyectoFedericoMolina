import { useState } from "react";

export default function useForm(initialValues = {}, validationRules = {}) {
  
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (name, value) => {
    setValues((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validate = () => {
    const newErrors = {};

    for (const key of Object.keys(validationRules)) {
      const rule = validationRules[key] || {};
      const v = values[key] ?? "";

      if (rule.required && !String(v).trim()) {
        newErrors[key] = rule.message || "Este campo es requerido";
        continue;
      }
      if (rule.minLength && String(v).length < rule.minLength) {
        newErrors[key] = rule.message || `Mínimo ${rule.minLength} caracteres`;
        continue;
      }
      if (rule.pattern && !rule.pattern.test(String(v))) {
        newErrors[key] = rule.message || "Formato inválido";
        continue;
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (onValid) => {
    setIsSubmitting(true);
    const ok = validate();
    if (ok && typeof onValid === "function") {
      await onValid(values);
    }
    setIsSubmitting(false);
  };

  return { values, errors, isSubmitting, handleChange, handleSubmit };
}
