import React, { useState } from "react";
import { View, TextInput, Button, Text } from "react-native";

export default function AdicionarVacina({ route, navigation }) {
  const { crianca } = route.params;
  const [data, setData] = useState("");
  const [local, setLocal] = useState("");
  const [lote, setLote] = useState("");
  const [tecnico, setTecnico] = useState("");
  const [errors, setErrors] = useState({});

  const adicionarDose = () => {
    let newErrors = {};

    if (!data) newErrors.data = "Data é obrigatória";
    if (!local) newErrors.local = "Local é obrigatório";
    if (!lote) newErrors.lote = "Lote é obrigatório";
    if (!tecnico) newErrors.tecnico = "Técnico é obrigatório";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      const novaDose = { data, local, lote, tecnico };
      crianca.vacinas.push(novaDose);
      navigation.navigate("VerVacinas", { crianca });
    }
  };

  return (
    <View>
      <TextInput placeholder="Data" value={data} onChangeText={setData} />
      {errors.data && <Text>{errors.data}</Text>}
      <TextInput placeholder="Local" value={local} onChangeText={setLocal} />
      {errors.local && <Text>{errors.local}</Text>}
      <TextInput placeholder="Lote" value={lote} onChangeText={setLote} />
      {errors.lote && <Text>{errors.lote}</Text>}
      <TextInput
        placeholder="Técnico"
        value={tecnico}
        onChangeText={setTecnico}
      />
      {errors.tecnico && <Text>{errors.tecnico}</Text>}
      <Button title="Adicionar Dose" onPress={adicionarDose} />
    </View>
  );
}
