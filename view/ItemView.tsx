import React, { useState } from "react";
import {
    View,
    Text,
    FlatList,
    TouchableOpacity,
    Modal,
    TextInput,
    StyleSheet
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
        removeLast
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

        <View style={styles.contenedorItem}>

        <Text>{item.name}</Text>    

        </View>

    );

    return (
        
        <View style={styles.contenedor}>
        <Text style={styles.titulo}>
            Adicione seu item na Lista
        </Text>
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

        <FlatList<Item>
            data={items}
            renderItem={renderItem}
            keyExtractor={(item) => item.id.toString()}
        />

        <Modal visible={dialogVisible} transparent animationType="fade">

            <View style={styles.sobreposicaoModal}>

            <View style={styles.conteudoModal}>

                <Text style={styles.tituloModal}>
                Adicionar Item
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

    );

};

const styles = StyleSheet.create({
        contenedor: {
            flex: 1,
            padding: 16
        },
        titulo: {
            fontSize: 18,
            fontWeight: "bold",
            marginBottom: 16,
            textAlign: "center"
        },
        linhaBotoes: {
            flexDirection: "row",
            justifyContent: "space-between",
            marginBottom: 16
        },
        botaoAdicionar: {
            backgroundColor: "#007bff",
            padding: 12,
            borderRadius: 4,
            flex: 0.48
        },
        botaoRemover: {
            backgroundColor: "#dc3545",
            padding: 12,
            borderRadius: 4,
            flex: 0.48
        },
        textoBotao: {
            color: "white",
            textAlign: "center"
        },
        contenedorItem: {
            padding: 16,
            borderBottomWidth: 1,
            borderBottomColor: "#ccc"
        },
        sobreposicaoModal: {
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "rgba(0, 0, 0, 0.5)"
        },
        conteudoModal: {
            width: 300,
            height: 300,
            padding: 20,
            backgroundColor: "white",
            borderRadius: 8,
            borderWidth: 2,
            borderColor: "black"
        },
        tituloModal: {
            fontSize: 18,
            marginBottom: 16,
            fontWeight: "bold",
            textAlign: "center",
        },
        entrada: {
            borderWidth: 1,
            borderColor: "#ccc",
            padding: 8,
            marginBottom: 4,
            borderRadius: 4
        },
        textoErro: {
            color: "red",
            marginBottom: 12
        },
        linhaBotoesModal: {
            flexDirection: "row",
            justifyContent: "space-between"
        },
        botaoCancelar: {
            padding: 12,
            backgroundColor: "#ccc",
            borderRadius: 4,
            flex: 0.45
        },
        botaoConfirmar: {
            padding: 12,
            backgroundColor: "#007bff",
            borderRadius: 4,
            flex: 0.45
        },
        textoBotaoCancelar: {
            textAlign: "center"
        }
    });