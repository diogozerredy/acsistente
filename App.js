import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  TextInput,
  Button,
  TouchableOpacity,
  ScrollView,
  Modal,
  TouchableHighlight,
} from "react-native";
import uuid from "react-native-uuid";
import * as SplashScreen from "expo-splash-screen";
import Icones from "@expo/vector-icons/FontAwesome5";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import AntDesign from "@expo/vector-icons/AntDesign";
import { Lato_400Regular } from "@expo-google-fonts/lato";
import { useFonts } from "expo-font";
import style from "./style/style.js";
import Crianca from "./src/objetos/crianca.js";
import Vacina from "./src/objetos/vacina.js";
/* NAVEGACAO
  "home"
  "telaCadastro"
  "cadastrados"
  "editarCrianca"
  "crianca"
  "verVacina"
  "addVacina"
  
*/
SplashScreen.preventAutoHideAsync();
export default function App() {
  const [loaded, error] = useFonts({ Lato_400Regular });

  const [modal, setModal] = useState(false);

  const [estado, setEstado] = useState("home");
  const [criancas, setCriancas] = useState([]);
  const [nomeCrianca, setNomeCrianca] = useState("");
  const [dataNascimento, setDataNascimento] = useState("");

  const [criancaSelecionada, setCriancaSelecionada] = useState(null);

  const [VacinaSelecionada, setVacinaSelecionada] = useState(null);
  const [VacinaAdicionada, setVacinaAdicionada] = useState("");
  const [local, setLocal] = useState("");
  const [lote, setLote] = useState("");
  const [tecnico, setTecnico] = useState("");
  const [data, setData] = useState("");
  const [Todasvacinas] = useState([
    new Vacina("BCG", "DoseUnica", "Ao Nascer"),
    new Vacina("Hepatite B", "Dose ao Nascer"),

    new Vacina("Penta", "Dose1", 2),
    new Vacina("VIP", "Dose1", 2),
    new Vacina("Rotavírus humano", "Dose1", 2),
    new Vacina("Pneumocócica 10V", "Dose1", 2),

    new Vacina("Meningocócica C", "Dose1", 3),

    new Vacina("Penta", "Dose2", 4),
    new Vacina("VIP", "Dose2", 4),
    new Vacina("Rotavírus humano", "Dose2", 4),
    new Vacina("Pneumocócica 10V", "Dose2", 4),

    new Vacina("Meningocócica C", "Dose2", 5),

    new Vacina("Penta", "Dose3", 6),
    new Vacina("VIP", "Dose3", 6),

    new Vacina("Febre Amarela", "Dose1", 9),

    new Vacina("Pneumocócica 10V", "Reforço", 12),
    new Vacina("Meningocócica C", "Reforço", 12),
    new Vacina("Tríplice viral", "Dose1", 12),
    new Vacina("Tríplice viral", "Dose2", 15),

    new Vacina("DTP", "1°Reforço", 15),
    new Vacina("VOP", "1°Reforço", 15),
    new Vacina("Hepatite A", "UmaDose", 15),
    new Vacina("Treta Viral", "UmaDose", 15),

    new Vacina("DTP", "2°Reforço", 48),
    new Vacina("VOP", "2°Reforço", 48),
    new Vacina("Febre Amarela", "Dose1", 48),
    new Vacina("Varicela", "UmaDose", 48),
  ]);
  const [message, setMessage] = useState("");
  const [mensagemVacina, setmensagemVacina] = useState([]);

  const [errors, setErrors] = useState({});

  function removerPorId(id) {
    const newcriancas = criancas.filter(function (val) {
      return val.id !== id;
    });
    setCriancas(newcriancas);
  }
  const Editar = () => {
    if (!validarInput()) {
      return;
    }
    criancaSelecionada.nomeCrianca = nomeCrianca;
    criancaSelecionada.dataNascimento = dataNascimento;
    setMessage(`Cadastro Alterado com sucesso!`);
  };
  const telaDataNascimento = (value) => {
    const formatoData = value
      .replace(/\D/g, "")
      .replace(/(\d{2})(\d)/, "$1/$2")
      .replace(/(\d{2})(\d)/, "$1/$2");
    setDataNascimento(formatoData);
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

  function telaCadastrarCrianca() {
    if (!validarInput()) {
      return;
    }
    const novaCrianca = new Crianca(nomeCrianca, dataNascimento);
    novaCrianca.id = uuid.v4();
    novaCrianca.vacinas = Todasvacinas;
    setCriancas([...criancas, novaCrianca]);
    setMessage(`${nomeCrianca} cadastrada com sucesso!`);
    setNomeCrianca("");
    setDataNascimento("");
  }
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

  const validarInputvacina = () => {
    let validar = true;
    let errors = {};
    if (!data) {
      errors.data = "*campo Obrigatorio";
      validar = false;
    }

    if (!lote) {
      errors.lote = "*campo Obrigatorio";
      validar = false;
    }

    setErrors(errors);
    return validar;
  };

  function telaAddDose() {
    if (!validarInputvacina()) {
      return;
    }
    let dose = {
      local,
      lote,
      tecnico,
      data,
    };
    const vacinaEncontrada = criancaSelecionada.vacinas.find(
      (v) =>
        v.nome === VacinaSelecionada.nome && v.dose === VacinaSelecionada.dose
    );
    if (vacinaEncontrada) {
      vacinaEncontrada.adicionarDose(dose);
    }
    setCriancas([...criancas]);
    setMessage(`Vacina ${VacinaSelecionada.nome} adicionada com sucesso!`);
    setmensagemVacina([...mensagemVacina, VacinaSelecionada]);
    setVacinaAdicionada("");
    setLocal("");
    setLote("");
    setTecnico("");
    setData("");
  }

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }

  if (estado === "home") {
    return (
      <View style={[style.Home, style.container]}>
        <Modal
          animationType="none"
          transparent={true}
          visible={modal}
          onRequestClose={() => {
            setModal(!modal);
          }}
        >
          <View style={style.modalView}>
            <View
              style={{
                width: "100%",
                backgroundColor: "blue",
                flexDirection: "row",
                alignItems: "center",
                padding: 15,
                justifyContent: "space-between",
              }}
            >
              <Text>HOME</Text>
              <TouchableOpacity
                style={{
                  backgroundColor: "white",
                  width: 50,
                  height: 50,
                  alignItems: "center",
                  justifyContent: "center",
                }}
                onPress={() => setModal(!modal)}
              >
                <AntDesign name="close" size={24} color="black" />
              </TouchableOpacity>
            </View>
            <Text style={style.modalText}>Hello World!</Text>
            <TouchableHighlight
              style={[style.button, style.buttonClose]}
              onPress={() => {
                setEstado("telaCadastro");
                setModal(!modal);
              }}
            >
              <Text style={style.textStyle}>OK</Text>
            </TouchableHighlight>
          </View>
        </Modal>
        <View style={style.acsistente}>
          <Text style={[style.texto, { fontSize: 25 }]}>ACSISTENTE</Text>
        </View>
        <TouchableOpacity style={style.hambr} onPress={() => setModal(true)}>
          <FontAwesome name="navicon" size={30} color="#ffffff" />
        </TouchableOpacity>
        <View style={[style.content, style.contenthome]}>
          <TouchableOpacity
            style={[style.botao, style.cadastros]}
            onPress={() => setEstado("cadastrados")}
          >
            <Icones
              style={{ textAlign: "center" }}
              name="users"
              size={60}
              color="#26A20A"
            />
            <Text style={style.btntexto}>CADASTROS</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[style.botao, style.cadastros]}
            onPress={() => setEstado("cadastrados")}
          >
            <Icones
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
          style={[style.botao, style.btncadastrar]}
          onPress={() => setEstado("telaCadastro")}
        >
          <Text style={[style.texto, { fontSize: 17 }]}>CADASTRAR CRIANÇA</Text>
        </TouchableOpacity>
      </View>
    );
  } else if (estado === "telaCadastro") {
    return (
      <View style={style.container}>
        <TextInput
          placeholder="Nome da Criança"
          onChangeText={(nomeCrianca) => setNomeCrianca(nomeCrianca)}
          style={{ borderBottomWidth: 1, marginBottom: 5 }}
        />
        {errors.nomeCrianca && (
          <Text style={style.error}>{errors.nomeCrianca}</Text>
        )}
        <TextInput
          maxLength={10}
          value={dataNascimento}
          keyboardType="numeric"
          placeholder="Data de Nascimento (DD/MM/AAAA)"
          onChangeText={telaDataNascimento}
          style={{ borderBottomWidth: 1, marginBottom: 5 }}
        />

        {errors.dataNascimento && (
          <Text style={style.error}>{errors.dataNascimento}</Text>
        )}
        <Button title="Salvar" onPress={telaCadastrarCrianca} />
        <Button
          title="Voltar"
          onPress={() => {
            setEstado("home");
            setMessage("");
            setErrors(() => (errors.nomeCrianca = false));
            setErrors(() => (errors.dataNascimento = false));
          }}
        />
        <Text>{message}</Text>
      </View>
    );
  } else if (estado === "cadastrados") {
    return (
      <View style={style.container}>
        <Text style={[style.acsistente, style.texto]}>ACSISTENTE</Text>
        <ScrollView style={style.content}>
          {criancas.map((item) => {
            return (
              <TouchableOpacity
                key={item.id}
                style={{
                  justifyContent: "center",
                  alignContent: "center",
                  backgroundColor: `#ffffff`,
                  width: "95%",
                  marginTop: 15,
                  marginHorizontal: "2%",
                  borderRadius: 5,
                }}
                onPress={() => {
                  setCriancaSelecionada(item);
                  setEstado("crianca");
                }}
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
                    {`\n`}Dn: {item.dataNascimento}
                  </Text>
                  <TouchableOpacity onPress={() => removerPorId(item.id)}>
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
          style={[style.botao, style.btncadastrar]}
          onPress={() => setEstado("home")}
        >
          <Text style={style.texto}>VOLTAR</Text>
        </TouchableOpacity>
      </View>
    );
  } else if (estado === "crianca") {
    return (
      <View style={style.container}>
        <Text>Nome: {criancaSelecionada.nomeCrianca}</Text>
        <Text>Data de Nascimento: {criancaSelecionada.dataNascimento}</Text>
        <Button
          title="Adicionar Vacina"
          onPress={() => {
            setEstado("selecionarVacina");
            setMessage("");
            setmensagemVacina([]);
          }}
        />
        <Button title="Ver Vacinas" onPress={() => setEstado("verVacina")} />
        <Button
          title="Editar"
          onPress={() => {
            setEstado("editarCrianca");
            setDataNascimento("");
            setNomeCrianca("");
          }}
        />
        <Button title="Voltar ao Início" onPress={() => setEstado("home")} />
      </View>
    );
  } else if (estado === "selecionarVacina") {
    return (
      <View style={style.container}>
        <Text style={[style.acsistente, style.texto]}>ACSISTENTE</Text>
        <ScrollView style={style.content}>
          {criancaSelecionada.vacinas.map((item) => {
            return (
              <TouchableOpacity
                key={item.id}
                style={{
                  justifyContent: "center",
                  alignContent: "center",
                  backgroundColor: `#ffffff`,
                  width: "95%",
                  marginTop: 15,
                  marginHorizontal: "2%",
                  borderRadius: 5,
                }}
                onPress={() => {
                  setVacinaSelecionada(item);
                  setEstado("addVacina");
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Text style={{ padding: 15, fontSize: 17 }}>
                    Nome: {item.nome} {item.dose}
                    {"\n"}
                    Idade: {item.idade} {"\n"}
                    {item.id}
                  </Text>
                  <TouchableOpacity onPress={() => removerPorId(item.id)}>
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
          style={[style.botao, style.btncadastrar]}
          onPress={() => setEstado("home")}
        >
          <Text style={style.texto}>VOLTAR</Text>
        </TouchableOpacity>
      </View>
    );
  } else if (estado === "addVacina") {
    return (
      <View style={style.container}>
        <TextInput
          dataDetectorTypes={"calendarEvent"}
          placeholder="Data"
          value={data}
          onChangeText={setData}
          style={{ borderBottomWidth: 1, marginBottom: 10 }}
        />
        {errors.data && <Text style={style.error}>{errors.data}</Text>}
        <TextInput
          placeholder="Local"
          value={local}
          onChangeText={setLocal}
          style={{ borderBottomWidth: 1, marginBottom: 10 }}
        />
        {errors.local && <Text style={style.error}>{errors.local}</Text>}
        <TextInput
          placeholder="Lote"
          value={lote}
          onChangeText={setLote}
          style={{ borderBottomWidth: 1, marginBottom: 10 }}
        />
        {errors.lote && <Text style={style.error}>{errors.lote}</Text>}
        <TextInput
          placeholder="Técnico"
          value={tecnico}
          onChangeText={setTecnico}
          style={{ borderBottomWidth: 1, marginBottom: 10 }}
        />
        {errors.tecnico && <Text style={style.error}>{errors.tecnico}</Text>}
        <Button title="Adicionar Dose" onPress={telaAddDose} />
        <Button
          title="Voltar"
          onPress={() => {
            setEstado("crianca");
            setMessage("");
          }}
        />
        <Button title="Voltar ao Início" onPress={() => setEstado("home")} />
        {message && <Text>{message}</Text>}
        {/* {mensagemVacina.map((item) => {
          return <Text>Vacina: {item}</Text>;
        })} */}
      </View>
    );
  } else if (estado === "verVacina") {
    return (
      <ScrollView style={style.container}>
        {criancaSelecionada.vacinas.length > 0 ? (
          criancaSelecionada.vacinas.map((vacina) => (
            <View
              style={{
                marginTop: 20,
                borderWidth: 1,
                borderColor: "blue",
              }}
              key={vacina.id}
            >
              <Text style={{ fontSize: 20 }}>Nome: {vacina.nome}</Text>
              {/* Acesso às propriedades da vacina individualmente */}
              {vacina.doses.length > 0 ? (
                vacina.doses.map((dose, i) => (
                  <View key={i}>
                    <Text>Data: {dose.data}</Text>
                    <Text>Local: {dose.local}</Text>
                    <Text>Lote: {dose.lote}</Text>
                    <Text>Técnico: {dose.tecnico}</Text>
                  </View>
                ))
              ) : (
                <Text>Nenhuma dose aplicada</Text>
              )}
            </View>
          ))
        ) : (
          <Text>Nenhuma vacina adicionada</Text>
        )}
        <View style={{ marginTop: 10 }}>
          <Button title="Voltar" onPress={() => setEstado("crianca")} />
        </View>
      </ScrollView>
    );
  } else if (estado === "editarCrianca") {
    return (
      <View style={style.container}>
        <TextInput
          placeholder="Nome da Criança"
          onChangeText={(nomeCrianca) => setNomeCrianca(nomeCrianca)}
          style={{ borderBottomWidth: 1, marginBottom: 5 }}
        />
        {errors.nomeCrianca && (
          <Text style={style.error}>{errors.nomeCrianca}</Text>
        )}
        <TextInput
          maxLength={10}
          value={dataNascimento}
          keyboardType="numeric"
          placeholder="Data de Nascimento DD/MM/AAAA"
          onChangeText={telaDataNascimento}
          style={{ borderBottomWidth: 1, marginBottom: 5 }}
        />

        {errors.dataNascimento && (
          <Text style={style.error}>{errors.dataNascimento}</Text>
        )}
        <Button title="Salvar" onPress={Editar} />
        <Button
          title="Voltar"
          onPress={() => {
            setEstado("crianca");
            setMessage("");
          }}
        />
        <Text>{message}</Text>
      </View>
    );
  }
}
