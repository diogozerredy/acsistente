import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import style from "../../style/style.js";
import { SafeAreaView } from "react-native-safe-area-context";
export default function Home({ navigation }) {
  return (
    <SafeAreaView style={style.container}>
      <View style={[style.Home, style.container]}>
        <View style={[style.content]}>
          <View style={style.contenthome}>
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
            <TouchableOpacity
              onPress={() => navigation.navigate("Sobre")}
              style={[style.botao, style.cadastros]}
            >
              <FontAwesome5
                style={{ textAlign: "center" }}
                name="clipboard-list"
                size={60}
                color="#26A20A"
              />
              <Text style={style.btntexto}>SISTEMATICA</Text>
            </TouchableOpacity>
          </View>

          <View style={style.contenthome}>
            <TouchableOpacity
              onPress={() => navigation.navigate("Sobre")}
              style={[style.botao, style.cadastros]}
            >
              <FontAwesome5
                style={{ textAlign: "center" }}
                name="file-alt"
                size={60}
                color="#26A20A"
              />
              <Text style={style.btntexto}>RELATORIOS</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => navigation.navigate("Sobre")}
              style={[style.botao, style.cadastros]}
            >
              <FontAwesome5
                style={{ textAlign: "center" }}
                name="info-circle"
                size={60}
                color="#26A20A"
              />
              <Text style={style.btntexto}>SOBRE</Text>
            </TouchableOpacity>
          </View>
          <View style={style.contenthome}>
            <TouchableOpacity
              onPress={() => navigation.navigate("Cadastro")}
              style={[style.botao, style.btncadastrar]}
            >
              <FontAwesome5 name="user-plus" size={60} color="#26A20A" />
              <Text style={[style.texto, { fontSize: 20 }]}>
                CADASTRAR{"\n"}CRIANÇA
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}
