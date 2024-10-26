import React from "react";
import { View, Text, ScrollView } from "react-native";

export default function VerVacinas({ route }) {
  const { crianca } = route.params;

  return (
    <ScrollView>
      {crianca.vacinas.length > 0 ? (
        crianca.vacinas.map((vacina, index) => (
          <View key={index}>
            <Text>Data: {vacina.data}</Text>
            <Text>Local: {vacina.local}</Text>
            <Text>Lote: {vacina.lote}</Text>
            <Text>Técnico: {vacina.tecnico}</Text>
          </View>
        ))
      ) : (
        <Text>Nenhuma vacina adicionada</Text>
      )}
    </ScrollView>
  );
}
