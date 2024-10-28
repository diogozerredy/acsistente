import React, { useState, useEffect } from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

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

  return (
    <ScrollView>
      {vacinas.length > 0 ? (
        vacinas.map((vacina, index) => (
          <View key={index}>
            <TouchableOpacity
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
          </View>
        ))
      ) : (
        <Text>Nenhuma vacina adicionada</Text>
      )}
    </ScrollView>
  );
}
