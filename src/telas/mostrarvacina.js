import React, { useState, useEffect } from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SafeAreaView } from "react-native-safe-area-context";
import style from "../../style/style";

export default function VerVacinas({ route, navigation }) {
  const { crianca } = route.params;
  const [vacinas, setVacinas] = useState([]);

  useEffect(() => {
    const carregarVacinas = async () => {
      try {
        const vacinasSalvas = await AsyncStorage.getItem(
          `vacinas_${crianca.id}`
        );
        if (vacinasSalvas) {
          console.log("Vacinas carregadas do AsyncStorage:"),
            setVacinas(JSON.parse(vacinasSalvas));
        } else {
          console.log(
            "Nenhuma vacina encontrada no AsyncStorage. Usando vacinas padrão."
          ),
            setVacinas(crianca.vacinas);
        }
      } catch (error) {
        console.error("Erro ao carregar vacinas:", error);
      }
    };
    carregarVacinas();
  }, []);

  const atualizarVacina = async (doseAtualizada) => {
    const novasVacinas = vacinas.map((vacina) =>
      vacina.nome === doseAtualizada.nome ? doseAtualizada : vacina
    );

    setVacinas(novasVacinas);

    try {
      await AsyncStorage.setItem(
        `vacinas_${crianca.id}`,
        JSON.stringify(novasVacinas)
      );
    } catch (error) {
      console.error("Erro ao salvar vacinas atualizadas:", error);
    }
  };

  useEffect(() => {
    if (route.params?.doseAtualizada) {
      atualizarVacina(route.params.doseAtualizada);
    }
  }, [route.params?.doseAtualizada]);

  const agruparVacinasPorIdadeEDose = (vacinas) => {
    const grupos = {};

    vacinas.forEach((vacina) => {
      const chave = `${vacina.idade} - ${vacina.dose}`;
      if (!grupos[chave]) {
        grupos[chave] = [];
      }
      grupos[chave].push(vacina);
    });

    return grupos;
  };

  const formatarIdade = (idade) => {
    if (idade === "Ao Nascer") {
      return "Ao Nascer";
    } else if (idade >= 48) {
      return "4 Anos";
    } else if (idade >= 12) {
      const anos = Math.floor(idade / 12);
      const meses = idade % 12;
      return `${anos} Ano${anos > 1 ? "s" : ""} ${meses} Mês${
        meses > 1 ? "es" : ""
      }`;
    }
    return `${idade} meses`;
  };

  const gruposVacinas = agruparVacinasPorIdadeEDose(vacinas);

  return (
    <SafeAreaView style={style.container}>
      <ScrollView>
        {Object.keys(gruposVacinas).length > 0 ? (
          Object.keys(gruposVacinas).map((chave) => {
            const [idade, dose] = chave.split(" - ");
            const idadeFormatada = formatarIdade(
              idade === "Ao Nascer" ? idade : parseInt(idade, 10)
            );
            return (
              <View key={chave}>
                <Text
                  style={{ fontSize: 18, fontWeight: "bold", marginTop: 20 }}
                >
                  Vacina {idadeFormatada} - {dose}
                </Text>
                {gruposVacinas[chave].map((vacina, index) => (
                  <TouchableOpacity
                    key={index}
                    onPress={() => {
                      navigation.navigate("AdicionarVacina", {
                        vacina: vacina,
                      });
                    }}
                    style={{
                      justifyContent: "center",
                      alignContent: "center",
                      backgroundColor: "#ffffff",
                      width: "95%",
                      marginTop: 15,
                      marginHorizontal: "2%",
                      borderRadius: 5,
                    }}
                  >
                    <Text style={{ textAlign: "center" }}>{vacina.nome}</Text>
                    <Text>Data: {vacina.data}</Text>
                    <Text>Local: {vacina.local}</Text>
                    <Text>Lote: {vacina.lote}</Text>
                    <Text>Técnico: {vacina.tecnico}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            );
          })
        ) : (
          <Text>Nenhuma vacina adicionada</Text>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
