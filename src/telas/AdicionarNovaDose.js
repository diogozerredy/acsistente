import React, { useState, useEffect } from "react";
import { View, TextInput, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import style from "../../style/style";
import { TouchableOpacity } from "react-native";
import Vacina from "../objetos/vacina.js";

export default function AdicionarVacina({ route, navigation }) {
  const { vacina, isEditing } = route.params || {};

  const [nome, setNome] = useState(vacina?.nome || "");
  const [data, setData] = useState(vacina?.data || "");
  const [local, setLocal] = useState(vacina?.local || "");
  const [lote, setLote] = useState(vacina?.lote || "");
  const [tecnico, setTecnico] = useState(vacina?.tecnico || "");
  const [errors, setErrors] = useState({});

  const telaData = (value) => {
    const formatoData = value
      .replace(/\D/g, "")
      .replace(/(\d{2})(\d)/, "$1/$2")
      .replace(/(\d{2})(\d)/, "$1/$2");
    setData(formatoData);
  };

  const validarInput = () => {
    let validar = true;
    let novosErros = {};

    if (!nome) {
      novosErros.nome = "Campo Obrigatório*";
      validar = false;
    }
    if (!data) {
      novosErros.data = "Campo Obrigatório*";
      validar = false;
    } else {
      const partes = data.split("/");
      const dia = parseInt(partes[0], 10);
      const mes = parseInt(partes[1], 10) - 1;
      const ano = parseInt(partes[2], 10);
      const objetoData = new Date(ano, mes, dia);

      if (
        objetoData.getFullYear() !== ano ||
        objetoData.getMonth() !== mes ||
        objetoData.getDate() !== dia
      ) {
        novosErros.data = "*Verifique se digitou a data corretamente";
        validar = false;
      } else if (objetoData.getTime() >= new Date().getTime()) {
        novosErros.data = "*Você digitou uma data inválida";
        validar = false;
      }
    }
    if (!local) {
      novosErros.local = "Campo Obrigatório*";
      validar = false;
    }
    if (!lote) {
      novosErros.lote = "Campo Obrigatório*";
      validar = false;
    }

    setErrors(novosErros);
    return validar;
  };

  const salvarVacina = () => {
    if (!validarInput()) return;

    const vacinaAtualizada = {
      ...vacina,
      nome,
      data,
      local,
      lote,
      tecnico,
    };

    navigation.navigate({
      name: "VerVacina",
      params: isEditing
        ? { doseAtualizada: vacinaAtualizada }
        : { novaVacina: vacinaAtualizada },
      merge: true,
    });
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
        <TextInput
          style={style.addInput}
          placeholder="Nome da Vacina:"
          value={nome}
          onChangeText={setNome}
        />
        {errors.nome && <Text style={style.error}>{errors.nome}</Text>}
        <TextInput
          style={style.addInput}
          placeholder="Data:"
          keyboardType="numeric"
          value={data}
          maxLength={10}
          onChangeText={telaData}
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
          onChangeText={(lote) => setLote(lote.toUpperCase())}
        />
        {errors.lote && <Text style={style.error}>{errors.lote}</Text>}
        <TextInput
          style={style.addInput}
          placeholder="Técnico:"
          value={tecnico}
          onChangeText={setTecnico}
        />
      </View>
      <TouchableOpacity style={style.btnaddvacina} onPress={salvarVacina}>
        <Text style={style.textbtn}>
          {isEditing ? "Salvar Alterações" : "Adicionar Vacina"}
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}
