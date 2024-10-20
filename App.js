import DateTimePicker from "@react-native-community/datetimepicker";
import { Picker } from "@react-native-picker/picker";
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
import * as SplashScreen from "expo-splash-screen";
import Icones from "@expo/vector-icons/FontAwesome5";
import { Lato_400Regular } from "@expo-google-fonts/lato";
import { useFonts } from "expo-font";
import style from "./style/style.js";
import Crianca from "./componentes/crianca.js";
import Vacina from "./componentes/vacina.js";
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

  const [modal, setModal] = useState(true);

  const [estado, setEstado] = useState("home");
  const [criancas, setCriancas] = useState([]);
  const [nomeCrianca, setNomeCrianca] = useState("");
  const [dataNascimento, setDataNascimento] = useState(new Date());

  const [criancaSelecionada, setCriancaSelecionada] = useState(null);

  const [VacinaAdicionada, setVacinaAdicionada] = useState("");
  const [local, setLocal] = useState("");
  const [lote, setLote] = useState("");
  const [tecnico, setTecnico] = useState("");
  const [data, setData] = useState("");
  const [vacinas] = useState([
    new Vacina("BCG"),
    new Vacina("Hepatite B"),
    new Vacina("Hepatite A"),
    new Vacina("Treta Viral"),
    new Vacina("Penta"),
    new Vacina("VIP"),
    new Vacina("Pneumocócica 10V"),
    new Vacina("Rotavírus humano"),
    new Vacina("Meningocócica C"),
    new Vacina("Tríplice viral"),
    new Vacina("DTP"),
    new Vacina("VOP"),
    new Vacina("Varicela"),
    new Vacina("HPV"),
    new Vacina("Influenza"),
    new Vacina("Febre Amarela"),
  ]);
  const [message, setMessage] = useState("");
  const [mensagemVacina, setmensagemVacina] = useState([]);
  const [modalData, setModalData] = useState(false);

  const [errors, setErrors] = useState({});

  const MostrarInput = () => {
    setModalData(true);
  };
  const selecionar = (evento, dataSelecionada) => {
    const data = dataSelecionada || dataNascimento;
    setModalData(false);
    setDataNascimento(data);
  };

  const Editar = () => {
    criancaSelecionada.nomeCrianca = nomeCrianca;
    criancaSelecionada.dataNascimento = dataNascimento;
    setMessage(`Cadastro Alterado com sucesso!`);
  };
  function telaCadastrarCrianca() {
    if (!validarInput()) {
      return;
    }
    const novaCrianca = new Crianca(nomeCrianca, dataNascimento);
    let id = 1;
    if (criancas.length > 0) id = criancas.length + 1;
    novaCrianca.id = id;
    setCriancas([...criancas, novaCrianca]);
    setMessage(`${nomeCrianca} cadastrada com sucesso!`);
    setDataNascimento(new Date());
    setNomeCrianca("");
    setEstado("telaCadastro");
  }
  const validarInput = () => {
    let validar = true;
    let errors = {};

    /*  validar email
    const emailRegex = /\S+@\S+\.\S+/;
    if (!email) {
      errors.email = "Email é obrigatório";
      validar = false;
    } else if (!emailRegex.test(email)) {
      errors.email = "Email inválido";
      validar = false;
    } */

    if (!nomeCrianca) {
      errors.nomeCrianca = "*nome é obrigatório";
      validar = false;
    }

    setErrors(errors);
    return validar;
  };

  function telaAddDose() {
    const vacina = vacinas.find((v) => v.nome === VacinaAdicionada);
    if (vacina) {
      vacina.adicionarDose({ local, lote, tecnico, data });
      const atualizaCriancas = criancas.map((crianca) => {
        if (crianca === criancaSelecionada) {
          crianca.vacinas.push({
            nome: VacinaAdicionada,
            local,
            lote,
            tecnico,
            data,
          });
        }
        return crianca;
      });
      setCriancas(atualizaCriancas);
      setMessage(`Vacina ${VacinaAdicionada} adicionada com sucesso!`);
      setmensagemVacina([...mensagemVacina, VacinaAdicionada]);
      setVacinaAdicionada("");
      setLocal("");
      setLote("");
      setTecnico("");
      setData("");
    }
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
      <View style={style.containerHome}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modal}
          onRequestClose={() => {
            setModal(!modal);
          }}
        >
          <View style={style.centeredView}>
            <View style={style.modalView}>
              <Text style={style.modalText}>Hello World!</Text>
              <TouchableHighlight
                style={[style.button, style.buttonClose]}
                onPress={() => setModal(!modal)}
              >
                <Text style={style.textStyle}>OK</Text>
              </TouchableHighlight>
            </View>
          </View>
        </Modal>
        <Text style={[style.acsistente, style.texto]}>ACSISTENTE</Text>
        <View style={style.content}>
          <TouchableOpacity
            style={[style.botao, style.cadastros]}
            onPress={() => setEstado("cadastrados")}
          >
            <Icones
              style={{ textAlign: "center" }}
              name="users"
              size={60}
              color="#ffffff"
            />
            <Text style={style.texto}>CADASTROS</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[style.botao, style.cadastros]}
            onPress={() => setEstado("cadastrados")}
          >
            <Icones
              style={{ textAlign: "center" }}
              name="clipboard-list"
              size={60}
              color="#ffffff"
            />
            <Text style={style.texto}>SISTEMATICA</Text>
          </TouchableOpacity>
        </View>
        <Text style={style.msg}>
          TABALHO DE EXTENSAO ESTACIO{"\n"} REACT-NATIVE FEITO POR:{"\n"}{" "}
          ANTONIO DIOGO AMARO DE LIMA
          {"\n"} MATRICULA: 202204176181
        </Text>

        <TouchableOpacity
          style={[style.botao, style.cadastrar]}
          onPress={() => setEstado("telaCadastro")}
        >
          <Text style={style.texto}>CADASTRAR CRIANÇA</Text>
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
        <View>
          <TouchableOpacity
            style={[
              style.botao,
              {
                marginBottom: 5,
                padding: 15,
                flexDirection: "row",
              },
            ]}
            onPress={MostrarInput}
          >
            <Text style={[style.texto, { marginTop: 4 }]}>
              SELECIONE A DATA DE NASCIMENTO{""}
            </Text>
            <Icones name="calendar-plus" size={20} color="white" />
          </TouchableOpacity>
          {modalData && (
            <DateTimePicker
              testID="dateTimePicker"
              value={dataNascimento}
              mode="date"
              display="default"
              onChange={selecionar}
            />
          )}
        </View>
        <Button title="Salvar" onPress={telaCadastrarCrianca} />
        <Button
          title="Voltar"
          onPress={() => {
            setEstado("home");
            setMessage("");
          }}
        />
        <Text>{message}</Text>
      </View>
    );
  } else if (estado === "cadastrados") {
    return (
      <ScrollView style={style.container}>
        <Text style={[style.acsistente, style.texto]}>ACSISTENTE</Text>
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
              <Text style={{ margin: 15, fontSize: 16 }}>
                Nome: {item.nomeCrianca}
                {`\n`}Dn: {item.dataNascimento.toLocaleDateString("pt-BR")}
                {`\n`}ID: {item.id}
              </Text>
            </TouchableOpacity>
          );
        })}
        <Button title="Voltar" onPress={() => setEstado("home")} />
      </ScrollView>
    );
  } else if (estado === "crianca") {
    return (
      <View style={style.container}>
        <Text>Nome: {criancaSelecionada.nomeCrianca}</Text>
        <Text>
          Data de Nascimento:{" "}
          {criancaSelecionada.dataNascimento.toLocaleDateString("pt-BR")}
        </Text>
        <Text>id: {criancaSelecionada.id}</Text>
        <Button
          title="Adicionar Vacina"
          onPress={() => {
            setEstado("addVacina");
            setMessage("");
            setmensagemVacina([]);
          }}
        />
        <Button title="Ver Vacinas" onPress={() => setEstado("verVacina")} />
        <Button title="Editar" onPress={() => setEstado("editarCrianca")} />
        <Button title="Voltar ao Início" onPress={() => setEstado("home")} />
      </View>
    );
  } else if (estado === "addVacina") {
    return (
      <View style={style.container}>
        <Picker
          selectedValue={VacinaAdicionada}
          onValueChange={(itemValue) => setVacinaAdicionada(itemValue)}
        >
          <Picker.Item label="Selecione uma vacina" value="" />
          {vacinas.map((vacina, index) => (
            <Picker.Item key={index} label={vacina.nome} value={vacina.nome} />
          ))}
        </Picker>
        <TextInput
          placeholder="Data"
          value={data}
          onChangeText={setData}
          style={{ borderBottomWidth: 1, marginBottom: 10 }}
        />
        <TextInput
          placeholder="Local"
          value={local}
          onChangeText={setLocal}
          style={{ borderBottomWidth: 1, marginBottom: 10 }}
        />
        <TextInput
          placeholder="Lote"
          value={lote}
          onChangeText={setLote}
          style={{ borderBottomWidth: 1, marginBottom: 10 }}
        />
        <TextInput
          placeholder="Técnico"
          value={tecnico}
          onChangeText={setTecnico}
          style={{ borderBottomWidth: 1, marginBottom: 10 }}
        />
        <Button title="Adicionar Dose" onPress={telaAddDose} />
        <Button title="Voltar" onPress={() => setEstado("crianca")} />
        <Button title="Voltar ao Início" onPress={() => setEstado("home")} />
        {message && <Text>{message}</Text>}
        {mensagemVacina.map((item) => {
          return <Text>Vacina: {item}</Text>;
        })}
      </View>
    );
  } else if (estado === "verVacina") {
    return (
      <View style={style.container}>
        {criancaSelecionada.vacinas.length > 0 ? (
          criancaSelecionada.vacinas.map((item, index) => {
            return (
              <View
                style={{
                  marginTop: 20,
                  borderWidth: 1,
                  borderColor: "blue",
                }}
                key={index}
              >
                <Text style={{ fontSize: 20 }}>Nome: {item.nome}</Text>
                <Text>Data: {item.data}</Text>
                <Text>Local: {item.local}</Text>
                <Text>Lote: {item.lote}</Text>
                <Text>Técnico: {item.tecnico}</Text>
              </View>
            );
          })
        ) : (
          <Text>Nenhuma vacina adicionada</Text>
        )}
        <View style={{ marginTop: 10 }}>
          <Button title="Voltar" onPress={() => setEstado("crianca")} />
        </View>
      </View>
    );
  } else if (estado === "editarCrianca") {
    return (
      <View style={style.container}>
        <TextInput
          placeholder="Nome da Criança"
          value={nomeCrianca}
          onChangeText={setNomeCrianca}
          style={{ borderBottomWidth: 1, marginBottom: 10 }}
        />
        <TextInput
          placeholder="Data de Nascimento"
          value={dataNascimento}
          onChangeText={setDataNascimento}
          style={{ borderBottomWidth: 1, marginBottom: 10 }}
        />
        <Button title="Salvar" onPress={Editar} />
        <Button
          title="Voltar"
          onPress={() => {
            setEstado("home");
            setMessage("");
          }}
        />
        <Text>{message}</Text>
      </View>
    );
  }
}
