import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
} from "react-native";
import { useNavigation, useRoute, RouteProp } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

type RootStackParamList = {
  Home: undefined;
  AddItem: { addItem: (name: string) => { success: boolean; message?: string } };
};

type AddItemScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'AddItem'>;
type AddItemScreenRouteProp = RouteProp<RootStackParamList, 'AddItem'>;

export const AddItemScreen: React.FC = () => {
  const navigation = useNavigation<AddItemScreenNavigationProp>();
  const route = useRoute<AddItemScreenRouteProp>();
  const { addItem } = route.params as { addItem: (name: string) => { success: boolean; message?: string } };

  const [inputText, setInputText] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");

  const handleAddItem = () => {
    const trimmed = inputText.trim();
    if (!trimmed) {
      setErrorMessage("Digite um nome para o item");
      return;
    }

    const result = addItem(trimmed);
    if (!result.success) {
      setErrorMessage(result.message || "Erro ao adicionar");
      return;
    }

    setInputText("");
    setErrorMessage("");
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Adicionar Novo Item</Text>
      <TextInput
        value={inputText}
        onChangeText={(t) => {
          setInputText(t);
          setErrorMessage("");
        }}
        placeholder="Nome do item"
        style={styles.input}
      />
      {errorMessage ? (
        <Text style={styles.errorText}>{errorMessage}</Text>
      ) : null}
      <View style={styles.buttonRow}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.cancelButton}
        >
          <Text style={styles.cancelButtonText}>Cancelar</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleAddItem}
          style={styles.addButton}
        >
          <Text style={styles.addButtonText}>Adicionar</Text>
        </TouchableOpacity>
      </View>
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
  title: {
    fontSize: 24,
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 30,
    color: "#333",
  },
  input: {
    borderWidth: 1,
    borderColor: "#E0E0E0",
    padding: 15,
    borderRadius: 10,
    fontSize: 16,
    backgroundColor: "#FAFBFC",
    color: "#333",
    marginBottom: 10,
  },
  errorText: {
    color: "#FF6B6B",
    marginBottom: 20,
    fontWeight: "600",
    fontSize: 14,
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 10,
  },
  cancelButton: {
    padding: 15,
    backgroundColor: "#E8E8E8",
    borderRadius: 10,
    flex: 1,
  },
  cancelButtonText: {
    textAlign: "center",
    fontWeight: "600",
    color: "#666",
    fontSize: 16,
  },
  addButton: {
    padding: 15,
    backgroundColor: "#FF6B6B",
    borderRadius: 10,
    flex: 1,
    shadowColor: "#FF6B6B",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 3,
  },
  addButtonText: {
    textAlign: "center",
    fontWeight: "600",
    color: "white",
    fontSize: 16,
  },
});