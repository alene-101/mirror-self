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
      <Text style={styles.title}>Vui lòng nhập thông tin vào bên dưới:</Text>

      <TextInput
        style={styles.input}
        placeholder="Tên"
        value={form.name}
        onChangeText={(text) => handleChange("name", text)}
      />

      <TextInput
        style={styles.input}
        placeholder="Tuổi"
        value={form.age}
        onChangeText={(text) => handleChange("age", text)}
        keyboardType="numeric"
      />

      <TextInput
        style={styles.input}
        placeholder="MBTI (ví dụ: INFP)"
        value={form.mbti}
        onChangeText={(text) => handleChange("mbti", text)}
        autoCapitalize="characters"
      />

      <TextInput
        style={styles.input}
        placeholder="John Holland Code (RIASEC)"
        value={form.holland}
        onChangeText={(text) => handleChange("holland", text)}
        autoCapitalize="characters"
      />

      <TextInput
        style={[styles.input, styles.multiline]}
        placeholder="Human Values (list ngắn/miêu tả)"
        value={form.humanValues}
        onChangeText={(text) => handleChange("humanValues", text)}
        numberOfLines={2}
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
        <Text style={styles.buttonText}>Lưu & Tiếp tục</Text>
      </Pressable>
    </View>
  );
}
const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, backgroundColor: "#cfe3ef", justifyContent: "center" },
  title: { color: "#fff", fontWeight: 10000, fontSize: 25, marginTop: -200, textAlign: "center" },
  input: { borderWidth: 1, borderColor: "#85a0da", backgroundColor: "#ffffffff", padding: 12, borderRadius: 8, marginBottom: 10, marginTop: 10 },
  multiline: { height: 50, textAlignVertical: "top" },
  mascot1: { position: "absolute", width: 100, height: 90, marginBottom: 20, bottom: 100, left: 20 },
  star: { position: "absolute", top: 20, left: 20, width: 100, height: 100},
  button: { position: "absolute", width: 250, marginBottom: 20, bottom: 110, right: 50, padding:12, backgroundColor: "#8899db", padding: 12, borderRadius: 10 },
  buttonText: { color: "#fff", fontSize: 16, textAlign: "center", fontWeight: "600" }
});