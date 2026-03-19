import React, { useState } from "react";
import {
    View,
    Text,
    FlatList,
    TouchableOpacity,
    Modal,
    TextInput,
    StyleSheet,
    Image
    } from "react-native";

    import { Item } from "../models/Item";
    import { useItemController } from "../controllers/useItemController";

    export const ItemView: React.FC = () => {

    const {
        items,
        dialogVisible,
        addItem,
        openDialog,
        closeDialog,
        removeLast,
        removeItem
    } = useItemController();

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
        closeDialog();

    };

    const renderItem = ({ item }: { item: Item }) => (
        <View style={styles.ViewItemAdicionado}>
            <Text style={styles.nomeItem}>✓ {item.name}</Text>
            <TouchableOpacity 
                onPress={() => removeItem(item.id)}
                style={styles.botaoDeleteItem}
            >
                <Text style={styles.textoDeleteItem}>✕</Text>
            </TouchableOpacity>
        </View>

    );

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
            onPress={openDialog}
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

        <Modal visible={dialogVisible} transparent animationType="fade">
            <View style={styles.sobreposicaoModal}>
            <View style={styles.conteudoModal}>
                <Text style={styles.tituloModal}>
                Adiciona um novo item
                </Text>
                <TextInput
                value={inputText}
                onChangeText={(t) => {
                    setInputText(t);
                    setErrorMessage("");
                }}
                placeholder="Nome do item"
                style={styles.entrada}
                />

                {errorMessage ? (
                <Text style={styles.textoErro}>
                    {errorMessage}
                </Text>
                ) : null}
                <View style={styles.linhaBotoesModal}>
                <TouchableOpacity
                    onPress={closeDialog}
                    style={styles.botaoCancelar}
                    >
                    <Text style={styles.textoBotaoCancelar}>
                    Cancelar
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={handleAddItem}
                    style={styles.botaoConfirmar}
                >
                    <Text style={styles.textoBotao}>
                    Adicionar
                    </Text>
                </TouchableOpacity>
                </View>
            </View>
            </View>
        </Modal>
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
        titulo: {
            fontSize: 16,
            fontWeight: "600",
            marginBottom: 20,
            padding: 14,
            textAlign: "center",
            color: "white",
            letterSpacing: 0.5,
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
        //A SObrepossição do modal é a parte que escurece o fundo quando o modal está aberto, para destacar o conteúdo do modal. Ou seja a tela toda!
        sobreposicaoModal: {
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
    
        },
        conteudoModal: {
            width: 320,
            padding: 24,
            backgroundColor: "white",
            borderRadius: 16,
            borderWidth: 0,
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 8 },
            shadowOpacity: 0.25,
            shadowRadius: 12,
            elevation: 8,
        },
        tituloModal: {
            fontSize: 20,
            marginBottom: 18,
            fontWeight: "700",
            textAlign: "center",
            color: "#333",
            letterSpacing: 0.2,
        },
        entrada: {
            borderWidth: 1,
            borderColor: "#E0E0E0",
            padding: 12,
            marginBottom: 8,
            borderRadius: 8,
            fontSize: 15,
            backgroundColor: "#FAFBFC",
            color: "#333",
        },
        textoErro: {
            color: "#FF6B6B",
            marginBottom: 14,
            fontWeight: "600",
            fontSize: 13,
        },
        linhaBotoesModal: {
            flexDirection: "row",
            justifyContent: "space-between",
            gap: 10,
            marginTop: 6,
        },
        botaoCancelar: {
            padding: 12,
            backgroundColor: "#E8E8E8",
            borderRadius: 8,
            flex: 1,
        },
        botaoConfirmar: {
            padding: 12,
            backgroundColor: "#FF6B6B",
            borderRadius: 8,
            flex: 1,
            shadowColor: "#FF6B6B",
            shadowOffset: { width: 0, height: 3 },
            shadowOpacity: 0.25,
            shadowRadius: 4,
            elevation: 3,
        },
        textoBotaoCancelar: {
            textAlign: "center",
            fontWeight: "600",
            color: "#666",
            fontSize: 14,
        },
        flatListContent: {
            paddingBottom: 16,
        }
    });