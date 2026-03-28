import React, { useState } from "react";
import {
    View,
    Text,
    FlatList,
    TouchableOpacity,
    StyleSheet,
    Image,
    TextInput,
    Alert
    } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Item } from "../models/Item";

type RootStackParamList = {
  Home: undefined;
  AddItem: { addItem: (name: string) => { success: boolean; message?: string } };
};

type ItemViewNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Home'>;

interface ItemViewProps {
    items: Item[];
    addItem: (name: string) => { success: boolean; message?: string };
    removeLast: () => void;
    removeItem: (id: number) => void;
    editItem: (id: number, newName: string) => { success: boolean; message?: string };
}

export const ItemView: React.FC<ItemViewProps> = ({
    items,
    addItem,
    removeLast,
    removeItem,
    editItem
}) => {
    const navigation = useNavigation<ItemViewNavigationProp>();
    const [editingItemId, setEditingItemId] = useState<number | null>(null);
    const [editingText, setEditingText] = useState<string>("");

    const renderItem = ({ item }: { item: Item }) => {
        const isEditing = editingItemId === item.id;

        const handleEdit = () => {
            setEditingItemId(item.id);
            setEditingText(item.name);
        };

        const handleSave = () => {
            const result = editItem(item.id, editingText);
            if (result.success) {
                setEditingItemId(null);
                setEditingText("");
            } else {
                Alert.alert("Erro", result.message);
            }
        };

        const handleCancel = () => {
            setEditingItemId(null);
            setEditingText("");
        };

        return (
            <View style={styles.ViewItemAdicionado}>
                {isEditing ? (
                    <TextInput
                        style={styles.nomeItem}
                        value={editingText}
                        onChangeText={setEditingText}
                        autoFocus
                    />
                ) : (
                    <Text style={styles.nomeItem}>✓ {item.name}</Text>
                )}
                <View style={styles.botoesContainer}>
                    {isEditing ? (
                        <>
                            <TouchableOpacity onPress={handleSave} style={styles.botaoSave}>
                                <Text style={styles.textoBotaoPequeno}>✓</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={handleCancel} style={styles.botaoCancel}>
                                <Text style={styles.textoBotaoPequeno}>✕</Text>
                            </TouchableOpacity>
                        </>
                    ) : (
                        <>
                            <TouchableOpacity onPress={handleEdit} style={styles.botaoEdit}>
                                <Text style={styles.textoBotaoPequeno}>✏️</Text>
                            </TouchableOpacity>
                            <TouchableOpacity 
                                onPress={() => removeItem(item.id)}
                                style={styles.botaoDeleteItem}
                            >
                                <Text style={styles.textoDeleteItem}>✕</Text>
                            </TouchableOpacity>
                        </>
                    )}
                </View>
            </View>
        );
    };

    return (
        <View style={styles.ViewGeral}>
            <View style={styles.logoeNomeApp}>
                <Image
                source={require("../assets/iconeShoppe.png")}
                style={[styles.logoApp ]}
                />
                <Text style={styles.NomeApp}>Lista de Compras
                </Text>
            </View>
            
        <View style={styles.ViewLista}>
        <Text style={styles.tituloLista}>
            Meus Itens da Compra
        </Text>

        <FlatList<Item>
            data={items}
            renderItem={renderItem}
            keyExtractor={(item) => item.id.toString()}
            scrollEnabled={true}
            scrollIndicatorInsets={{ right: 1 }}
            contentContainerStyle={styles.flatListContent}
        />

        <View style={styles.linhaBotoes}>
            <TouchableOpacity
            onPress={() => navigation.navigate('AddItem', { addItem })}
            style={styles.botaoAdicionar}
            >
            <Text style={styles.textoBotao}>
                Adicionar Item
            </Text>
            </TouchableOpacity>
            <TouchableOpacity
            onPress={removeLast}
            style={styles.botaoRemover}
            >

            <Text style={styles.textoBotao}>
                Remover último
            </Text>

            </TouchableOpacity>
        </View>

        </View>
    </View>

    );

};

