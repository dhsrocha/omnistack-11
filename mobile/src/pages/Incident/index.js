import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { FlatList, Image, Text, TouchableOpacity, View } from "react-native";
import logo from "../../assets/logo.png";
import api from "../../services/api";
import styles from "./styles";

export default function Incident() {
  // Hooks
  const navigation = useNavigation();

  const [incidents, setIncidents] = useState([]);

  // * Triggers the first parameter's callback when the second one's state changes.
  useEffect(() => {
    fetchIncidents();
  }, []);

  // Handlers
  const navigateToDetail = () => navigation.navigate("Detail");

  const fetchIncidents = async () => {
    api
      .get("incident")
      .then(r => setIncidents(r.data.entities))
      .catch(err => console.error("Erro ao obter incidentes", err));
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
        data={incidents}
        style={styles.incidentList}
        // Options
        showsVerticalScrollIndicator={false}
        // Items
        keyExtractor={i => String(i.id)}
        renderItem={({ item: incident }) => (
          <View
            style={[
              styles.incident, //
              { marginTop: 0 } // Should be dynamically set.
            ]}
          >
            <Text style={styles.incidentProperty}>ONG</Text>
            <Text style={styles.incidentValue}>{incident.name}</Text>

            <Text style={styles.incidentProperty}>CASO:</Text>
            <Text style={styles.incidentValue}>{incident.title}</Text>

            <Text style={styles.incidentProperty}>VALOR:</Text>
            <Text style={styles.incidentValue}>
              {Intl.NumberFormat("pt-BR", {
                style: "currency",
                currency: "BRL"
              }).format(incident.value)}
            </Text>

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
