import React, { useState, useContext } from "react";
import {
  View,
  TextInput,
  Button,
  Text,
  TouchableOpacity,
  Modal,
} from "react-native";
import { CriancaContext } from "../routes/CriancaContext";
import style from "../../style/style";
import { SafeAreaView } from "react-native-safe-area-context";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
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

  const [modalVisible, setModalVisible] = useState(false);
  const [mostrarEditar, setMostrarEdita] = useState(false);
  const [btnmostrar, setbtnmostrar] = useState(true);

  const [valorNomeOriginal, setValorNomeOriginal] = useState(
    crianca.nomeCrianca
  );
  const [valorMaeOriginal, setValorMaeOriginal] = useState(crianca.nomeMae);
  const [valorDnOriginal, setValorDnOriginal] = useState(
    crianca.dataNascimento
  );
  const cancelarEdicao = (tipo) => {
    if (tipo === "nome") {
      setNomeCrianca(valorNomeOriginal);
      setEditarNome(false);
    } else if (tipo === "mae") {
      setNomeMae(valorMaeOriginal);
      setEditarMae(false);
    } else if (tipo === "dn") {
      setDataNascimento(valorDnOriginal);
      setEditarDn(false);
    }
  };
  const SalvarCrianca = () => {
    atualizarCrianca({ ...crianca, nomeCrianca, dataNascimento, nomeMae });
    navigation.goBack();
  };
  const Salvarinput = () => {
    if (!validarInput()) {
      return;
    }
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
              <Text style={{ fontWeight: "bold" }}>{crianca.nomeCrianca}?</Text>
            </Text>
            <View style={style.btnview}>
              <TouchableOpacity
                style={style.button}
                onPress={() => {
                  setModalVisible(false);
                }}
              >
                <Text style={style.textStyle}>Cancelar</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={style.button}
                onPress={() => {
                  removerCrianca(crianca.id);
                  navigation.goBack();
                }}
              >
                <Text style={style.textStyle}>Confirmar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      <View style={style.detalhes}>
        {mostrarEditar ? (
          <View style={[style.content, { padding: 20 }]}>
            {editarNome ? (
              <View>
                <View style={style.vieweditarinput}>
                  <TextInput
                    style={style.editarinput}
                    placeholder="Nome da Criança"
                    value={nomeCrianca}
                    onChangeText={setNomeCrianca}
                  />
                  <View style={style.confirmar}>
                    <TouchableOpacity onPress={() => cancelarEdicao("nome")}>
                      <Feather name="x" size={24} color="red" />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={Salvarinput}>
                      <Feather name="check" size={24} color="#26A20A" />
                    </TouchableOpacity>
                  </View>
                </View>
                {errors.nomeCrianca && (
                  <Text style={style.error}>{errors.nomeCrianca}</Text>
                )}
              </View>
            ) : (
              <View style={style.vieweditarinput}>
                <Text>{nomeCrianca}</Text>
                <TouchableOpacity
                  onPress={() => {
                    setValorNomeOriginal(nomeCrianca);
                    setEditarNome(true);
                    setEditarDn(false);

                    setEditarMae(false);
                  }}
                >
                  <FontAwesome5 name="edit" size={24} color="#00008b" />
                </TouchableOpacity>
              </View>
            )}
            {editarMae ? (
              <View>
                <View style={style.vieweditarinput}>
                  <TextInput
                    style={style.editarinput}
                    placeholder="Nome da Mãe"
                    value={nomeMae}
                    onChangeText={setNomeMae}
                  />
                  <View style={style.confirmar}>
                    <TouchableOpacity onPress={() => cancelarEdicao("mae")}>
                      <Feather name="x" size={24} color="red" />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={Salvarinput}>
                      <Feather name="check" size={24} color="#26A20A" />
                    </TouchableOpacity>
                  </View>
                </View>
                {errors.nomeMae && (
                  <Text style={style.error}>{errors.nomeMae}</Text>
                )}
              </View>
            ) : (
              <View style={style.vieweditarinput}>
                <Text>{nomeMae}</Text>
                <TouchableOpacity
                  onPress={() => {
                    setValorMaeOriginal(nomeMae);
                    setEditarMae(true);

                    setEditarNome(false);

                    setEditarDn(false);
                  }}
                >
                  <FontAwesome5 name="edit" size={24} color="#00008b" />
                </TouchableOpacity>
              </View>
            )}
            {editarDn ? (
              <View>
                <View style={style.vieweditarinput}>
                  <TextInput
                    style={style.editarinput}
                    maxLength={10}
                    placeholder="Data de Nascimento"
                    keyboardType="numeric"
                    value={dataNascimento}
                    onChangeText={telaDataNascimento}
                  />
                  <View style={style.confirmar}>
                    <TouchableOpacity onPress={() => cancelarEdicao("dn")}>
                      <Feather name="x" size={24} color="red" />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={Salvarinput}>
                      <Feather name="check" size={24} color="#26A20A" />
                    </TouchableOpacity>
                  </View>
                </View>
                {errors.dataNascimento && (
                  <Text style={style.error}>{errors.dataNascimento}</Text>
                )}
              </View>
            ) : (
              <View style={style.vieweditarinput}>
                <Text>{dataNascimento}</Text>
                <TouchableOpacity
                  onPress={() => {
                    setValorDnOriginal(dataNascimento);
                    setEditarDn(true);
                    setEditarNome(false);
                    setEditarMae(false);
                  }}
                >
                  <FontAwesome5 name="edit" size={24} color="#00008b" />
                </TouchableOpacity>
              </View>
            )}
            <View style={style.dtlsviewbtn}>
              <TouchableOpacity
                style={[style.btnretangular, { flex: 1 }]}
                onPress={() => {
                  setEditarNome(false);
                  setEditarMae(false);
                  setEditarDn(false);
                  setMostrarEdita(false);
                  setbtnmostrar(true);
                  cancelarEdicao("nome");
                  cancelarEdicao("dn");
                  cancelarEdicao("mae");
                }}
              >
                <Text style={style.textbtn}>Cancelar</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[style.btnretangular, { flex: 1 }]}
                onPress={SalvarCrianca}
              >
                <Text style={style.textbtn}>Salvar</Text>
              </TouchableOpacity>
            </View>
          </View>
        ) : (
          <View
            style={{
              alignItems: "center",
              borderBottomWidth: 2,
              paddingBottom: 25,
              borderColor: "#CCC",
            }}
          >
            <Text style={{ fontSize: 20, width: "80%", lineHeight: 30 }}>
              Nome:
              <Text style={{ fontWeight: "bold" }}> {crianca.nomeCrianca}</Text>
              {"\n"}Mae:
              <Text style={{ fontWeight: "bold" }}> {crianca.nomeMae}</Text>
              {"\n"}Data Nascimento:
              <Text style={{ fontWeight: "bold" }}>
                {" "}
                {crianca.dataNascimento}
              </Text>
            </Text>
          </View>
        )}

        {btnmostrar && (
          <View style={{ width: "100%", gap: 20 }}>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("VerVacina", { crianca: crianca })
              }
              style={style.btnretangular}
            >
              <Text style={style.textbtn}>Adicionar Vacina</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("VerPesos", { crianca: crianca })
              }
              style={style.btnretangular}
            >
              <Text style={style.textbtn}>Adicionar Peso</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={style.btnretangular}
              onPress={() => {
                setbtnmostrar(false);
                setMostrarEdita(true);
              }}
            >
              <Text style={style.textbtn}>Editar Crianca</Text>
            </TouchableOpacity>
          </View>
        )}
        <View style={style.btnsdetalhes}>
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
            onPress={() => setModalVisible(true)}
          >
            <FontAwesome5 name="trash-alt" size={40} color="#FFF" />
            <Text style={style.dtlhsText}>Remover</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={style.btndetalhes}
            onPress={() =>
              navigation.navigate("VerVacina", { crianca: crianca })
            }
          >
            <MaterialIcons name="vaccines" size={40} color="#FFF" />
            <Text style={style.dtlhsText}>Vacinas</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}
