import React, { useState } from "react";
import { Image, View, Text, Pressable, StyleSheet, FlatList } from "react-native";
import { useRouter } from "expo-router";

/* ========== Reusable InfoBox (card) ========== */
function InfoBox({ title, children, footer }) {
  return (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <Text style={styles.cardTitle}>{title}</Text>
      </View>
      <View>{children}</View>
      {footer ? <Text style={styles.cardFooter}>{footer}</Text> : null}
    </View>
  );
}

/* ========== Milestones visual (giống mock) ========== */
function MilestoneTrack() {
  const items = [
    { title: "Tuần 1 - 3", desc: "Xây nền vững chắc cho 4 kỹ năng IELTS", pos: "10%", top: 22 },
    { title: "Tuần 4 - 8", desc: "Nâng cao từng kỹ năng theo format đề thi", pos: "45%", top: 56 },
    { title: "Tuần 9 - 12", desc: "Làm quen với áp lực thời gian, chiến lược làm bài", pos: "70%", top: 18 },
    { title: "Tuần 13 - 15", desc: "Tổng ôn & mô phỏng thi thử để đạt mục tiêu", pos: "95%", top: 40 }
  ];
  return (
  <View>
      {/* Nhãn mốc */}
      <View style={styles.milestoneGrid}>
        <View style={styles.milestoneCol}>
          <Text style={styles.milestoneHead}>Tuần 1 - 3</Text>
          <Text style={styles.milestoneText}>Xây nền vững chắc cho 4 kỹ năng IELTS</Text>
        </View>
        <View style={styles.milestoneCol}>
          <Text style={styles.milestoneHead}>Tuần 4 - 8</Text>
          <Text style={styles.milestoneText}>Nâng cao từng kỹ năng theo format đề thi</Text>
        </View>
        <View style={styles.milestoneCol}>
          <Text style={styles.milestoneHead}>Tuần 9 - 12</Text>
          <Text style={styles.milestoneText}>Làm quen với áp lực thời gian, chiến lược làm bài</Text>
        </View>
        <View style={styles.milestoneCol}>
          <Text style={styles.milestoneHead}>Tuần 13 - 15</Text>
          <Text style={styles.milestoneText}>Tổng ôn & mô phỏng thi thử để đạt điểm mục tiêu</Text>
        </View>
      </View>
    </View>
  );
}

export default function Home({ DailyTask, Milestones, Chatbot, Profile }) {
  const router = useRouter();
  const [streak, setStreak] = useState(4);
  const [tasks, setTasks] = useState([
    { text: "Học 5 từ mới", done: false },
    { text: "Làm task 1 writing", done: false },
    { text: "Sửa bài cũ", done: false },
    { text: "Luyện Listening", done: false }
  ]);
  const [mood, setMood] = useState(3);

  function handleTaskCheck(idx) {
    setTasks(prev => prev.map((t, i) => (i === idx ? { ...t, done: !t.done } : t)));
  }
  function handleSetStreak(value) { setStreak(prev => (prev === value ? 0 : value)); }
  function handleSetMood(value) { setMood(value); }
  function goTo(path) { router.push(path); }

  const moodEmojis = [
    { label: "Rất buồn", emoji: "😢" },
    { label: "Buồn", emoji: "🙁" },
    { label: "Bình thường", emoji: "😐" },
    { label: "Vui", emoji: "🙂" },
    { label: "Rất vui", emoji: "😀" }
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.welcome}>
        Welcome to <Text style={{ fontWeight: "800" }}>Mirror Self</Text> ✨
      </Text>

      {/* ===== GRID 2 CỘT: hàng 1 và hàng 2 ===== */}
      <View style={styles.grid}>

        {/* Hàng 1 - trái: Streak tuần */}
        <InfoBox title="Streak tuần" footer="Hãy cố gắng giữ streak nhé 🔥">
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
                  <Text style={[styles.star, { color: filled ? "#7f99cc" : "#e6eef7" }]}>★</Text>
                </Pressable>
              );
            })}
          </View>
        </InfoBox>

        {/* Hàng 1 - phải: Nhiệm vụ hôm nay */}
        <InfoBox title="Nhiệm vụ hôm nay" footer="Chia mục tiêu nhỏ để dễ hoàn thành ✅">
          <FlatList
            data={tasks}
            keyExtractor={(item, idx) => String(idx)}
            scrollEnabled={false}
            renderItem={({ item, index }) => (
              <View style={styles.taskRow}>
                <Pressable onPress={() => handleTaskCheck(index)} style={styles.checkbox}>
                  <Text style={{ fontSize: 18 }}>{item.done ? "☑" : "☐"}</Text>
                </Pressable>
                <Text style={[styles.taskText, item.done && styles.taskDone]}>{item.text}</Text>
              </View>
            )}
          />
        </InfoBox>

        {/* Hàng 2 - trái: Cảm xúc hôm nay */}
        <InfoBox title="Cảm xúc hôm nay" footer="Nếu mood xuống, thử nghỉ 5’ hoặc đổi bài tập ❤️">
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
                  <Text style={[styles.moodEmoji, selected && styles.selectedMoodEmoji]}>{m.emoji}</Text>
                  <Text style={styles.moodLabel}>{value}</Text>
                </Pressable>
              );
            })}
          </View>
        </InfoBox>

        {/* Hàng 2 - phải: Các cột mốc quan trọng (vị trí ô đỏ) */}
        <InfoBox title="Các cột mốc quan trọng">
          <MilestoneTrack />
        </InfoBox>
      </View>

      {/* ===== Footer navigation ===== */}
      <View style={styles.footerNav}>
        <Pressable style={styles.navButton} onPress={() => (Chatbot ? Chatbot() : goTo("/main/chatbot"))}>
          <Image source={require("../assets/images/chatbot.png")} style={styles.navIcon} resizeMode="contain" />
          <Text style={styles.navText}>Chatbot</Text>
        </Pressable>
        <Pressable style={styles.navButton} onPress={() => (Milestones ? Milestones() : goTo("/main/milestones"))}>
          <Image source={require("../assets/images/milestone.png")} style={styles.navIcon} resizeMode="contain" />
          <Text style={styles.navText}>Milestones</Text>
        </Pressable>
        <Pressable style={styles.navButton} onPress={() => (DailyTask ? DailyTask() : goTo("/main/dailytask"))}>
          <Image source={require("../assets/images/dailytask.png")} style={styles.navIcon} resizeMode="contain" />
          <Text style={styles.navText}>Daily Task</Text>
        </Pressable>
        <Pressable style={styles.navButton} onPress={() => (Profile ? Profile() : goTo("/main/profile"))}>
          <Image source={require("../assets/images/profile.png")} style={styles.navIcon} resizeMode="contain" />
          <Text style={styles.navText}>Profile</Text>
        </Pressable>
      </View>
    </View>
  );
}

