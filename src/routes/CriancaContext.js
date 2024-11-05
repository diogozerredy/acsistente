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

  const adicionarPeso = async (id, novoPeso) => {
    const criancaAtualizada = criancas.map((crianca) => {
      if (crianca.id === id) {
        const idadeAtual = calcularIdade(crianca.dataNascimento, novoPeso.data);
        const pesoComIdade = { ...novoPeso, idade: idadeAtual };
        return { ...crianca, pesos: [...(crianca.pesos || []), pesoComIdade] };
      }
      return crianca;
    });
    setCriancas(criancaAtualizada);
    await AsyncStorage.setItem("criancas", JSON.stringify(criancaAtualizada));
  };

  const atualizarPeso = async (idCrianca, indicePeso, novoPeso) => {
    const criancaAtualizada = criancas.map((crianca) => {
      if (crianca.id === idCrianca) {
        const pesosAtualizados = crianca.pesos.map((peso, index) =>
          index === indicePeso ? { ...peso, ...novoPeso } : peso
        );
        return { ...crianca, pesos: pesosAtualizados };
      }
      return crianca;
    });

    setCriancas(criancaAtualizada);
    await AsyncStorage.setItem("criancas", JSON.stringify(criancaAtualizada));
  };

  const excluirPeso = async (idCrianca, indicePeso) => {
    console.log("ID da Criança:", idCrianca);
    console.log("Índice do Peso a ser excluído:", indicePeso);

    const criancaAtualizada = criancas.map((crianca) => {
      if (crianca.id === idCrianca) {
        const pesosAtualizados = crianca.pesos.filter(
          (_, index) => index !== indicePeso
        );
        console.log("Pesos antes da exclusão:", crianca.pesos);
        console.log("Pesos após a exclusão:", pesosAtualizados);
        return { ...crianca, pesos: pesosAtualizados };
      }
      return crianca;
    });

    setCriancas(criancaAtualizada);
    await AsyncStorage.setItem("criancas", JSON.stringify(criancaAtualizada));

    const criancasSalvas = await AsyncStorage.getItem("criancas");
    console.log("Crianças após exclusão:", JSON.parse(criancasSalvas));
  };

  function calcularIdade(dataNascimento, dataPeso) {
    const nascimento = new Date(dataNascimento);
    const data = new Date(dataPeso);
    let anos = data.getFullYear() - nascimento.getFullYear();
    let meses = data.getMonth() - nascimento.getMonth();
    let dias = data.getDate() - nascimento.getDate();

    if (meses < 0 || (meses === 0 && dias < 0)) {
      anos--;
      meses += 12;
    }
    if (dias < 0) {
      meses--;
      dias += new Date(data.getFullYear(), data.getMonth(), 0).getDate();
    }

    return { anos, meses, dias };
  }

  return (
    <CriancaContext.Provider
      value={{
        criancas,
        setCriancas,
        adicionarCrianca,
        removerCrianca,
        editarCrianca,
        atualizarCrianca,
        adicionarPeso,
        atualizarPeso,
        excluirPeso,
      }}
    >
      {children}
    </CriancaContext.Provider>
  );
}
