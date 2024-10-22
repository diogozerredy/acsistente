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
import uuid from "react-native-uuid";
import * as SplashScreen from "expo-splash-screen";
import Icones from "@expo/vector-icons/FontAwesome5";
import AntDesign from "@expo/vector-icons/AntDesign";
import { Lato_400Regular } from "@expo-google-fonts/lato";
import { useFonts } from "expo-font";
import style from "./style/style.js";
import Crianca from "./src/componentes/crianca.js";
import Vacina from "./src/componentes/vacina.js";
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
  const [dataNascimento, setDataNascimento] = useState("");

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
      errors.nomeCrianca = "*nome é obrigatório";
      validar = false;
    }
    if (!dataNascimento) {
      errors.dataNascimento = "*data de nascimento é obrigatório";
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
        errors.dataNascimento = "*Data de Nascimento é errada";
        validar = false;
      } else if (dnValidar && dnValidar.getTime() >= new Date().getTime()) {
        errors.dataNascimento = "*Data de Nascimento é inválida";
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
    if (!local) {
      errors.local = "*campo Obrigatorio";
      validar = false;
    }
    if (!lote) {
      errors.lote = "*campo Obrigatorio";
      validar = false;
    }
    if (!tecnico) {
      errors.tecnico = "*campo Obrigatorio";
      validar = false;
    }
    setErrors(errors);
    return validar;
  };

  function telaAddDose() {
    if (!validarInputvacina()) {
      return;
    }
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
      <View style={[style.Home, style.container]}>
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
        <View style={[style.content, style.contenthome]}>
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
          style={[style.botao, style.btncadastrar]}
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
                    <AntDesign name="delete" size={35} color="black" />
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
            setEstado("addVacina");
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
