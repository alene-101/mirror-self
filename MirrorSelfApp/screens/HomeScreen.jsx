import React, { useState } from "react";
import { View, Text, Pressable, StyleSheet, FlatList } from "react-native";
import { useRouter } from "expo-router";

export default function HomeScreen({ onGoToMilestones }) {
  const router = useRouter();
  const [streak, setStreak] = useState(4);
  const [tasks, setTasks] = useState([
    { text: "Học 5 từ mới", done: false },
    { text: "Làm task 1 writing", done: false },
    { text: "Sửa bài cũ", done: false },
    { text: "Luyện Listening", done: false }
  ]);
  const [mood, setMood] = useState(3); // 1..5

  function handleTaskCheck(idx) {
    setTasks(prev => prev.map((t, i) => (i === idx ? { ...t, done: !t.done } : t)));
  }

  function handleSetStreak(value) {
    setStreak(prev => (prev === value ? 0 : value));
  }

  // Mood rating: 1..5 with emojis
  const moodEmojis = [
    { label: "Rất buồn", emoji: "😢" },
    { label: "Buồn", emoji: "🙁" },
    { label: "Bình thường", emoji: "😐" },
    { label: "Vui", emoji: "🙂" },
    { label: "Rất vui", emoji: "😀" }
  ];

  function handleSetMood(value) {
    setMood(value);
    // optional: persist or send to parent via onMoodChange prop
    if (typeof onGoToMilestones === "function" && false) {
      // placeholder if you want to send mood to parent later
      // onGoToMilestones({ mood: value });
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Streak tuần</Text>

      <View style={styles.streakRow}>
        {[...Array(7)].map((_, i) => {
          const value = i + 1;
          const filled = i < streak;
          return (
            <Pressable
              key={i}
              onPress={() => handleSetStreak(value)}
              style={styles.starButton}
              accessibilityLabel={`Set streak ${value}`}
            >
              <Text style={[styles.star, { color: filled ? "#7f99cc" : "#ffffffff" }]}>★</Text>
            </Pressable>
          );
        })}
      </View>

      <Text style={styles.subhead}>Nhiệm vụ hôm nay</Text>
      <FlatList
        data={tasks}
        keyExtractor={(item, idx) => String(idx)}
        renderItem={({ item, index }) => (
          <View style={styles.taskRow}>
            <Pressable onPress={() => handleTaskCheck(index)} style={styles.checkbox}>
              <Text style={{ fontSize: 18 }}>{item.done ? "☑" : "☐"}</Text>
            </Pressable>
            <Text style={[styles.taskText, item.done && styles.taskDone]}>{item.text}</Text>
          </View>
        )}
      />

      {/* Mood tracker (1..5) */}
      <Text style={styles.subhead}>Cảm xúc hôm nay</Text>
      <View style={styles.moodRow}>
        {moodEmojis.map((m, idx) => {
          const value = idx + 1;
          const selected = value === mood;
          return (
            <Pressable
              key={idx}
              onPress={() => handleSetMood(value)}
              style={[styles.moodButton, selected && styles.selectedMoodButton]}
              accessibilityLabel={m.label}
            >
              <Text style={[styles.moodEmoji, selected && styles.selectedMoodEmoji]}>
                {m.emoji}
              </Text>
              <Text style={styles.moodLabel}>{value}</Text>
            </Pressable>
          );
        })}
      </View>

      <View style={styles.milestoneRow}>
        <Text style={styles.subhead}>Lộ trình mục tiêu</Text>
        <Pressable style={styles.linkButton} onPress={() => (onGoToMilestones ? onGoToMilestones() : router.push("/main/milestones"))}>
          <Text style={styles.linkText}>Mở Lộ trình mục tiêu</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#cfe3ef" },
  header: { fontWeight: "500", color: "#131ea3", fontSize: 20, marginBottom: 12 },
  subhead: { fontWeight: "500", color: "#131ea3", fontSize: 20, marginTop: 12, marginBottom: 8 },
  streakRow: { flexDirection: "row", justifyContent: "center", marginVertical: 12 },
  starButton: { padding: 6 },
  star: { fontSize: 35 },
  taskRow: { flexDirection: "row", alignItems: "center", paddingVertical: 8 },
  checkbox: { marginRight: 12 },
  taskText: { color: "#ffffffff", fontSize: 18 },
  taskDone: { textDecorationLine: "line-through", color: "#7d9ecb" },
  milestoneRow: { marginTop: 16, alignItems: "flex-start" },
  linkButton: { marginTop: 8, padding: 8 },
  linkText: { color: "#3366cc" },
  /* mood tracker styles */
  moodRow: { flexDirection: "row", justifyContent: "space-around", marginVertical: 12, paddingHorizontal: 8 },
  moodButton: { alignItems: "center", padding: 6 },
  selectedMoodButton: { transform: [{ scale: 1.1 }] },
  moodEmoji: { fontSize: 28, opacity: 0.9 },
  selectedMoodEmoji: { fontSize: 34 },
  moodLabel: { fontSize: 12, marginTop: 4, color: "#333" }
});