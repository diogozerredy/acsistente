import React, { useState } from "react";
import { View, TextInput, Text, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import style from "../../style/style";
import { TouchableOpacity } from "react-native";
import Vacina from "../objetos/vacina";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";

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

    const dose = vacina?.dose || "UmaDose";
    const idade = vacina?.idade || null;
    const id = vacina?.id || `${nome}_${dose}`;

    const vacinaAtualizada = new Vacina(
      nome,
      dose,
      idade,
      id,
      data,
      local,
      lote,
      tecnico
    );

    navigation.navigate({
      name: "VerVacina",
      params: isEditing
        ? { doseAtualizada: vacinaAtualizada }
        : { novaVacina: vacinaAtualizada },
      merge: true,
    });
  };

  const excluirVacina = () => {
    Alert.alert(
      "Excluir Vacina",
      "Tem certeza de que deseja excluir esta vacina?",
      [
        {
          text: "Cancelar",
          style: "cancel",
        },
        {
          text: "Excluir",
          style: "destructive",
          onPress: () => {
            navigation.navigate({
              name: "VerVacina",
              params: { vacinaExcluida: vacina },
              merge: true,
            });
          },
        },
      ]
    );
  };

  return (
    <SafeAreaView style={style.container}>
      <View style={{ justifyContent: "space-between", flex: 1 }}>
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
        <View>
          <TouchableOpacity style={style.btnaddvacina} onPress={salvarVacina}>
            <Text style={style.textbtn}>
              {isEditing ? "Salvar" : "Adicionar Vacina"}
            </Text>
          </TouchableOpacity>
          {isEditing && (
            <TouchableOpacity
              style={style.btnaddvacina}
              onPress={excluirVacina}
            >
              <Text style={style.textbtn}>Excluir Vacina</Text>
            </TouchableOpacity>
          )}
        </View>
        <View style={style.viewbtn}>
          <TouchableOpacity
            style={style.btndetalhes}
            onPress={() =>
              navigation.navigate("Homestack", { screen: "Inicio" })
            }
          >
            <FontAwesome5 name="home" size={40} color="#FFFFFF" />
            <Text style={style.dtlhsText}>Inicio</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={style.btndetalhes}
            onPress={() =>
              navigation.navigate("Homestack", { screen: "ListaCriancas" })
            }
          >
            <FontAwesome5 name="users" size={35} color="#FFFFFF" />
            <Text style={style.dtlhsText}>Cadastros</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}
