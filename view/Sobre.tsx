import React from "react";
import { View, Text, StyleSheet } from "react-native";

export const Sobre: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Sobre</Text>
      <Text style={styles.paragraph}>
        Esta é a tela Sobre do app de Lista de Compras. Aqui você pode colocar informações sobre o aplicativo, autor, versão e instruções.
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f8f9fa",
    justifyContent: "center",
  },
  header: {
    fontSize: 26,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 16,
    color: "#333",
  },
  paragraph: {
    fontSize: 16,
    lineHeight: 24,
    color: "#555",
    textAlign: "center",
  },
});
