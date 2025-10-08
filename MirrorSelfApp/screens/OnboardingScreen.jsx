import React, { useState } from "react";
import { View, Text, Image, TextInput, Pressable, StyleSheet } from "react-native";
import { useRouter } from "expo-router";

export default function OnboardingScreen(props) {
  const router = useRouter();
  const [form, setForm] = useState({
    name: "",
    age: "",
    mbti: "",
    holland: "", 
    humanValues: ""
  });

 
  function handleChange(field, value) {
    setForm(prev => ({ ...prev, [field]: value }));
  }

  function handleContinue() {
    if (typeof props.onContinue === "function") {
      props.onContinue(form);
      return;
    }
    router.push("/main");
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Please fill in the blank below:</Text>

      <TextInput
        style={styles.input}
        placeholder="Your name"
        value={form.name}
        onChangeText={(text) => handleChange("name", text)}
      />

      <TextInput
        style={styles.input}
        placeholder="Your age"
        value={form.age}
        onChangeText={(text) => handleChange("age", text)}
        keyboardType="numeric"
      />

      <TextInput
        style={styles.input}
        placeholder="Your MBTI (e.g. INFP)"
        value={form.mbti}
        onChangeText={(text) => handleChange("mbti", text)}
        autoCapitalize="characters"
      />

      <TextInput
        style={styles.input}
        placeholder="Your John Holland Code (RIASEC)"
        value={form.holland}
        onChangeText={(text) => handleChange("holland", text)}
        autoCapitalize="characters"
      />

      <TextInput
        style={[styles.input, styles.multiline]}
        placeholder="Your Human Values (short list or description)"
        value={form.humanValues}
        onChangeText={(text) => handleChange("humanValues", text)}
        multiline
        numberOfLines={4}
      />

      <Image
              source={require("../assets/images/cat-mascot1.png")}
              style={styles.mascot1}
              resizeMode="contain"
            />
      <Image
              source={require("../assets/images/star.png")}
              style={styles.star}
              resizeMode="contain"
            />

      <Pressable style={styles.button} onPress={handleContinue}>
        <Text style={styles.buttonText}>Continue</Text>
      </Pressable>
    </View>
  );
}
const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, backgroundColor: "#cfe3ef", justifyContent: "center" },
  title: { color: "#ffffffff", fontWeight: 10000, fontSize: 30, marginTop: -250, textAlign: "center" },
  input: { borderWidth: 1, borderColor: "#85a0da", backgroundColor: "#ffffffff", padding: 12, borderRadius: 8, marginBottom: 10, marginTop: 10 },
  multiline: { height: 50, textAlignVertical: "top" },
  mascot1: { width: 200, height: 200, alignSelf: "left", marginTop: -50 },
  star: { width: 100, height: 100, alignSelf: "left", marginTop: -150, marginRight: -20 },
  title: { color: "#5566a7", fontSize: 28, marginBottom: 24 },
  button: { backgroundColor: "#8899db", padding: 12, borderRadius: 10, alignItems: "center", marginTop: 8 },
  buttonText: { color: "#fff", fontSize: 16 }
});