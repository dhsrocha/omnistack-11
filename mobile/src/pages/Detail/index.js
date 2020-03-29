import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import logo from "../../assets/logo.png";
import styles from "./styles";
import { composeAsync } from "expo-mail-composer";

export default function Detail() {
  // Hooks
  const navigation = useNavigation();

  // Handlers
  const goBack = () => navigation.goBack();

  const sendEmail = () => {
    composeAsync({
      subject: "Heroi do caso: Cadelinha atropelada.",
      recipients: ["dhsrocha@gmail.com"],
      body:
        `Olá ACAD, estou entrando em contato pois queria ajudar no caso ` +
        `cadelinha atropelada" com o valor de R$ 120,00.`
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={logo} />

        <TouchableOpacity //
          style={styles.detailsButton}
          onPress={goBack}
        >
          <Feather name="arrow-left" size={30} color="#E02041" />
        </TouchableOpacity>
      </View>

      <View style={styles.incident}>
        <Text style={styles.incidentProperty}>ONG</Text>
        <Text style={styles.incidentValue}>APAD</Text>

        <Text style={styles.incidentProperty}>CASO:</Text>
        <Text style={styles.incidentValue}>Cadelinha atropelada</Text>

        <Text style={styles.incidentProperty}>VALOR:</Text>
        <Text style={styles.incidentValue}>R$ 120,00</Text>
      </View>

      <View style={styles.contactBox}>
        <Text style={styles.heroTitle}>Salve o Dia!</Text>
        <Text style={styles.heroTitle}>Seja o heroi desse caso.</Text>

        <Text style={styles.heroDescription}>Entre em contato:</Text>

        <View style={styles.actions}>
          <TouchableOpacity //
            style={styles.action}
            onPress={() => {}}
          >
            <Text style={styles.actionText}>Whatsapp</Text>
          </TouchableOpacity>
          <TouchableOpacity //
            style={styles.action}
            onPress={sendEmail}
          >
            <Text style={styles.actionText}>E-mail</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
