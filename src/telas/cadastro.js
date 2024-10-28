import React, { useState, useContext } from "react";
import { View, Text, TextInput, Button } from "react-native";
import Crianca from "../objetos/crianca.js";
import Vacina from "../objetos/vacina.js";
import style from "../../style/style.js";
import { CriancaContext } from "../routes/CriancaContext.js";

export default function Cadastro({ navigation }) {
  const { adicionarCrianca } = useContext(CriancaContext);

  const [nomeCrianca, setNomeCrianca] = useState("");
  const [dataNascimento, setDataNascimento] = useState("");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState({});
  const [Todasvacinas] = useState([
    new Vacina("BCG", "DoseUnica", "Ao Nascer"),
    new Vacina("Hepatite B", "Dose ao Nascer"),
    new Vacina("Penta", "Dose1", 2),
    new Vacina("VIP", "Dose1", 2),
    new Vacina("Rotavírus humano", "Dose1", 2),
    new Vacina("Pneumocócica 10V", "Dose1", 2),
    new Vacina("Meningocócica C", "Dose1", 3),
    new Vacina("Penta", "Dose2", 4),
    new Vacina("VIP", "Dose2", 4),
    new Vacina("Rotavírus humano", "Dose2", 4),
    new Vacina("Pneumocócica 10V", "Dose2", 4),
    new Vacina("Meningocócica C", "Dose2", 5),
    new Vacina("Penta", "Dose3", 6),
    new Vacina("VIP", "Dose3", 6),
    new Vacina("Febre Amarela", "Dose1", 9),
    new Vacina("Pneumocócica 10V", "Reforço", 12),
    new Vacina("Meningocócica C", "Reforço", 12),
    new Vacina("Tríplice viral", "Dose1", 12),
    new Vacina("Tríplice viral", "Dose2", 15),
    new Vacina("DTP", "1°Reforço", 15),
    new Vacina("VOP", "1°Reforço", 15),
    new Vacina("Hepatite A", "UmaDose", 15),
    new Vacina("Treta Viral", "UmaDose", 15),
    new Vacina("DTP", "2°Reforço", 48),
    new Vacina("VOP", "2°Reforço", 48),
    new Vacina("Febre Amarela", "Dose1", 48),
    new Vacina("Varicela", "UmaDose", 48),
  ]);

  const telaCadastrarCrianca = async () => {
    if (!validarInput()) {
      return;
    }

    const novaCrianca = new Crianca(nomeCrianca, dataNascimento);
    novaCrianca.vacinas = Todasvacinas;
    novaCrianca.id = Date.now(); // ID único

    await adicionarCrianca(novaCrianca);

    setMessage(`${nomeCrianca} cadastrada com sucesso!`);
    setNomeCrianca("");
    setDataNascimento("");
    navigation.navigate("Homestack", { screen: "ListaCriancas" });
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
      errors.nomeCrianca = "campo obrigatório*";
      validar = false;
    }
    if (!dataNascimento) {
      errors.dataNascimento = "campo obrigatório*";
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
          "*Verifique se voce digitou a data corretamente";
        validar = false;
      } else if (dnValidar && dnValidar.getTime() >= new Date().getTime()) {
        errors.dataNascimento = "*Voce digitou uma data futura";
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
    <View style={style.container}>
      <TextInput
        placeholder="Nome da Criança"
        onChangeText={(nomeCrianca) => setNomeCrianca(nomeCrianca)}
        value={nomeCrianca}
        style={{ borderBottomWidth: 1, marginBottom: 5 }}
      />
      {errors.nomeCrianca && (
        <Text style={style.error}>{errors.nomeCrianca}</Text>
      )}
      <TextInput
        maxLength={10}
        value={dataNascimento}
        keyboardType="numeric"
        placeholder="Data de Nascimento (DD/MM/AAAA)"
        onChangeText={telaDataNascimento}
        style={{ borderBottomWidth: 1, marginBottom: 5 }}
      />
      {errors.dataNascimento && (
        <Text style={style.error}>{errors.dataNascimento}</Text>
      )}
      <Button title="Salvar" onPress={telaCadastrarCrianca} />
      <Text>{message}</Text>
    </View>
  );
}
