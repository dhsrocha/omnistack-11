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
  const [totalCount, setTotalCount] = useState(0);

  const [page, setPage] = useState(1);
  const [isLoading, setLoading] = useState(false);

  // * Triggers the first parameter's callback when the second one's state changes.
  useEffect(() => {
    fetchIncidents();
  }, []);

  // Handlers
  const navigateToDetail = incident =>
    navigation.navigate("Detail", { incident });

  const fetchIncidents = async () => {
    if (isLoading) return;
    if (totalCount > 0 && incidents.length === totalCount) return;

    // Guarding
    setLoading(true);
    const resp = await api.get(`incident`, { params: { page } });
    const count = resp.headers["x-total-count"];
    setIncidents([...incidents, ...resp.data.entities]);
    setTotalCount(count ? count : 0);
    setPage(page + 1);
    setLoading(false);
    // Guarding
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={logo} />
        <Text style={styles.container}>
          Total de <Text styles={styles.headerTextBold}>{totalCount} </Text>
          casos.
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
        onEndReached={fetchIncidents}
        onEndReachedThreshold={0.2}
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
              onPress={() => navigateToDetail(incident)}
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
