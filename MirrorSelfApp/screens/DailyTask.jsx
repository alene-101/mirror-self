import React, { useState, useRef, useEffect } from "react";
import { View, Text, Pressable, StyleSheet, FlatList } from "react-native";
import { useRouter } from "expo-router";
import { Animated } from "react-native";

export default function DailyTask(props) {
  const router = useRouter();
  const [streak, setStreak] = useState(4);
  const [tasks, setTasks] = useState([
    { text: "Học 5 từ mới", done: false },
    { text: "Làm task 1 writing", done: false },
    { text: "Sửa bài cũ", done: false },
    { text: "Luyện Listening", done: false }
  ]);
const animatedWidth = useRef(new Animated.Value(0)).current;
const widthInterpolate = animatedWidth.interpolate({
  inputRange: [0, 100],
  outputRange: ["0%", "100%"]
});

const completedCount = tasks.filter(t => t.done).length;
const completion = Math.round((completedCount / tasks.length) * 100);

useEffect(() => {
  Animated.timing(animatedWidth, {
    toValue: completion,
    duration: 400,
    useNativeDriver: false
  }).start();
}, [completion]);

  function handleContinue() {
    if (typeof props.onContinue === "function") {
      props.onContinue(form);
      return;
    }
    router.push("/main");
  }
  function handleTaskCheck(idx) {
    setTasks(prev =>
      prev.map((t, i) => (i === idx ? { ...t, done: !t.done } : t))
    );
  }


  return (
    <View style={styles.container}>
      {/* Progress bar */}
      <View style={styles.progressContainer}>
        <Text style={styles.progressLabel}>Hoàn thành: {completion}%</Text>
        <View style={styles.progressBar}>
          <Animated.View style={[styles.progressFill, { width: widthInterpolate }]} />
        </View>
      </View>

      <Text style={styles.header}>Nhiệm vụ hôm nay</Text>
      <Text style={styles.subhead}>Chạm vào ô để đánh dấu hoàn thành:</Text>

      <FlatList
        data={tasks}
        keyExtractor={(item, idx) => String(idx)}
        renderItem={({ item, index }) => (
          <View style={styles.taskRow}>
            <Pressable onPress={() => handleTaskCheck(index)} style={styles.checkbox}>
              <Text style={{ fontSize: 18 }}>{item.done ? "☑" : "☐"}</Text>
            </Pressable>
            <Text style={[styles.taskText, item.done && styles.taskDone]}>
              {item.text}
            </Text>
          </View>
        )}
      />

      <View style={styles.milestoneRow}>
        <Pressable style={styles.backButton} onPress={() => router.back()}>
          <Text style={styles.backText}>Quay lại</Text>
        </Pressable>
      </View>
    </View>
  );
}

export const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#cfe3ef" },
  progressContainer: { alignItems: "center", marginBottom: 20, marginTop: 10 },
  progressLabel: { fontSize: 16, fontWeight: "600", color: "#0a3d62", marginBottom: 6 },
  progressBar: { width: "90%", height: 14, backgroundColor: "#d6e4f0", borderRadius: 7, overflow: "hidden" },
  progressFill: { height: "100%", backgroundColor: "#131ea3" },
  header: { fontWeight: "500", color: "#131ea3", fontSize: 20, marginBottom: 12 },
  subhead: { fontWeight: "500", color: "#131ea3", fontSize: 20, marginTop: 12, marginBottom: 8 },
  taskRow: { flexDirection: "row", alignItems: "center", paddingVertical: 8 },
  checkbox: { marginRight: 12 },
  taskText: { color: "#ffffffff", fontSize: 18 },
  taskDone: { textDecorationLine: "line-through", color: "#7d9ecb" },
  milestoneRow: { marginTop: 16, alignItems: "flex-start" },
  linkButton: { marginTop: 8, padding: 8 },
  linkText: { color: "#3366cc" },
  backButton: { padding: 8, backgroundColor: "#131ea3", borderRadius: 6 },
  backText: { color: "#fff", fontWeight: "600" }
})