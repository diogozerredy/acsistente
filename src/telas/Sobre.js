import { Text, View, ScrollView, TouchableOpacity } from "react-native";
import style from "../../style/style";

export default function Sobre({ navigation }) {
  return (
    <ScrollView Style={style.containersobre}>
      <View style={style.cardsobre}>
        <Text style={style.titlesobre}>Sobre o Projeto</Text>
        <Text style={style.paragrafosobre}>
          Meu nome é{" "}
          <Text style={style.destaquesobre}>ANTONIO DIOGO AMARO DE LIMA</Text> e
          sou estudante da <Text style={style.destaquesobre}>ESTACIO</Text>,
          matrícula <Text style={style.destaquesobre}>202204176181</Text>. Este
          aplicativo é parte do meu projeto de extensão e é totalmente gratuito
          para uso. Estou desenvolvendo com o objetivo de oferecer uma
          ferramenta útil e acessível para todos.
        </Text>
        <Text style={style.paragrafosobre}>
          Devido ao prazo de entrega do trabalho, algumas funcionalidades ainda
          não estarão disponíveis no momento. No entanto, estou comprometido em
          continuar aprimorando o aplicativo e trazer essas novidades em futuras
          atualizações.
        </Text>
        <Text style={style.paragrafosobre}>
          Agradeço imensamente pelo seu interesse e apoio.
        </Text>
        <Text style={style.paragrafosobre}>
          Atenciosamente,
          <Text style={style.destaquesobre}> DIOGO{"\n"}</Text>
        </Text>
        <TouchableOpacity
          style={style.btnretangular}
          onPress={() => navigation.goBack()}
        >
          <Text
            style={{
              color: "#FFFFFF",
              fontSize: 25,
              textAlign: "center",
            }}
          >
            Voltar
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
