import React from "react";
import { View, Text, Image, Pressable, StyleSheet } from "react-native";
import { useRouter } from "expo-router";

export default function WelcomeScreen() {
  const router = useRouter();
  return (
    <View style={styles.container}>
      <Image
        source={require("../assets/images/cat-mascot.png")}
        style={styles.mascot}
        resizeMode="contain"
      />
        <Pressable style={styles.button} onPress={() => router.push("/onboarding")}>
        <Text style={styles.buttonText}>Bắt đầu</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#cfe3ef",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 24
  },
  mascot: { width: 400, height: 400, marginBottom: 100 },
  title: { color: "#5566a7", fontSize: 28, marginBottom: 24 },
  button: { width: 150, padding: 12, backgroundColor: "#8899db", borderRadius: 16, height: 50},
  buttonText: { fontWeight: 500, color: "#fff", fontSize: 20, textAlign: "center" }
});