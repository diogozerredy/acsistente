import React, { useState } from "react";
import { View, TextInput, Button, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import style from "../../style/style";
import { TouchableOpacity } from "react-native";

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
      <View
        style={{
          borderWidth: 1,
          gap: 5,
          padding: 10,
          marginHorizontal: 15,
        }}
      >
        <Text style={style.titlevcn}>{vacina.nome}</Text>
        <TextInput
          style={style.addInput}
          placeholder="Data:"
          value={data}
          onChangeText={setData}
        />
        {errors.data && <Text style={style.error}>{errors.data}</Text>}
        <TextInput
          style={style.addInput}
          placeholder="Local:"
          value={local}
          onChangeText={setLocal}
        />
        {errors.local && <Text style={style.error}>{errors.local}</Text>}
        <TextInput
          style={style.addInput}
          placeholder="Lote:"
          value={lote}
          onChangeText={setLote}
        />
        <TextInput
          style={style.addInput}
          placeholder="Técnico:"
          value={tecnico}
          onChangeText={setTecnico}
        />
      </View>
      <TouchableOpacity
        style={{
          marginTop: 30,
          backgroundColor: "#26A20A",
          height: "7%",
          justifyContent: "center",
          width: "80%",
          marginHorizontal: "10%",
          borderRadius: 100,
        }}
        onPress={adicionarDose}
      >
        <Text style={{ textAlign: "center", fontSize: 25, color: "#FFF" }}>
          Adicinar Dose
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}
