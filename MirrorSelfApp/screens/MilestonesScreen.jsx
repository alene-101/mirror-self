import React from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import { useRouter } from "expo-router";

export default function MilestonesScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Milestones</Text>
      <Text style={styles.item}>• Week 1-3: Build solid foundation</Text>
      <Text style={styles.item}>• Week 4-8: Improve skills</Text>
      <Text style={styles.item}>• Week 9-12: Get familiar with strategies</Text>
      <Text style={styles.item}>• Week 13-15: Review and test</Text>

      <Pressable style={styles.backButton} onPress={() => router.back()}>
        <Text style={styles.backText}>Back</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#fff" },
  title: { fontSize: 22, marginBottom: 12 },
  item: { fontSize: 16, marginBottom: 6 },
  backButton: { marginTop: 20, backgroundColor: "#8899db", padding: 10, borderRadius: 8, alignItems: "center" },
  backText: { color: "#fff" }
});