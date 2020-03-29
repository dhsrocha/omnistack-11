import React from "react";
import { View, Image, Text } from "react-native";
import styles from "./styles";
import logo from "../../assets/logo.png";

export default function Incident() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={logo} />
        <Text style={styles.container}>
          Total de <Text styles={styles.headerTextBold}>0 casos</Text>.
        </Text>
      </View>

      <Text style={styles.title}>Bem vindo!</Text>
      <Text style={styles.description}>
        Escolha um dos casos abaixo e salve o dia.
      </Text>

    </View>
  );
}