const styles = StyleSheet.create({
        ViewGeral: {
            flex: 1,
            width: "100%",
            backgroundColor: "#f8f9fa",
        },
        tituloLista: {
            fontSize: 18,
            fontWeight: "700",
            marginBottom: 20,
            textAlign: "center",
            color: "#333",
            letterSpacing: 0.3,
        },
        NomeApp: {
            fontSize: 28,
            fontWeight: "700",
            textAlign: "center",
            marginBottom: 4,
            color: "white",
            letterSpacing: 0.3,
        },
        logoeNomeApp: {
            alignItems: "center",
            flexDirection: "column",   
            backgroundColor: "#ff6b6b",
            color: "white",
            padding: 20,
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.15,
            shadowRadius: 8,
            elevation: 5,
        },

        logoApp: {
            width: 90,
            height: 90,
            padding: 8,
            marginBottom: 8,
        },

        ViewLista: {
            flex: 1,
            backgroundColor: "#f8f9fa",
            padding: 16,
            borderColor: "#e0e0e0",
            borderTopWidth: 1,
        },
        linhaBotoes: {
            flexDirection: "row",
            justifyContent: "space-between",
            marginBottom: 20,
            gap: 12,
        },
        botaoAdicionar: {
            backgroundColor: "#FF6B6B",
            padding: 14,
            borderRadius: 10,
            flex: 1,
            shadowColor: "#FF6B6B",
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.3,
            shadowRadius: 6,
            elevation: 5,
        },
        botaoRemover: {
            backgroundColor: "#FFA5A5",
            padding: 14,
            borderRadius: 10,
            flex: 1,
            shadowColor: "#FFA5A5",
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.2,
            shadowRadius: 6,
            elevation: 3,
        },
        textoBotao: {
            color: "white",
            textAlign: "center",
            fontWeight: "600",
            fontSize: 15,
            letterSpacing: 0.3,
        },
        ViewItemAdicionado: {
            padding: 16,
            marginBottom: 10,
            borderRadius: 10,
            backgroundColor: "#FFE0E0",
            borderLeftWidth: 4,
            borderLeftColor: "#FF6B6B",
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.08,
            shadowRadius: 4,
            elevation: 2,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
        },
        nomeItem: {
            color: "#333",
            fontSize: 16,
            fontWeight: "500",
            letterSpacing: 0.2,
            flex: 1,
        },
        botaoDeleteItem: {
            width: 32,
            height: 32,
            borderRadius: 16,
            backgroundColor: "#FF6B6B",
            justifyContent: "center",
            alignItems: "center",
            marginLeft: 12,
            shadowColor: "#FF6B6B",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.2,
            shadowRadius: 4,
            elevation: 2,
        },
        textoDeleteItem: {
            color: "white",
            fontSize: 18,
            fontWeight: "700",
        },
        botoesContainer: {
            flexDirection: "row",
            alignItems: "center",
        },
        botaoEdit: {
            width: 32,
            height: 32,
            borderRadius: 16,
            backgroundColor: "#4CAF50",
            justifyContent: "center",
            alignItems: "center",
            marginRight: 8,
            shadowColor: "#4CAF50",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.2,
            shadowRadius: 4,
            elevation: 2,
        },
        botaoSave: {
            width: 32,
            height: 32,
            borderRadius: 16,
            backgroundColor: "#4CAF50",
            justifyContent: "center",
            alignItems: "center",
            marginRight: 8,
            shadowColor: "#4CAF50",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.2,
            shadowRadius: 4,
            elevation: 2,
        },
        botaoCancel: {
            width: 32,
            height: 32,
            borderRadius: 16,
            backgroundColor: "#FF6B6B",
            justifyContent: "center",
            alignItems: "center",
            shadowColor: "#FF6B6B",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.2,
            shadowRadius: 4,
            elevation: 2,
        },
        textoBotaoPequeno: {
            color: "white",
            fontSize: 16,
            fontWeight: "700",
        },
        flatListContent: {
            paddingBottom: 16,
        }
    });