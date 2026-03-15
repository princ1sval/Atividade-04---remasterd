import React from "react";
import { SafeAreaView } from "react-native";
import { ItemView } from "./view/ItemView";

export default function App() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ItemView />
    </SafeAreaView>
  );
}