import React from "react";
import { SafeAreaView, StatusBar } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { ItemView } from "./view/ItemView";
import { AddItemScreen } from "./view/AddItemScreen";
import { Sobre } from "./view/Sobre";
import { useItemController } from "./controllers/useItemController";

type HomeStackParamList = {
  Home: undefined;
  AddItem: { addItem: (name: string) => { success: boolean; message?: string } };
};

type RootTabParamList = {
  HomeTab: undefined;
  Sobre: undefined;
};

const HomeStack = createNativeStackNavigator<HomeStackParamList>();
const Tab = createBottomTabNavigator<RootTabParamList>();

function HomeStackNavigator({ items, addItem, removeLast, removeItem, editItem }: any) {
  return (
    <HomeStack.Navigator initialRouteName="Home" screenOptions={{ headerShown: false }}>
      <HomeStack.Screen name="Home">
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
      </HomeStack.Screen>
      <HomeStack.Screen name="AddItem" component={AddItemScreen} />
    </HomeStack.Navigator>
  );
}

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
        <Tab.Navigator initialRouteName="HomeTab">
          <Tab.Screen
            name="HomeTab"
            options={{ title: "Home", headerShown: false }}
          >
            {() => (
              <HomeStackNavigator
                items={items}
                addItem={addItem}
                removeLast={removeLast}
                removeItem={removeItem}
                editItem={editItem}
              />
            )}
          </Tab.Screen>
          <Tab.Screen
            name="Sobre"
            component={Sobre}
            options={{ title: "Sobre" }}
          />
        </Tab.Navigator>
      </SafeAreaView>
    </NavigationContainer>
  );
}
