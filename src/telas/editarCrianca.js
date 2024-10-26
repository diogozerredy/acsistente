import React, { useState } from "react";
import { View, TextInput, Button, Text } from "react-native";

export default function EditarCriancaScreen({ route, navigation }) {
  const { crianca } = route.params;
  const [nomeCrianca, setNomeCrianca] = useState(crianca.nomeCrianca);
  const [dataNascimento, setDataNascimento] = useState(crianca.dataNascimento);

  const editarCrianca = () => {
    crianca.nomeCrianca = nomeCrianca;
    crianca.dataNascimento = dataNascimento;
    navigation.navigate("ListaCriancas");
  };

  return (
    <View>
      <TextInput
        placeholder="Nome da Criança"
        value={nomeCrianca}
        onChangeText={setNomeCrianca}
      />
      <TextInput
        placeholder="Data de Nascimento"
        value={dataNascimento}
        onChangeText={setDataNascimento}
      />
      <Button title="Salvar" onPress={editarCrianca} />
    </View>
  );
}
