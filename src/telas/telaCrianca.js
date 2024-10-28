import React, { useState, useContext } from "react";
import { View, TextInput, Button, Text } from "react-native";
import { CriancaContext } from "../routes/CriancaContext";
import style from "../../style/style";
import { SafeAreaView } from "react-native-safe-area-context";

export default function TelaCrianca({ route, navigation }) {
  const { crianca } = route.params || {};
  if (!crianca) {
    return <Text>Erro: Dados da criança não foram encontrados.</Text>;
  }
  const { atualizarCrianca, removerCrianca } = useContext(CriancaContext);

  const [nomeCrianca, setNomeCrianca] = useState(crianca.nomeCrianca);
  const [dataNascimento, setDataNascimento] = useState(crianca.dataNascimento);
  const [errors, setErrors] = useState({});
  const [editar, setEditar] = useState(false);

  const SalvarCrianca = () => {
    if (!validarInput()) {
      return;
    }
    atualizarCrianca({ ...crianca, nomeCrianca, dataNascimento });
    navigation.goBack();
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
    <SafeAreaView style={style.container}>
      <View>
        {editar ? (
          <View>
            <TextInput
              style={{ borderBottomWidth: 1, marginBottom: 5 }}
              placeholder="Nome da Criança"
              value={nomeCrianca}
              onChangeText={setNomeCrianca}
            />
            {errors.nomeCrianca && (
              <Text style={style.error}>{errors.nomeCrianca}</Text>
            )}
            <TextInput
              style={{ borderBottomWidth: 1, marginBottom: 5 }}
              maxLength={10}
              keyboardType="numeric"
              value={dataNascimento}
              onChangeText={telaDataNascimento}
            />
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
              {nomeCrianca}
            </Text>
            <Text
              style={{
                borderBottomWidth: 1,
                marginBottom: 5,
                paddingBottom: 5,
              }}
            >
              {dataNascimento}
            </Text>
          </View>
        )}

        <Button title="Salvar" onPress={SalvarCrianca} />
        <Button
          title="remover"
          onPress={() => {
            removerCrianca(crianca.id);
            navigation.goBack();
          }}
        />
        <Button title="Editar" onPress={() => setEditar(true)} />
        <Button
          title="VACINAS"
          onPress={() => navigation.navigate("VerVacina", { crianca: crianca })}
        />
      </View>
    </SafeAreaView>
  );
}
