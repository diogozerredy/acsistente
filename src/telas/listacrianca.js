import React, { useContext, useEffect } from "react";
import { View, Text, ScrollView, TouchableOpacity, Button } from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import style from "../../style/style.js";
import { SafeAreaView } from "react-native-safe-area-context";
import { CriancaContext } from "../routes/CriancaContext.js";

export default function ListaCriancas({ route, navigation }) {
  const { criancas, removerCrianca } = useContext(CriancaContext);
  return (
    <SafeAreaView style={style.container}>
      <Text style={[style.acsistente, style.texto]}>ACSISTENTE</Text>
      <ScrollView style={style.content}>
        {criancas.map((item) => (
          <TouchableOpacity
            key={item.id}
            style={{
              justifyContent: "center",
              alignContent: "center",
              backgroundColor: "#ffffff",
              width: "95%",
              marginTop: 15,
              marginHorizontal: "2%",
              borderRadius: 5,
            }}
            onPress={() =>
              navigation.navigate("EditarCrianca", { crianca: item })
            }
          >
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Text style={{ padding: 15, fontSize: 17 }}>
                Nome: {item.nomeCrianca}
                {"\n"}
                Data de Nascimento: {item.dataNascimento}
              </Text>

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
        ))}
      </ScrollView>
      <Button
        title="Cadastrar Nova Criança"
        onPress={() => navigation.navigate("Cadastro")}
      />
    </SafeAreaView>
  );
}
