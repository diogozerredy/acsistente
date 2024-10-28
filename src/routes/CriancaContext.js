import React, { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const CriancaContext = createContext();

export function CriancaProvider({ children }) {
  const [criancas, setCriancas] = useState([]);

  const carregarCriancas = async () => {
    try {
      const criancasSalvas = await AsyncStorage.getItem("criancas");
      if (criancasSalvas) {
        setCriancas(JSON.parse(criancasSalvas));
      }
    } catch (error) {
      console.error("Erro ao carregar as crianças:", error);
    }
  };

  useEffect(() => {
    carregarCriancas();
  }, []);

  const adicionarCrianca = async (novaCrianca) => {
    const novasCriancas = [...criancas, novaCrianca];
    setCriancas(novasCriancas);
    await AsyncStorage.setItem("criancas", JSON.stringify(novasCriancas));
  };

  const removerCrianca = async (id) => {
    const novasCriancas = criancas.filter((crianca) => crianca.id !== id);
    setCriancas(novasCriancas);
    await AsyncStorage.setItem("criancas", JSON.stringify(novasCriancas));
  };

  const editarCrianca = async (id, dadosAtualizados) => {
    const novasCriancas = criancas.map((crianca) =>
      crianca.id === id ? { ...crianca, ...dadosAtualizados } : crianca
    );
    setCriancas(novasCriancas);
    await AsyncStorage.setItem("criancas", JSON.stringify(novasCriancas));
  };

  const atualizarCrianca = async (criancaAtualizada) => {
    const novasCriancas = criancas.map((crianca) =>
      crianca.id === criancaAtualizada.id ? criancaAtualizada : crianca
    );
    setCriancas(novasCriancas);
    await AsyncStorage.setItem("criancas", JSON.stringify(novasCriancas));
  };

  return (
    <CriancaContext.Provider
      value={{
        criancas,
        setCriancas,
        adicionarCrianca,
        removerCrianca,
        editarCrianca,
        atualizarCrianca,
      }}
    >
      {children}
    </CriancaContext.Provider>
  );
}
