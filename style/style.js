import { StyleSheet } from "react-native";
import Constants from "expo-constants";

export default StyleSheet.create({
  //HOME
  Home: {
    gap: 30,
    alignItems: "center",
  },
  container: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: "#f5f5f5",
    flex: 1,
  },
  content: {
    maxHeight: "78%",
    backgroundColor: "#f5f5f5",
    gap: 20,
  },
  contenthome: {
    flexDirection: "row",
  },
  texto: {
    color: "#FFFFFF",
    textAlign: "center",
    fontFamily: "Lato_400Regular",
    fontSize: 17,
  },
  acsistente: {
    marginTop: 10,
    fontSize: 25,
    backgroundColor: "#26A20A",
    width: "100%",
    padding: 30,
    zIndex: 5,
  },
  //home botoes
  botao: {
    alignContent: "center",
    justifyContent: "center",
    gap: 20,
    borderRadius: 8,
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 4.65,
    elevation: 8,
    backgroundColor: "#26A20A",
  },
  btncadastrar: {
    position: "absolute",
    right: 21,
    bottom: 15,
    width: "90%",
    padding: 17,
  },
  cadastros: {
    width: 170,
    height: 170,
  },
  msg: {
    borderRadius: 15,
    marginVertical: 50,
    backgroundColor: "#26A20A",
    color: "#ffffff",
    fontFamily: "Lato_400Regular",
    fontSize: 20,
    padding: 15,
    textAlign: "justify",
  },
  //modal
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
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
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
  //erros
  error: {
    marginBottom: 10,
    color: "red",
  },
});
