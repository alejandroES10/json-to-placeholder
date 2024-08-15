"use client";

import React, { useState } from 'react';
import { fillDictionary, replacePlaceholders } from '@/utils/functions'; // Importa todas las funciones necesarias
import styles from './Form.module.css'; // Importa el archivo CSS

interface FormProps {
    placeholderList: string[];
    diccionaryToFill: Map<string, any>;
}

export function Form({ placeholderList, diccionaryToFill }: FormProps) {
  const [formData, setFormData] = useState<{ [key: string]: string }>({});
  const [replacedText, setReplacedText] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, key: string) => {
    setFormData({
      ...formData,
      [key]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fillDictionary(diccionaryToFill, formData);
    console.log(formData); 
    console.log("********");
    console.log(diccionaryToFill);

    // Reemplaza los placeholders y actualiza el estado
    const filledText = replacePlaceholders(
      "Hello my name is _name_, I have _age_ years old and I live in _city_", 
      diccionaryToFill
    );
    setReplacedText(filledText);
  };

  return (
    <>
      <form onSubmit={handleSubmit} className={styles.formContainer}>
        {placeholderList.map((placeholder, index) => (
          <div key={index} className={styles.formGroup}>
            <label className={styles.label}>
              {placeholder}:
              <input
                type="text"
                value={formData[placeholder] || ''}
                onChange={(e) => handleChange(e, placeholder)}
                placeholder={placeholder}
                required={true}
                className={styles.input}
              />
            </label>
          </div>
        ))}
        <button type="submit" className={styles.button}>Submit</button>
      </form>

      {replacedText && (
        <p className={styles.replacedText}>{replacedText}</p>
      )}
    </>
  );
}
