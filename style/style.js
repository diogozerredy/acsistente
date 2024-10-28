import { StyleSheet } from "react-native";

export default StyleSheet.create({
  //HOME
  Home: {
    gap: 30,
    alignItems: "center",
  },
  container: {
    backgroundColor: "#f0f0f0",
    flex: 1,
  },
  acsistente: {
    justifyContent: "center",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#26A20A",
    width: "100%",
    padding: 30,
    zIndex: 2,
  },

  content: {
    gap: 20,
  },
  contenthome: {
    flexDirection: "row",
    marginTop: 50,
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
    gap: 20,
    borderRadius: 8,
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 4.65,
    elevation: 8,
    backgroundColor: "#ffffff",
  },
  btncadastrar: {
    position: "absolute",
    right: 21,
    bottom: 15,
    width: "90%",
    padding: 50,
    backgroundColor: "#26A20A",
  },
  cadastros: {
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
  //modal
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
    width: "75%",
    height: "100%",
    position: "absolute",
    left: 0,
    top: 0,
    backgroundColor: "white",
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
