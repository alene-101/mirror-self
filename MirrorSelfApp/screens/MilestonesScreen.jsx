import React from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import { useRouter } from "expo-router";

export default function MilestonesScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Các cột mốc quan trọng:</Text>
      <Text style={styles.item}>• Tuần 1 - 3: Xây nền vững chắc cho 4 kỹ năng IELTS</Text>
      <Text style={styles.item}>• Tuần 4 - 8: Nâng cao từng kỹ năng theo format đề thi</Text>
      <Text style={styles.item}>• Tuần 9 - 12: Làm quen với áp lực thời gian, chiến lược làm bài</Text>
      <Text style={styles.item}>• Tuần 13 - 15: Tổng ôn và mô phỏng thi thử để đạt điểm mục tiêu</Text>

      <Pressable style={styles.backButton} onPress={() => router.back()}>
        <Text style={styles.backText}>Quay lại</Text>
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