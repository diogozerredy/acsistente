import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import style from "../../style/style.js";
import { SafeAreaView } from "react-native-safe-area-context";
export default function Home({ navigation }) {
  return (
    <SafeAreaView style={style.container}>
      <View style={[style.Home, style.container]}>
        <View style={[style.content, style.contenthome]}>
          <TouchableOpacity
            onPress={() => navigation.navigate("ListaCriancas")}
            style={[style.botao, style.cadastros]}
          >
            <FontAwesome5
              style={{ textAlign: "center" }}
              name="users"
              size={60}
              color="#26A20A"
            />
            <Text style={style.btntexto}>CADASTROS</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[style.botao, style.cadastros]}>
            <FontAwesome5
              style={{ textAlign: "center" }}
              name="clipboard-list"
              size={60}
              color="#26A20A"
            />
            <Text style={style.btntexto}>SISTEMATICA</Text>
          </TouchableOpacity>
        </View>
        <Text style={style.msg}>
          TABALHO DE EXTENSAO ESTACIO{"\n"} REACT-NATIVE FEITO POR:{"\n"}{" "}
          ANTONIO DIOGO AMARO DE LIMA
          {"\n"} MATRICULA: 202204176181
        </Text>

        <TouchableOpacity
          onPress={() => navigation.navigate("Cadastro")}
          style={[style.botao, style.btncadastrar]}
        >
          <Text style={[style.texto, { fontSize: 17 }]}>CADASTRAR CRIANÇA</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
