import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  Button,
  Modal,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import style from "../../style/style";

export default function VerPesos({ route }) {
  const { crianca } = route.params;
  const [pesos, setPesos] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [data, setData] = useState("");
  const [idade, setIdade] = useState("");
  const [peso, setPeso] = useState("");

  // Carrega os pesos do AsyncStorage ao abrir a tela
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

  // Função para salvar pesos no AsyncStorage
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

  // Função para adicionar um novo peso
  const adicionarPeso = () => {
    const novoPeso = { data, idade, peso: parseFloat(peso) };
    const novosPesos = [...pesos, novoPeso];
    setPesos(novosPesos);
    salvarPesos(novosPesos); // Salva os novos pesos no AsyncStorage
    setData("");
    setIdade("");
    setPeso("");
    setModalVisible(false);
  };

  return (
    <SafeAreaView style={style.container}>
      <ScrollView>
        <Text style={style.title}>Pesos de {crianca.nomeCrianca}</Text>

        {pesos.length > 0 ? (
          pesos.map((peso, index) => (
            <View key={index} style={style.pesoItem}>
              <Text style={style.pesoText}>Data: {peso.data}</Text>
              <Text style={style.pesoText}>Idade: {peso.idade} meses</Text>
              <Text style={style.pesoText}>Peso: {peso.peso} kg</Text>
            </View>
          ))
        ) : (
          <Text style={style.noDataText}>Nenhum peso registrado.</Text>
        )}

        <TouchableOpacity
          style={style.addButton}
          onPress={() => setModalVisible(true)}
        >
          <Text style={style.addButtonText}>Adicionar Peso</Text>
        </TouchableOpacity>
      </ScrollView>

      <Modal visible={modalVisible} animationType="slide" transparent={true}>
        <View style={style.modalContainer}>
          <View style={style.modalContent}>
            <Text style={style.modalTitle}>Adicionar Peso</Text>

            <TextInput
              style={style.input}
              placeholder="Data (DD/MM/AAAA)"
              value={data}
              onChangeText={setData}
            />
            <TextInput
              style={style.input}
              placeholder="Idade (em meses)"
              keyboardType="numeric"
              value={idade}
              onChangeText={setIdade}
            />
            <TextInput
              style={style.input}
              placeholder="Peso (em kg)"
              keyboardType="numeric"
              value={peso}
              onChangeText={setPeso}
            />

            <Button title="Salvar" onPress={adicionarPeso} />
            <Button
              title="Cancelar"
              color="red"
              onPress={() => setModalVisible(false)}
            />
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}
