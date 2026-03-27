import React from "react";
import { SafeAreaView, StatusBar } from "react-native";
import { ItemView } from "./view/ItemView";

export default function App() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#f8f9fa" }}>
      <StatusBar barStyle="light-content" backgroundColor="#000000" />
      <ItemView />
    </SafeAreaView>
  );
}