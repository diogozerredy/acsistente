import React, { useState, useEffect } from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SafeAreaView } from "react-native-safe-area-context";
import style from "../../style/style";

export default function VerVacinas({ route, navigation }) {
  const { crianca, novaVacina, doseAtualizada } = route.params || {};
  const [vacinas, setVacinas] = useState([]);
  const [outrasVacinas, setOutrasVacinas] = useState(null);

  useEffect(() => {
    const carregarVacinas = async () => {
      try {
        const vacinasSalvas = await AsyncStorage.getItem(
          `vacinas_${crianca.id}`
        );
        if (vacinasSalvas) {
          console.log("Vacinas carregadas do AsyncStorage:", vacinasSalvas);
          setVacinas(JSON.parse(vacinasSalvas));
        } else {
          console.log(
            "Nenhuma vacina encontrada no AsyncStorage. Usando vacinas padrão."
          );
          setVacinas(crianca.vacinas);
        }
      } catch (error) {
        console.error("Erro ao carregar vacinas:", error);
      }
    };
    carregarVacinas();
  }, []);

  // Atualizar e salvar novas vacinas
  useEffect(() => {
    if (novaVacina) {
      setVacinas((prevVacinas) => {
        const vacinasAtualizadas = [...prevVacinas, novaVacina];
        salvarVacinasAsync(vacinasAtualizadas);
        return vacinasAtualizadas;
      });
    }
  }, [novaVacina]);

  // Atualizar e salvar dose editada
  useEffect(() => {
    if (doseAtualizada) {
      setVacinas((prevVacinas) => {
        const vacinasAtualizadas = prevVacinas.map((vacina) =>
          vacina.id === doseAtualizada.id ? doseAtualizada : vacina
        );
        salvarVacinasAsync(vacinasAtualizadas);
        return vacinasAtualizadas;
      });
    }
  }, [doseAtualizada]);

  const salvarVacinasAsync = async (vacinasParaSalvar) => {
    try {
      await AsyncStorage.setItem(
        `vacinas_${crianca.id}`,
        JSON.stringify(vacinasParaSalvar)
      );
      console.log("Vacinas salvas no AsyncStorage:", vacinasParaSalvar);
    } catch (error) {
      console.error("Erro ao salvar vacinas no AsyncStorage:", error);
    }
  };

  useEffect(() => {
    const encontrarOutrasVacinas = () => {
      const vacinaEncontrada = vacinas.find(
        (vacina) => vacina.id === "outras_Vacinas"
      );
      setOutrasVacinas(vacinaEncontrada);
    };

    encontrarOutrasVacinas();
  }, [vacinas]);

  const agruparVacinasPorIdadeEDose = (vacinas) => {
    const grupos = {};
    vacinas.forEach((vacina) => {
      if (vacina.id !== "outras_Vacinas") {
        const chave = `${vacina.idade} - ${vacina.dose}`;
        if (!grupos[chave]) {
          grupos[chave] = [];
        }
        grupos[chave].push(vacina);
      }
    });
    return grupos;
  };

  const formatarIdade = (idade) => {
    if (idade === "Ao Nascer") return "Ao Nascer";
    if (idade >= 48) return "4 Anos";
    if (idade >= 12) {
      const anos = Math.floor(idade / 12);
      const meses = idade % 12;
      return `${anos} Ano${anos > 1 ? "s" : ""}${
        meses ? ` ${meses} Meses` : ""
      }`;
    }
    return `${idade} meses`;
  };

  const gruposVacinas = agruparVacinasPorIdadeEDose(vacinas);

  const handleEditVacina = (vacina) => {
    navigation.navigate("OutrasVacinas", {
      criancaId: crianca.id,
      vacina,
      isEditing: true,
    });
  };
  return (
    <SafeAreaView style={[style.container, { paddingBottom: 30 }]}>
      <ScrollView>
        {Object.keys(gruposVacinas).length > 0 ? (
          Object.keys(gruposVacinas).map((chave) => {
            const [idade, dose] = chave.split(" - ");
            const idadeFormatada = formatarIdade(
              idade === "Ao Nascer" ? idade : parseInt(idade, 10)
            );
            return (
              <View key={chave}>
                <Text style={style.idadevcn}>
                  Vacina {idadeFormatada} - {dose}
                </Text>
                {gruposVacinas[chave].map((vacina, index) => (
                  <TouchableOpacity
                    key={index}
                    onPress={() =>
                      navigation.navigate("AdicionarDose", { vacina })
                    }
                    style={style.tabvcn}
                  >
                    <View style={{ borderWidth: 1, gap: 5, padding: 5 }}>
                      <Text style={style.titlevcn}>{vacina.nome}</Text>
                      <Text style={style.descvcn}>
                        Data:{" "}
                        <Text style={{ fontWeight: "bold" }}>
                          {vacina.data}
                        </Text>
                      </Text>
                      <Text style={style.descvcn}>
                        Local:{" "}
                        <Text style={{ fontWeight: "bold" }}>
                          {vacina.local}
                        </Text>
                      </Text>
                      <Text style={style.descvcn}>
                        Lote:{" "}
                        <Text style={{ fontWeight: "bold" }}>
                          {vacina.lote}
                        </Text>
                      </Text>
                      <Text style={style.descvcn}>
                        Técnico:{" "}
                        <Text style={{ fontWeight: "bold" }}>
                          {vacina.tecnico}
                        </Text>
                      </Text>
                    </View>
                  </TouchableOpacity>
                ))}
              </View>
            );
          })
        ) : (
          <Text>Nenhuma vacina adicionada</Text>
        )}

        {outrasVacinas ? (
          <View>
            <Text style={style.idadevcn}>Outras Vacinas</Text>
            <TouchableOpacity
              style={style.tabvcn}
              onPress={() => navigation.navigate("OutrasVacinas")}
            >
              <View style={{ borderWidth: 1, gap: 5, padding: 5 }}>
                <Text style={style.titlevcn}>{outrasVacinas.nome}</Text>
                <Text style={style.descvcn}>
                  Data:{" "}
                  <Text style={{ fontWeight: "bold" }}>
                    {outrasVacinas.data}
                  </Text>
                </Text>
                <Text style={style.descvcn}>
                  Local:{" "}
                  <Text style={{ fontWeight: "bold" }}>
                    {outrasVacinas.local}
                  </Text>
                </Text>
                <Text style={style.descvcn}>
                  Lote:{" "}
                  <Text style={{ fontWeight: "bold" }}>
                    {outrasVacinas.lote}
                  </Text>
                </Text>
                <Text style={style.descvcn}>
                  Técnico:{" "}
                  <Text style={{ fontWeight: "bold" }}>
                    {outrasVacinas.tecnico}
                  </Text>
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        ) : (
          <Text>Vacina 'Outras Vacinas' não encontrada.</Text>
        )}
        {novaVacina && (
          <View>
            <Text style={style.idadevcn}>Nova Vacina Adicionada</Text>
            <TouchableOpacity
              style={style.tabvcn}
              onPress={() => handleEditVacina(novaVacina)}
            >
              <View style={{ borderWidth: 1, gap: 5, padding: 5 }}>
                <Text style={style.titlevcn}>{novaVacina.nome}</Text>
                <Text style={style.descvcn}>
                  Data:{" "}
                  <Text style={{ fontWeight: "bold" }}>{novaVacina.data}</Text>
                </Text>
                <Text style={style.descvcn}>
                  Local:{" "}
                  <Text style={{ fontWeight: "bold" }}>{novaVacina.local}</Text>
                </Text>
                <Text style={style.descvcn}>
                  Lote:{" "}
                  <Text style={{ fontWeight: "bold" }}>{novaVacina.lote}</Text>
                </Text>
                <Text style={style.descvcn}>
                  Técnico:{" "}
                  <Text style={{ fontWeight: "bold" }}>
                    {novaVacina.tecnico}
                  </Text>
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
