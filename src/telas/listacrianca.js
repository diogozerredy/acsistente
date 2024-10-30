import React, { useContext } from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import style from "../../style/style.js";
import { SafeAreaView } from "react-native-safe-area-context";
import { CriancaContext } from "../routes/CriancaContext.js";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5.js";

export default function ListaCriancas({ navigation }) {
  const { criancas, removerCrianca } = useContext(CriancaContext);
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
  const calcularIdade = (dataNascimento) => {
    let idadedate = DNConvert(dataNascimento);
    const hoje = new Date();
    const nascimento = new Date(idadedate);

    let anos = hoje.getFullYear() - nascimento.getFullYear();
    let meses = hoje.getMonth() - nascimento.getMonth();

    if (meses < 0 || (meses === 0 && hoje.getDate() < nascimento.getDate())) {
      anos--;
      meses += 12;
    }

    if (hoje.getDate() < nascimento.getDate()) {
      meses--;
    }

    return { anos, meses };
  };
  return (
    <SafeAreaView style={style.container}>
      <ScrollView style={[style.content, { padding: 5, marginBottom: 25 }]}>
        {criancas.map((item) => {
          const idade = calcularIdade(item.dataNascimento);
          return (
            <TouchableOpacity
              key={item.id}
              style={style.Lista}
              onPress={() =>
                navigation.navigate("TelaCrianca", { crianca: item })
              }
            >
              <View style={style.apagar}>
                <View style={{ padding: 15, maxWidth: "90%" }}>
                  <Text style={style.nomeLista}>Nome: {item.nomeCrianca}</Text>
                  <Text style={style.textoLista}>
                    Mae: {item.nomeMae} {"\n"}
                    Dn: {item.dataNascimento}
                    {"\n"}
                    Idade: {idade.anos} anos e {idade.meses} meses
                  </Text>
                </View>
                <TouchableOpacity onPress={() => removerCrianca(item.id)}>
                  <AntDesign
                    style={{ marginEnd: 13, opacity: 0.7 }}
                    name="delete"
                    size={30}
                    color="red"
                  />
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
      <TouchableOpacity
        onPress={() => navigation.navigate("Cadastro")}
        style={[
          style.botao,
          style.btnListar,
          { right: 20, bottom: 20, position: "absolute" },
        ]}
      >
        <FontAwesome5 name="user-plus" size={35} color="#FFFFFF" />
      </TouchableOpacity>
    </SafeAreaView>
  );
}
