import React, { createContext, useState } from "react";

export const CriancaContext = createContext();

export function CriancaProvider({ children }) {
  const [criancas, setCriancas] = useState([]);

  const adicionarCrianca = (novaCrianca) => {
    setCriancas((prevCriancas) => [...prevCriancas, novaCrianca]);
  };

  const removerCrianca = (id) => {
    setCriancas((prevCriancas) =>
      prevCriancas.filter((crianca) => crianca.id !== id)
    );
  };

  return (
    <CriancaContext.Provider
      value={{ criancas, adicionarCrianca, removerCrianca }}
    >
      {children}
    </CriancaContext.Provider>
  );
}
