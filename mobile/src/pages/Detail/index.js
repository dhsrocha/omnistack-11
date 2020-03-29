import { Feather } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import { composeAsync } from "expo-mail-composer";
import React from "react";
import { Image, Linking, Text, TouchableOpacity, View } from "react-native";
import logo from "../../assets/logo.png";
import styles from "./styles";

export default function Detail() {
  // Hooks
  const navigation = useNavigation();

  const route = useRoute();
  const incident = route.params.incident;

  // Templates
  const message = `Olá ${
    incident.name
  }, estou entrando em contato pois queria ajudar no caso "${
    incident.title
  }" com o valor de R$ ${Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL"
  }).format(incident.value)}.`;

  // Handlers
  const goBack = () => navigation.goBack();

  const sendEmail = () => {
    composeAsync({
      subject: `Heroi do caso: ${incident.title}.`,
      recipients: [incident.email],
      body: message
    });
  };

  const sendWhatsapp = () =>
    Linking.openURL(`whatsapp://send?phone=${incident.whatsapp}=${message}`);

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
        <Text style={[styles.incidentProperty, { marginTop: 0 }]}>ONG</Text>
        <Text style={styles.incidentValue}>
          {incident.name} de {incident.city}/{incident.uf}{" "}
        </Text>

        <Text style={styles.incidentProperty}>CASO:</Text>
        <Text style={styles.incidentValue}>{incident.title}</Text>

        <Text style={styles.incidentProperty}>VALOR:</Text>
        <Text style={styles.incidentValue}>
          {Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL"
          }).format(incident.value)}
        </Text>
      </View>

      <View style={styles.contactBox}>
        <Text style={styles.heroTitle}>Salve o Dia!</Text>
        <Text style={styles.heroTitle}>Seja o heroi desse caso.</Text>

        <Text style={styles.heroDescription}>Entre em contato:</Text>

        <View style={styles.actions}>
          <TouchableOpacity //
            style={styles.action}
            onPress={sendWhatsapp}
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
