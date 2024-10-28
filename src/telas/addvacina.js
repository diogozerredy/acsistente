import React, { useState } from "react";
import { View, TextInput, Button, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import style from "../../style/style";

export default function AdicionarVacina({ route, navigation }) {
  const { vacina } = route.params || {};

  if (!vacina) {
    return <Text>Erro: Dados da vacina não foram encontrados.</Text>;
  }

  const [data, setData] = useState(vacina.data || "");
  const [local, setLocal] = useState(vacina.local || "");
  const [lote, setLote] = useState(vacina.lote || "");
  const [tecnico, setTecnico] = useState(vacina.tecnico || "");
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
      const vacinaAtualizada = { ...vacina, data, local, lote, tecnico };

      navigation.navigate({
        name: "VerVacina",
        params: { doseAtualizada: vacinaAtualizada },
        merge: true,
      });
    }
  };

  return (
    <SafeAreaView style={style.container}>
      <View>
        <Text>{vacina.nome}</Text>
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
    </SafeAreaView>
  );
}
