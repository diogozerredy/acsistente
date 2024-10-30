import { StyleSheet } from "react-native";

export default StyleSheet.create({
  //HOME
  Home: {
    gap: 30,
  },
  container: {
    backgroundColor: "#f0f0f0",
    flex: 1,
  },

  content: {
    gap: 15,
    backgroundColor: "#f0f0f0",
  },
  contenthome: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  texto: {
    color: "#FFFFFF",
    textAlign: "center",
    fontFamily: "Lato_400Regular",
  },
  btntexto: {
    color: "#26A20A",
    textAlign: "center",
    fontFamily: "Lato_400Regular",
    fontSize: 17,
  },
  botao: {
    alignContent: "center",
    justifyContent: "center",
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 4.65,
    elevation: 8,
    backgroundColor: "#ffffff",
  },
  btncadastrar: {
    flexDirection: "row",
    alignItems: "center",
    position: "absolute",
    right: 21,
    bottom: 15,
    width: "90%",
    padding: 20,
    backgroundColor: "#26A20A",
    gap: 20,
    borderRadius: 8,
  },
  cadastros: {
    borderRadius: 10,
    width: 170,
    height: 170,
  },
  msg: {
    borderRadius: 15,
    marginVertical: 50,
    color: "#26A20A",
    fontFamily: "Lato_400Regular",
    fontSize: 20,
    padding: 15,
    textAlign: "justify",
  },
  //LISTAR CRIANCA
  Lista: {
    borderWidth: 0.5,
    borderColor: "#26A20A",
    justifyContent: "center",
    alignContent: "center",
    backgroundColor: "#ffffff",
    width: "95%",
    marginBottom: 15,
    marginHorizontal: "2%",
    borderRadius: 5,
  },
  nomeLista: { fontWeight: "bold", fontSize: 16 },
  textoLista: { fontSize: 15, lineHeight: 20 },
  apagar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  btnListar: {
    alignItems: "center",
    opacity: 0.9,
    borderRadius: 75,
    width: 60,
    height: 60,
    backgroundColor: "#26A20A",
  },
  // CADASTRO
  viewinput: { padding: 7, height: "100%", justifyContent: "space-between" },
  input: {
    width: "100%",
    borderWidth: 0.7,
    marginTop: 15,
    padding: 10,
    borderRadius: 25,
    borderColor: "#26A20A",
  },
  btnsalvar: {
    borderRadius: 100,
    width: "90%",
    height: 65,
    backgroundColor: "#26A20A",
    marginTop: 20,
    justifyContent: "center",
    marginHorizontal: "5%",
  },
  viewbtn: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginVertical: 50,
  },
  btnav: {
    justifyContent: "center",
    width: 80,
    height: 80,
  },
  cadtexto: {
    textAlign: "center",
    marginTop: 10,
    fontSize: 15,
    fontWeight: "600",
  },
  //tela criancas
  detalhes: { padding: 20 },
  //erros
  error: {
    marginStart: 10,
    marginBottom: 5,
    marginTop: 3,
    color: "red",
  },
  //DetalhesCriancas
  vieweditarinput: {
    borderWidth: 1,
    borderRadius: 25,
    padding: 10,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  confirmar: { flexDirection: "row", gap: 10 },
  editarinput: { width: "80%" },
  //modal
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
    justifyContent: "space-between",
    width: "70%",
    height: 200,
    margin: 20,
    backgroundColor: "#ffffff",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  btnview: {
    flexDirection: "row",
    gap: 5,
  },
  button: {
    borderRadius: 20,
    padding: 5,
    elevation: 2,
    backgroundColor: "#26A20A",
  },
  textStyle: {
    fontSize: 12,
    color: "#FFFFFF",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    fontSize: 17,
  },
});
