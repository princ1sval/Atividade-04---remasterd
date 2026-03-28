import React from "react";
import { SafeAreaView, StatusBar } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { ItemView } from "./view/ItemView";
import { AddItemScreen } from "./view/AddItemScreen";
import { useItemController } from "./controllers/useItemController";

type RootStackParamList = {
  Home: undefined;
  AddItem: { addItem: (name: string) => { success: boolean; message?: string } };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  const {
    items,
    addItem,
    removeLast,
    removeItem,
    editItem
  } = useItemController();

  return (
    <NavigationContainer>
      <SafeAreaView style={{ flex: 1, backgroundColor: "#f8f9fa" }}>
        <StatusBar barStyle="light-content" backgroundColor="#000000" />
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen name="Home" options={{ headerShown: false }}>
            {(props) => (
              <ItemView
                {...props}
                items={items}
                addItem={addItem}
                removeLast={removeLast}
                removeItem={removeItem}
                editItem={editItem}
              />
            )}
          </Stack.Screen>
          <Stack.Screen name="AddItem" component={AddItemScreen} />
        </Stack.Navigator>
      </SafeAreaView>
    </NavigationContainer>
  );
}