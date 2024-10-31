import React, { useState, useContext } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import Crianca from "../objetos/crianca.js";
import Vacina from "../objetos/vacina.js";
import style from "../../style/style.js";
import { CriancaContext } from "../routes/CriancaContext.js";
import { SafeAreaView } from "react-native-safe-area-context";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";

export default function Cadastro({ navigation }) {
  const { adicionarCrianca } = useContext(CriancaContext);

  const [nomeCrianca, setNomeCrianca] = useState("");
  const [nomeMae, setNomeMae] = useState("");
  const [dataNascimento, setDataNascimento] = useState("");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState({});
  const [Todasvacinas] = useState([
    new Vacina("BCG", "DoseUnica", "Ao Nascer", "BCG_DoseUnica"),
    new Vacina("Hepatite B", "DoseUnica", "Ao Nascer", "HepatiteB_DoseUnica"),
    new Vacina("Penta", "Dose1", 2, "Penta_Dose1"),
    new Vacina("VIP", "Dose1", 2, "VIP_Dose1"),
    new Vacina("Rotavírus humano", "Dose1", 2, "RotavirusHumano_Dose1"),
    new Vacina("Pneumocócica 10V", "Dose1", 2, "Pneumococica10V_Dose1"),
    new Vacina("Meningocócica C", "Dose1", 3, "MeningococicaC_Dose1"),
    new Vacina("Penta", "Dose2", 4, "Penta_Dose2"),
    new Vacina("VIP", "Dose2", 4, "VIP_Dose2"),
    new Vacina("Rotavírus humano", "Dose2", 4, "RotavirusHumano_Dose2"),
    new Vacina("Pneumocócica 10V", "Dose2", 4, "Pneumococica10V_Dose2"),
    new Vacina("Meningocócica C", "Dose2", 5, "MeningococicaC_Dose2"),
    new Vacina("Penta", "Dose3", 6, "Penta_Dose3"),
    new Vacina("VIP", "Dose3", 6, "VIP_Dose3"),
    new Vacina("Febre Amarela", "Dose1", 9, "FebreAmarela_Dose1"),
    new Vacina("Pneumocócica 10V", "Reforço", 12, "Pneumococica10V_Reforco"),
    new Vacina("Meningocócica C", "Reforço", 12, "MeningococicaC_Reforco"),
    new Vacina("Tríplice viral", "Dose1", 12, "TripliceViral_Dose1"),
    new Vacina("Tríplice viral", "Dose2", 15, "TripliceViral_Dose2"),
    new Vacina("DTP", "1°Reforço", 15, "DTP_1Reforco"),
    new Vacina("VOP", "1°Reforço", 15, "VOP_1Reforco"),
    new Vacina("Hepatite A", "UmaDose", 15, "HepatiteA_UmaDose"),
    new Vacina("Treta Viral", "UmaDose", 15, "TretaViral_UmaDose"),
    new Vacina("DTP", "2°Reforço", 48, "DTP_2Reforco"),
    new Vacina("VOP", "2°Reforço", 48, "VOP_2Reforco"),
    new Vacina("Febre Amarela", "Dose1", 48, "FebreAmarela_Dose1_48"),
    new Vacina("Varicela", "UmaDose", 48, "Varicela_UmaDose"),
  ]);

  const telaCadastrarCrianca = async () => {
    if (!validarInput()) {
      return;
    }

    const novaCrianca = new Crianca(nomeCrianca, dataNascimento, nomeMae);
    novaCrianca.vacinas = Todasvacinas;
    novaCrianca.id = Date.now(); // ID único

    await adicionarCrianca(novaCrianca);

    setMessage(`"${nomeCrianca}" Cadastro Realizado Com Sucesso!`);
    setNomeCrianca("");
    setNomeMae("");
    setDataNascimento("");
    // navigation.navigate("Homestack", { screen: "ListaCriancas" });
  };

  const telaDataNascimento = (value) => {
    const formatoData = value
      .replace(/\D/g, "")
      .replace(/(\d{2})(\d)/, "$1/$2")
      .replace(/(\d{2})(\d)/, "$1/$2");
    setDataNascimento(formatoData);
  };

  const validarInput = () => {
    let validar = true;
    let errors = {};
    let dnValidar = DNConvert(dataNascimento);

    if (!nomeCrianca) {
      errors.nomeCrianca = "Campo Obrigatório*";
      validar = false;
    }
    if (!nomeMae) {
      errors.nomeMae = "Campo Obrigatório*";
      validar = false;
    }
    if (!dataNascimento) {
      errors.dataNascimento = "Campo Obrigatório*";
      validar = false;
    } else {
      const partes = dataNascimento.split("/");
      const dia = parseInt(partes[0], 10);
      const mes = parseInt(partes[1], 10) - 1;
      const ano = parseInt(partes[2], 10);
      const objetoData = new Date(ano, mes, dia);
      if (
        objetoData.getFullYear() !== ano ||
        objetoData.getMonth() !== mes ||
        objetoData.getDate() !== dia
      ) {
        errors.dataNascimento =
          "*Verifique Se Voce Digitou a Data Corretamente";
        validar = false;
      } else if (dnValidar && dnValidar.getTime() >= new Date().getTime()) {
        errors.dataNascimento = "*Voce Digitou Uma Data inválida";
        validar = false;
      }
    }
    setErrors(errors);
    return validar;
  };

  function DNConvert(dn) {
    let valor = dn.replace(/\//g, "-");
    let ordenar = valor.replace(/(\d{2})-(\d{2})-(\d{4})/, "$3-$2-$1");
    let data = new Date(ordenar);
    if (isNaN(data.getTime())) {
      return null;
    }
    let novadata = new Date(data.getTime() + 24 * 60 * 60 * 1000);

    return novadata;
  }

  return (
    <SafeAreaView style={style.container}>
      <View style={style.viewinput}>
        <View>
          <TextInput
            placeholder="Nome da Criança"
            onChangeText={(nomeCrianca) => setNomeCrianca(nomeCrianca)}
            value={nomeCrianca}
            style={style.input}
          />
          {errors.nomeCrianca && (
            <Text style={style.error}>{errors.nomeCrianca}</Text>
          )}
          <TextInput
            placeholder="Nome da Mãe"
            onChangeText={(mae) => setNomeMae(mae)}
            value={nomeMae}
            style={style.input}
          />
          {errors.nomeMae && <Text style={style.error}>{errors.nomeMae}</Text>}
          <TextInput
            maxLength={10}
            value={dataNascimento}
            keyboardType="numeric"
            placeholder="Data de Nascimento"
            onChangeText={telaDataNascimento}
            style={style.input}
          />
          {errors.dataNascimento && (
            <Text style={style.error}>{errors.dataNascimento}</Text>
          )}

          <Text style={style.cadtexto}>{message}</Text>
        </View>
        <View style={{ justifyContent: "flex-start", flex: 1, marginTop: 10 }}>
          <TouchableOpacity
            style={style.btnsalvar}
            onPress={telaCadastrarCrianca}
          >
            <Text
              style={{
                color: "#FFFFFF",
                fontSize: 25,
                textAlign: "center",
              }}
            >
              Salvar
            </Text>
          </TouchableOpacity>
        </View>
        <View style={style.viewbtn}>
          <TouchableOpacity
            style={[style.btnListar, style.btnav]}
            onPress={() =>
              navigation.navigate("Homestack", { screen: "Inicio" })
            }
          >
            <FontAwesome5 name="home" size={40} color="#FFFFFF" />
          </TouchableOpacity>
          <TouchableOpacity
            style={[style.btnListar, style.btnav]}
            onPress={telaCadastrarCrianca}
          >
            <FontAwesome5 name="save" size={40} color="#FFFFFF" />
          </TouchableOpacity>
          <TouchableOpacity
            style={[style.btnListar, style.btnav]}
            onPress={() =>
              navigation.navigate("Homestack", { screen: "ListaCriancas" })
            }
          >
            <FontAwesome5 name="users" size={40} color="#FFFFFF" />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}
