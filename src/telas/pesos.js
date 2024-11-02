import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  Modal,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import AsyncStorage from "@react-native-async-storage/async-storage";
import style from "../../style/style";

export default function VerPesos({ route }) {
  const { crianca } = route.params;
  const [pesos, setPesos] = useState([]);
  const [modal, setModal] = useState(false);
  const [editmodal, setEditmodal] = useState(false);
  const [apagarmodal, setApagarmodal] = useState(false);
  const [data, setData] = useState("");
  const [idade, setIdade] = useState("");
  const [peso, setPeso] = useState("");
  const [selecionaIndicePeso, setSelecionaIndicePeso] = useState(null);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const carregarPesos = async () => {
      try {
        const pesosSalvos = await AsyncStorage.getItem(`pesos_${crianca.id}`);
        if (pesosSalvos) {
          setPesos(JSON.parse(pesosSalvos));
        } else {
          setPesos(crianca.pesos || []);
        }
      } catch (error) {
        console.error("Erro ao carregar pesos:", error);
      }
    };
    carregarPesos();
  }, [crianca.id]);

  const salvarPesos = async (novosPesos) => {
    try {
      await AsyncStorage.setItem(
        `pesos_${crianca.id}`,
        JSON.stringify(novosPesos)
      );
    } catch (error) {
      console.error("Erro ao salvar pesos:", error);
    }
  };

  const telaData = (value) => {
    const formatoData = value
      .replace(/\D/g, "")
      .replace(/(\d{2})(\d)/, "$1/$2")
      .replace(/(\d{2})(\d)/, "$1/$2");
    setData(formatoData);
  };

  const validarInput = () => {
    let validar = true;
    let novosErros = {};

    if (!data) {
      novosErros.data = "Campo Obrigatório*";
      validar = false;
    } else {
      const partes = data.split("/");
      const dia = parseInt(partes[0], 10);
      const mes = parseInt(partes[1], 10) - 1;
      const ano = parseInt(partes[2], 10);
      const objetoData = new Date(ano, mes, dia);

      if (
        objetoData.getFullYear() !== ano ||
        objetoData.getMonth() !== mes ||
        objetoData.getDate() !== dia
      ) {
        novosErros.data = "*Verifique se digitou a data corretamente";
        validar = false;
      } else if (objetoData.getTime() >= new Date().getTime()) {
        novosErros.data = "*Você digitou uma data inválida";
        validar = false;
      }
    }

    if (!idade) {
      novosErros.idade = "Campo Obrigatório*";
      validar = false;
    }
    if (!peso) {
      novosErros.peso = "Campo Obrigatório*";
      validar = false;
    }

    setErrors(novosErros);
    return validar;
  };

  const adicionarPeso = () => {
    if (!validarInput()) return;

    const novoPeso = { data, idade, peso: parseFloat(peso) };
    const novosPesos = [...pesos, novoPeso];
    setPesos(novosPesos);
    salvarPesos(novosPesos);
    setData("");
    setIdade("");
    setPeso("");
    setModal(false);
  };

  const abrirModalEditar = (index) => {
    setSelecionaIndicePeso(index);
    setData(pesos[index].data);
    setIdade(pesos[index].idade);
    setPeso(pesos[index].peso != null ? pesos[index].peso.toString() : "");
    setEditmodal(true);
  };

  const editarPeso = () => {
    if (!validarInput()) return;

    const novosPesos = [...pesos];
    novosPesos[selecionaIndicePeso] = { data, idade, peso: parseFloat(peso) };
    setPesos(novosPesos);
    salvarPesos(novosPesos);
    setEditmodal(false);
    setData("");
    setIdade("");
    setPeso("");
  };

  const confirmarExcluirPeso = (index) => {
    setSelecionaIndicePeso(index);
    setApagarmodal(true);
  };

  const apagarPeso = () => {
    const novosPesos = pesos.filter((_, i) => i !== selecionaIndicePeso);
    setPesos(novosPesos);
    salvarPesos(novosPesos);
    setApagarmodal(false);
  };

  return (
    <SafeAreaView style={style.container}>
      <ScrollView>
        <Text style={style.title}>Pesos de {crianca.nomeCrianca}</Text>

        {pesos.length > 0 ? (
          pesos.map((peso, index) => (
            <View style={style.pesoItem} key={index}>
              <View>
                <Text style={style.pesoText}>Data: {peso.data}</Text>
                <Text style={style.pesoText}>
                  Idade:{" "}
                  {peso.idade >= 12
                    ? peso.idade == 12
                      ? `${peso.idade / 12} Ano`
                      : peso.idade == 13
                      ? `${(peso.idade - (peso.idade % 12)) / 12} Ano ${
                          peso.idade % 12
                        } Mes`
                      : `${(peso.idade - (peso.idade % 12)) / 12} Ano ${
                          peso.idade % 12
                        } Meses`
                    : peso.idade == 1
                    ? `${peso.idade} Mes`
                    : `${peso.idade} Meses`}
                </Text>
                <Text style={style.pesoText}>Peso: {peso.peso} kg</Text>
              </View>
              <View style={{ flexDirection: "row", gap: 40, marginRight: 20 }}>
                <TouchableOpacity onPress={() => abrirModalEditar(index)}>
                  <FontAwesome5 name="edit" size={28} color="#00008b" />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => confirmarExcluirPeso(index)}>
                  <FontAwesome5 name="trash-alt" size={30} color="red" />
                </TouchableOpacity>
              </View>
            </View>
          ))
        ) : (
          <Text style={style.pesoTexto}>Nenhum peso registrado.</Text>
        )}
      </ScrollView>
      <TouchableOpacity
        style={[style.btnretangular, { marginVertical: 17 }]}
        onPress={() => {
          setData("");
          setIdade("");
          setPeso("");
          setModal(true);
        }}
      >
        <Text style={style.textbtn}>Adicionar Peso</Text>
      </TouchableOpacity>

      {/* Modal para Adicionar Peso */}
      <Modal visible={modal} animationType="slide" transparent={true}>
        <View style={style.modalContainer}>
          <View style={style.modalContent}>
            <Text style={style.modalTitle}>Adicionar Peso</Text>

            <TextInput
              style={style.input}
              placeholder="Data (DD/MM/AAAA)"
              keyboardType="numeric"
              value={data}
              onChangeText={telaData}
            />
            {errors.data && <Text style={style.errorText}>{errors.data}</Text>}

            <TextInput
              style={style.input}
              placeholder="Idade (em meses)"
              keyboardType="numeric"
              value={idade}
              onChangeText={setIdade}
            />
            {errors.idade && (
              <Text style={style.errorText}>{errors.idade}</Text>
            )}

            <TextInput
              style={style.input}
              placeholder="Peso (em kg)"
              keyboardType="numeric"
              value={peso}
              onChangeText={setPeso}
            />
            {errors.peso && <Text style={style.errorText}>{errors.peso}</Text>}

            <View style={style.pesoModal}>
              <TouchableOpacity
                style={style.buttonPeso}
                onPress={() => setModal(false)}
              >
                <Text style={style.textStyle}>Cancelar</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={style.buttonPeso}
                onPress={adicionarPeso}
              >
                <Text style={style.textStyle}>Salvar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Modal para Editar Peso */}
      <Modal visible={editmodal} animationType="slide" transparent={true}>
        <View style={style.modalContainer}>
          <View style={style.modalContent}>
            <Text style={style.modalTitle}>Editar Peso</Text>

            <TextInput
              style={style.input}
              placeholder="Data (DD/MM/AAAA)"
              keyboardType="numeric"
              value={data}
              onChangeText={telaData}
            />
            {errors.data && <Text style={style.errorText}>{errors.data}</Text>}

            <TextInput
              style={style.input}
              placeholder="Idade (em meses)"
              keyboardType="numeric"
              value={idade}
              onChangeText={setIdade}
            />
            {errors.idade && (
              <Text style={style.errorText}>{errors.idade}</Text>
            )}

            <TextInput
              style={style.input}
              placeholder="Peso (em kg)"
              keyboardType="numeric"
              value={peso}
              onChangeText={setPeso}
            />
            {errors.peso && <Text style={style.errorText}>{errors.peso}</Text>}

            <View style={style.pesoModal}>
              <TouchableOpacity
                style={style.buttonPeso}
                onPress={() => setEditmodal(false)}
              >
                <Text style={style.textStyle}>Cancelar</Text>
              </TouchableOpacity>
              <TouchableOpacity style={style.buttonPeso} onPress={editarPeso}>
                <Text style={style.textStyle}>Salvar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Modal para Confirmar Exclusão */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={apagarmodal}
        onRequestClose={() => setApagarmodal(false)}
      >
        <View style={style.centeredView}>
          <View style={style.modalView}>
            <Text style={style.modalText}>
              Deseja realmente excluir este Peso?
            </Text>
            <View style={style.btnview}>
              <TouchableOpacity
                style={style.buttonPeso}
                onPress={() => setApagarmodal(false)}
              >
                <Text style={style.textStyle}>Cancelar</Text>
              </TouchableOpacity>
              <TouchableOpacity style={style.buttonPeso} onPress={apagarPeso}>
                <Text style={style.textStyle}>Confirmar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}