/* ========== Styles ========== */
const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#cfe3ef" },

  welcome: {
    fontSize: 25,
    fontWeight: "700",
    color: "#384b76",
    marginBottom: 12,
    textAlign: "center"
  },

  /* Grid 2 cột */
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    gap: 12
  },


  card: {
    width: "48%", 
    backgroundColor: "#ffffff",
    borderRadius: 16,
    padding: 12,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
    marginBottom: 12
  },
  cardHeader: { marginBottom: 6 },
  cardTitle: { fontWeight: "700", color: "#2a3d8f", fontSize: 16 },
  cardFooter: { marginTop: 8, color: "#6b7aa1", fontSize: 13 },


  streakRow: { flexDirection: "row", justifyContent: "center", paddingVertical: 4 },
  starButton: { paddingHorizontal: 4, paddingVertical: 2 },
  star: { fontSize: 50 },


  taskRow: { flexDirection: "row", alignItems: "center", paddingVertical: 6 },
  checkbox: { marginRight: 10 },
  taskText: { color: "#334155", fontSize: 16 },
  taskDone: { textDecorationLine: "line-through", color: "#8aa8cf" },


  moodRow: { flexDirection: "row", justifyContent: "space-around", paddingVertical: 6 },
  moodButton: { alignItems: "center", padding: 4 },
  selectedMoodButton: { transform: [{ scale: 1.06 }] },
  moodEmoji: { fontSize: 26, opacity: 0.9 },
  selectedMoodEmoji: { fontSize: 32 },
  moodLabel: { fontSize: 11, marginTop: 4, color: "#475569" },

  pathBox: {
    height: 70,
    marginBottom: 8,
    borderRadius: 12,
    backgroundColor: "#f5f8ff",
    overflow: "hidden",
    justifyContent: "center"
  },
  milestoneCol: { width: "48%" },
  milestoneHead: { color: "#1f2e7a", fontSize: 14, fontWeight: "800", marginBottom: 2 },
  milestoneText: { color: "#43527e", fontSize: 13, lineHeight: 18 },

  /* Footer nav */
  footerNav: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: "auto",
    paddingVertical: 12,
    borderTopWidth: 1,
    borderColor: "#7d9ecb",
    backgroundColor: "#7f99cc"
  },
  navIcon: { width: 28, height: 28, marginBottom: 4 },
  navButton: { padding: 8, alignItems: "center" },
  navText: { color: "#1f3166", fontSize: 14, fontWeight: "700" }
});
