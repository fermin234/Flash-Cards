import { StyleSheet } from "react-native";
import Navigation from "./src/Wrappers/Navigation";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import AuthContextWrapper from "./src/Wrappers/AuthContext";
import { StatusBar } from "expo-status-bar";

export default function App() {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1 }}>
        <StatusBar />
        <AuthContextWrapper>
          <Navigation />
        </AuthContextWrapper>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({});
