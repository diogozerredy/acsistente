import React, { useContext, useState } from "react";
import { View, Text, ScrollView, TouchableOpacity, Modal } from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import style from "../../style/style.js";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import { CriancaContext } from "../routes/CriancaContext.js";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5.js";

export default function ListaCriancas({ navigation }) {
  const { criancas, removerCrianca } = useContext(CriancaContext);
  const [modalVisible, setModalVisible] = useState(false);
  const [criancaParaRemover, setCriancaParaRemover] = useState(null);
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
    let dias = hoje.getDate() - nascimento.getDate();

    if (meses < 0 || (meses === 0 && hoje.getDate() < nascimento.getDate())) {
      anos--;
      meses += 12;
    }

    if (dias < 0) {
      meses--;
      dias += new Date(hoje.getFullYear(), hoje.getMonth(), 0).getDate();
    }

    return { anos, meses, dias };
  };
  const criancasOrdenadas = [...criancas].sort((a, b) => {
    const idadeA = calcularIdade(a.dataNascimento);
    const idadeB = calcularIdade(b.dataNascimento);
    return (
      idadeA.anos - idadeB.anos ||
      idadeA.meses - idadeB.meses ||
      idadeA.dias - idadeB.dias
    );
  });
  const abrirModal = (crianca) => {
    setCriancaParaRemover(crianca);
    setModalVisible(true);
  };

  const confirmarRemocao = () => {
    if (criancaParaRemover) {
      removerCrianca(criancaParaRemover.id);
    }
    setModalVisible(false);
    setCriancaParaRemover(null);
  };
  return (
    <SafeAreaProvider>
      <SafeAreaView style={[style.container, { paddingVertical: 20 }]}>
        <ScrollView style={[style.content, { padding: 5 }]}>
          {criancasOrdenadas.map((item) => {
            const idade = calcularIdade(item.dataNascimento);
            return (
              <TouchableOpacity
                key={item.id}
                style={style.Lista}
                onPress={() =>
                  navigation.navigate("Detalhes", { crianca: item })
                }
              >
                <View style={style.apagar}>
                  <View style={{ padding: 15, maxWidth: "90%" }}>
                    <Text style={style.nomeLista}>
                      Nome: {item.nomeCrianca}
                    </Text>
                    <Text style={style.textoLista}>
                      Mae: {item.nomeMae} {"\n"}
                      Dn: {item.dataNascimento}
                      {"\n"}
                      Idade: {idade.anos} anos e {idade.meses} meses
                    </Text>
                  </View>
                  <TouchableOpacity onPress={() => abrirModal(item)}>
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
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={style.centeredView}>
            <View style={style.modalView}>
              <Text style={style.modalText}>
                Deseja realmente excluir{" "}
                <Text style={{ fontWeight: "bold" }}>
                  {criancaParaRemover ? criancaParaRemover.nomeCrianca : ""}?
                </Text>
              </Text>
              <View style={style.btnview}>
                <TouchableOpacity
                  style={style.button}
                  onPress={() => setModalVisible(false)}
                >
                  <Text style={style.textStyle}>Cancelar</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={style.button}
                  onPress={confirmarRemocao}
                >
                  <Text style={style.textStyle}>Confirmar</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
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
    </SafeAreaProvider>
  );
}
