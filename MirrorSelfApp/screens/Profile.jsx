import React from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import { View, Text, Image, StyleSheet, Pressable } from "react-native";

export default function Profile({route, props}) {
  const router = useRouter();
  const { name, age, mbti, holland, humanValues } = useLocalSearchParams || {};
  function handleReturn() {
    if (typeof props.onReturn === "function") {
      props.onReturn(route.params);
      return;
    }
    router.push("/main/home");
  }
  return (
    <View style={styles.container}>
      {/* Avatar hình tròn */}
      <Image
        source={require("../assets/images/cat-mascot1.png")}
        style={styles.avatar}
      />
      {/* Tên người dùng */}
      <Text style={styles.name}>{name}</Text>

      {/* Khung chứa thông tin */}
      <View style={styles.infoBox}>
        <Text style={styles.infoText}>Tuổi: {age}</Text>
        <Text style={styles.infoText}>MBTI: {mbti}</Text>
        <Text style={styles.infoText}>Holland Code: {holland}</Text>
        <Text style={styles.infoText}>Human Values: {humanValues}</Text>
      </View>

      <Pressable style={styles.button} onPress={handleReturn}>
        <Text style={styles.buttonText}>Quay lại trang chủ</Text>
        </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#cfe3ef", alignItems: "center", padding: 24 },
  avatar: { width: 120, height: 120, borderRadius: 60, marginTop: 40, marginBottom: 12 },
  name: { fontSize: 22, fontWeight: "700", color: "#131ea3", marginBottom: 20, textAlign: "center" },
  infoBox: { width: "100%", backgroundColor: "#fff", borderRadius: 16, padding: 20, shadowColor: "#000", shadowOpacity: 0.1, shadowRadius: 6, elevation: 3 },
  infoText: { fontSize: 18, color: "#333", marginBottom: 10 },
});