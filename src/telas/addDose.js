import React, { useState } from "react";
import { View, TextInput, Text, Modal } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import style from "../../style/style";
import { TouchableOpacity } from "react-native";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";

export default function AdicionarDose({ route, navigation }) {
  const { vacina } = route.params || {};

  if (!vacina) {
    return <Text>Erro: Dados da vacina não foram encontrados.</Text>;
  }

  const [data, setData] = useState(vacina.data || "");
  const [local, setLocal] = useState(vacina.local || "");
  const [lote, setLote] = useState(vacina.lote || "");
  const [tecnico, setTecnico] = useState(vacina.tecnico || "");
  const [errors, setErrors] = useState({});
  const [modal, setModal] = useState(false);

  // Função para formatar a data
  const telaData = (value) => {
    const formatoData = value
      .replace(/\D/g, "")
      .replace(/(\d{2})(\d)/, "$1/$2")
      .replace(/(\d{2})(\d)/, "$1/$2");
    setData(formatoData);
  };

  // Função para validar a entrada de dados
  const validarInput = () => {
    let validar = true;
    let novosErros = {};

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

  const limparCamposEVacina = () => {
    setData("");
    setLocal("");
    setLote("");
    setTecnico("");

    const vacinaAtualizada = {
      ...vacina,
      data: "",
      local: "",
      lote: "",
      tecnico: "",
    };
    navigation.navigate({
      name: "VerVacina",
      params: { doseAtualizada: vacinaAtualizada },
      merge: true,
    });
  };

  // Função para adicionar ou atualizar a dose
  const adicionarDose = () => {
    if (!validarInput()) return;
    const vacinaAtualizada = { ...vacina, data, local, lote, tecnico };
    navigation.navigate({
      name: "VerVacina",
      params: { doseAtualizada: vacinaAtualizada },
      merge: true,
    });
  };

  return (
    <SafeAreaView style={style.container}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modal}
        onRequestClose={() => setModal(false)}
      >
        <View style={style.centeredView}>
          <View style={style.modalView}>
            <Text style={style.modalText}>
              Deseja realmente remover esta vacina?
            </Text>
            <View style={style.btnview}>
              <TouchableOpacity
                style={style.buttonPeso}
                onPress={() => setModal(false)}
              >
                <Text style={style.textStyle}>Cancelar</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={style.buttonPeso}
                onPress={limparCamposEVacina}
              >
                <Text style={style.textStyle}>Confirmar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
      <View
        style={{
          justifyContent: "space-between",
          flex: 1,
        }}
      >
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
            onChangeText={(local) => setLocal(local.toUpperCase())}
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
            onChangeText={(tecnico) => setTecnico(tecnico.toUpperCase())}
          />
        </View>
        <View>
          <View
            style={{
              marginTop: "5%",
              flexDirection: "row",
              paddingHorizontal: "10%",
              gap: 15,
            }}
          >
            <TouchableOpacity
              style={style.btnadddose}
              onPress={() => navigation.goBack()}
            >
              <Text style={style.textbtn}>Cancelar</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={style.btnadddose}
              onPress={() => setModal(true)}
            >
              <Text style={style.textbtn}>Remover</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={style.btnaddvacina} onPress={adicionarDose}>
            <Text style={style.textbtn}>Adicionar Dose</Text>
          </TouchableOpacity>
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
