import React, { useState, useRef } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  Keyboard,
} from "react-native";
import api from "./src/services/api";

export default function App() {
  const [cep, setCep] = useState("");
  const inputRef = useRef(null);
  const [cepUser, setCepUser] = useState(null);

  async function buscar() {
    if (cep == "") {
      alert("Digite um cep valido!");
      setCep("");
      return;
    }
    try {
      const response = await api.get(`/${cep}/json`);
      Keyboard.dismiss(); //fecha o teclado
      // console.log(response.data);
      setCepUser(response.data);
    } catch (error) {
      console.log("error:" + error);
    }
  }

  function limpar() {
    setCep("");
    inputRef.current.focus(); //para manter o foco no input apos clicar em limpar
    setCepUser(null);
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ alignItems: "center" }}>
        <Text style={styles.text}>Digite o cep desejado</Text>
        <TextInput
          style={styles.input}
          placeholder="EX 88066297"
          value={cep}
          onChangeText={(texto) => setCep(texto)}
          keyboardType="numeric"
          ref={inputRef}
        />
      </View>
      <View style={styles.areaBTN}>
        <TouchableOpacity
          style={[styles.botao, { backgroundColor: "#1d75cd" }]}
          onPress={buscar}
        >
          <Text style={styles.botaoText}>Buscar</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.botao, { backgroundColor: "#cd3e1d" }]}
          onPress={limpar}
        >
          <Text style={styles.botaoText}>Limpar</Text>
        </TouchableOpacity>
      </View>

      {cepUser && (
        <View style={styles.resultado}>
          <Text style={styles.itemText}>CEP:{cepUser.cep}</Text>
          <Text style={styles.itemText}>Logradouro:{cepUser.logradouro}</Text>
          <Text style={styles.itemText}>Bairro:{cepUser.bairro}</Text>
          <Text style={styles.itemText}>Cidade:{cepUser.localidade}</Text>
          <Text style={styles.itemText}>Estado:{cepUser.uf}</Text>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  text: {
    marginTop: 25,
    marginBottom: 15,
    fontSize: 25,
    fontWeight: "bold",
  },
  input: {
    backgroundColor: "#FFF",
    borderWidth: 1,
    borderColor: "#DDD",
    borderRadius: 9,
    width: "90%",
    padding: 10,
    fontSize: 18,
  },
  areaBTN: {
    alignItems: "center",
    flexDirection: "row",
    marginTop: 15,
    justifyContent: "space-around",
  },
  botao: {
    height: 55,
    width: 95,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 9,
    padding: 10,
  },
  botaoText: {
    fontSize: 22,
    color: "#FFF",
  },
  resultado: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  itemText: {
    fontSize: 22,
  },
});
