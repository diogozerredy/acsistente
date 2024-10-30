import React, { useState, useContext } from "react";
import { View, TextInput, Button, Text, TouchableOpacity } from "react-native";
import { CriancaContext } from "../routes/CriancaContext";
import style from "../../style/style";
import { SafeAreaView } from "react-native-safe-area-context";
import AntDesign from "@expo/vector-icons/AntDesign";
import Feather from "@expo/vector-icons/Feather";

export default function TelaCrianca({ route, navigation }) {
  const { crianca } = route.params || {};
  if (!crianca) {
    return <Text>Erro: Dados da criança não foram encontrados.</Text>;
  }
  const { atualizarCrianca, removerCrianca } = useContext(CriancaContext);

  const [nomeCrianca, setNomeCrianca] = useState(crianca.nomeCrianca);
  const [nomeMae, setNomeMae] = useState(crianca.nomeMae);
  const [dataNascimento, setDataNascimento] = useState(crianca.dataNascimento);
  const [errors, setErrors] = useState({});
  const [editarNome, setEditarNome] = useState(false);
  const [editarMae, setEditarMae] = useState(false);
  const [editarDn, setEditarDn] = useState(false);

  const SalvarCrianca = () => {
    if (!validarInput()) {
      return;
    }

    atualizarCrianca({ ...crianca, nomeCrianca, dataNascimento, nomeMae });
    setEditarNome(false);
    setEditarMae(false);
    setEditarDn(false);
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
    if (!nomeMae) {
      errors.nomeMae = "campo obrigatório*";
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
    <SafeAreaView style={style.container}>
      <View style={[style.content, style.detalhes]}>
        {editarNome ? (
          <View>
            <TextInput
              style={{ borderBottomWidth: 1, marginBottom: 5 }}
              placeholder="Nome da Criança"
              value={nomeCrianca}
              onChangeText={setNomeCrianca}
            />
            <TouchableOpacity
              onPress={() => {
                setEditarNome(false);
              }}
            >
              <Feather name="x" size={24} color="black" />
            </TouchableOpacity>
            <TouchableOpacity onPress={SalvarCrianca}>
              <Feather name="check" size={24} color="black" />
            </TouchableOpacity>

            {errors.nomeCrianca && (
              <Text style={style.error}>{errors.nomeCrianca}</Text>
            )}
          </View>
        ) : (
          <View>
            <Text
              style={{
                borderBottomWidth: 1,
                marginBottom: 5,
                paddingBottom: 5,
              }}
            >
              {nomeCrianca}
            </Text>
            <TouchableOpacity
              onPress={() => {
                setEditarNome(true);
                setEditarMae(false);
                setEditarDn(false);
              }}
            >
              <AntDesign name="edit" size={24} color="black" />
            </TouchableOpacity>
          </View>
        )}
        {editarMae ? (
          <View>
            <TextInput
              style={{ borderBottomWidth: 1, marginBottom: 5 }}
              placeholder="Nome da Mãe"
              value={nomeMae}
              onChangeText={setNomeMae}
            />
            <TouchableOpacity onPress={() => setEditarMae(false)}>
              <Feather name="x" size={24} color="black" />
            </TouchableOpacity>
            <TouchableOpacity onPress={SalvarCrianca}>
              <Feather name="check" size={24} color="black" />
            </TouchableOpacity>

            {errors.nomeMae && (
              <Text style={style.error}>{errors.nomeMae}</Text>
            )}
          </View>
        ) : (
          <View>
            <Text
              style={{
                borderBottomWidth: 1,
                marginBottom: 5,
                paddingBottom: 5,
              }}
            >
              {nomeMae}
            </Text>
            <TouchableOpacity
              onPress={() => {
                setEditarMae(true);
                setEditarNome(false);
                setEditarDn(false);
              }}
            >
              <AntDesign name="edit" size={24} color="black" />
            </TouchableOpacity>
          </View>
        )}
        {editarDn ? (
          <View>
            <TextInput
              style={{ borderBottomWidth: 1, marginBottom: 5 }}
              maxLength={10}
              placeholder="Data de Nascimento"
              keyboardType="numeric"
              value={dataNascimento}
              onChangeText={telaDataNascimento}
            />
            <TouchableOpacity onPress={() => setEditarDn(false)}>
              <Feather name="x" size={24} color="black" />
            </TouchableOpacity>
            <TouchableOpacity onPress={SalvarCrianca}>
              <Feather name="check" size={24} color="black" />
            </TouchableOpacity>
            {errors.dataNascimento && (
              <Text style={style.error}>{errors.dataNascimento}</Text>
            )}
          </View>
        ) : (
          <View>
            <Text
              style={{
                borderBottomWidth: 1,
                marginBottom: 5,
                paddingBottom: 5,
              }}
            >
              {dataNascimento}
            </Text>
            <TouchableOpacity
              onPress={() => {
                setEditarDn(true);
                setEditarNome(false);
                setEditarMae(false);
              }}
            >
              <AntDesign name="edit" size={24} color="black" />
            </TouchableOpacity>
          </View>
        )}

        <Button title="Salvar" onPress={SalvarCrianca} />
        <Button
          title="Remover"
          onPress={() => {
            removerCrianca(crianca.id);
            navigation.goBack();
          }}
        />
        <Button
          title="VACINAS"
          onPress={() => navigation.navigate("VerVacina", { crianca: crianca })}
        />
      </View>
    </SafeAreaView>
  );
}
