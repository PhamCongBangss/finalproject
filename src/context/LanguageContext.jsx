import { createContext, useContext, useState } from "react";

const LanguageContext = createContext();
export function LanguageProvider({ children }) {
  const [lang, setLang] = useState("vi");
  function handleChangeLang(lang) {
    setLang(lang);
  }

  return (
    <LanguageContext.Provider value={{ lang, handleChangeLang }}>
      {children}
    </LanguageContext.Provider>
  );
}

export const useLang = () => useContext(LanguageContext);
