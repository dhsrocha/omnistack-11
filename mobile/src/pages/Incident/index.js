import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import React from "react";
import { FlatList, Image, Text, TouchableOpacity, View } from "react-native";
import logo from "../../assets/logo.png";
import styles from "./styles";

export default function Incident() {
  // Hooks
  const navigation = useNavigation();

  // Handlers
  const navigateToDetail = () => {
    navigation.navigate("Detail");
  };

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

      <FlatList //
        data={[1, 2, 3]}
        style={styles.incidentList}
        // Options
        showsVerticalScrollIndicator={false}
        // Items
        keyExtractor={incident => String(incident)} // Should be changed shortly
        renderItem={() => (
          <View
            style={[
              styles.incident, //
              { marginTop: 0 } // Should be dynamically set.
            ]}
          >
            <Text style={styles.incidentProperty}>ONG</Text>
            <Text style={styles.incidentValue}>APAD</Text>

            <Text style={styles.incidentProperty}>CASO:</Text>
            <Text style={styles.incidentValue}>Cadelinha atropelada</Text>

            <Text style={styles.incidentProperty}>VALOR:</Text>
            <Text style={styles.incidentValue}>R$ 120,00</Text>

            <TouchableOpacity //
              style={styles.detailsButton}
              onPress={navigateToDetail}
            >
              <Text style={styles.detailsButtonText}>Ver mais detalhes</Text>
              <Feather name="arrow-right" size={16} color="#E02041" />
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}
