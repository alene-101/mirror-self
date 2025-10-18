import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  StyleSheet,
  Modal,
  Pressable,
  Keyboard,
} from "react-native";
import { useRouter } from "expo-router";

export default function Chatbot() {
  const router = useRouter();

  const SMALL_EMOJI_SET = [
    "😀", "😅", "😂", "😊", "😍", "😘", "😎", "🤔", "😴", "😢",
    "👍", "👏", "🙌", "🔥", "✨", "💡", "🎉", "🙏", "🤖", "❤️",
  ];

  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [showEmoji, setShowEmoji] = useState(false);
  const flatListRef = useRef(null);

  useEffect(() => {
    setTimeout(() => {
      pushBotMessage("Chào bạn! Mình là MirrorSelf — hãy nói chuyện cùng mình nhé 😊");
    }, 600);
  }, []);

  const pushUserMessage = (text) => {
    const msg = {
      id: Date.now().toString() + Math.random().toString(36).slice(2, 6),
      role: "user",
      text,
    };
    setMessages((prev) => [...prev, msg]);
    scrollToEnd();
  };

  const pushBotMessage = (text) => {
    const msg = {
      id: Date.now().toString() + Math.random().toString(36).slice(2, 6),
      role: "bot",
      text,
    };
    setMessages((prev) => [...prev, msg]);
    scrollToEnd();
  };

  const scrollToEnd = () => {
    setTimeout(() => {
      flatListRef.current?.scrollToEnd({ animated: true });
    }, 80);
  };

  const simulateBotResponse = async (userText) => {
    setLoading(true);
    await new Promise((res) => setTimeout(res, 600 + Math.random() * 800));

    let reply = "Mình chưa kết nối với API, nên đây chỉ là phản hồi giả lập 🙂";
    const t = userText.toLowerCase();
    if (t.includes("xin chào") || t.includes("chào")) reply = "Chào bạn! Mình có thể giúp gì hôm nay?";
    else if (t.includes("cách") && t.includes("làm")) reply = "Bạn muốn hướng dẫn chi tiết hay tóm tắt nhanh?";
    else if (t.length < 6) reply = "Nói thêm chút đi bạn, mình lắng nghe nè.";
    else reply = `Mình nhận được tin nhắn: "${userText.slice(0, 200)}" — phản hồi giả lập đó nha!`;

    pushBotMessage(reply);
    setLoading(false);
  };

  const handleSend = async () => {
    const text = input.trim();
    if (!text) return;

    pushUserMessage(text);
    setInput("");
    Keyboard.dismiss();
    await simulateBotResponse(text);
  };

  const onSelectEmoji = (emoji) => {
    setInput((prev) => prev + emoji);
    setShowEmoji(false);
  };

  const renderMessage = ({ item }) => {
    const isUser = item.role === "user";
    return (
      <View
        style={[
          styles.messageRow,
          isUser ? styles.userRow : styles.botRow,
        ]}
      >
        {!isUser && (
          <View style={styles.botAvatar}>
            <Text style={{ color: "#fff" }}>🤖</Text>
          </View>
        )}
        <View style={[styles.messageBubble, isUser ? styles.userBubble : styles.botBubble]}>
          <Text style={[styles.messageText, isUser ? styles.userText : styles.botText]}>
            {item.text}
          </Text>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        ref={flatListRef}
        data={messages}
        renderItem={renderMessage}
        keyExtractor={(it) => it.id}
        contentContainerStyle={styles.chatBody}
        onContentSizeChange={scrollToEnd}
      />

      {loading && (
        <View style={styles.thinkingRow}>
          <ActivityIndicator size="small" color="#6F6BC2" />
          <Text style={styles.thinkingText}>Thinking...</Text>
        </View>
      )}

      <View style={styles.inputBar}>
        <TouchableOpacity onPress={() => setShowEmoji(true)} style={styles.iconButton}>
          <Text style={styles.iconText}>😊</Text>
        </TouchableOpacity>

        <TextInput
          value={input}
          onChangeText={setInput}
          placeholder="Nhập tin nhắn..."
          style={styles.textInput}
          multiline
        />

        <TouchableOpacity onPress={handleSend} style={styles.sendButton}>
          <Text style={styles.sendText}>Gửi</Text>
        </TouchableOpacity>
      </View>

      <Modal visible={showEmoji} transparent animationType="fade" onRequestClose={() => setShowEmoji(false)}>
        <Pressable style={styles.modalBackdrop} onPress={() => setShowEmoji(false)}>
          <View style={styles.emojiPanel}>
            <Text style={styles.emojiTitle}>Emoji</Text>
            <View style={styles.emojiGrid}>
              {SMALL_EMOJI_SET.map((e) => (
                <TouchableOpacity key={e} onPress={() => onSelectEmoji(e)} style={styles.emojiCell}>
                  <Text style={styles.emoji}>{e}</Text>
                </TouchableOpacity>
              ))}
            </View>
            <TouchableOpacity onPress={() => setShowEmoji(false)} style={styles.emojiClose}>
              <Text style={{ color: "#fff" }}>Đóng</Text>
            </TouchableOpacity>
          </View>
        </Pressable>
      </Modal>
    </View>
  );
}

export const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F5F7FF" },
  chatBody: { padding: 12, paddingBottom: 8 },
  messageRow: { flexDirection: "row", marginVertical: 6, alignItems: "flex-end" },
  userRow: { justifyContent: "flex-end" },
  botRow: { justifyContent: "flex-start" },
  botAvatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#1E90FF",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 8,
  },
  messageBubble: { maxWidth: "78%", padding: 10, borderRadius: 14 },
  userBubble: { backgroundColor: "#1E90FF", borderTopRightRadius: 4 },
  botBubble: { backgroundColor: "#F2F2FF", borderTopLeftRadius: 4 },
  messageText: { fontSize: 15, lineHeight: 20 },
  userText: { color: "#fff" },
  botText: { color: "#333" },
  thinkingRow: { flexDirection: "row", justifyContent: "center", alignItems: "center", paddingVertical: 6 },
  thinkingText: { marginLeft: 8, color: "#666" },
  inputBar: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderColor: "#eee",
  },
  iconButton: { width: 36, height: 36, borderRadius: 18, alignItems: "center", justifyContent: "center", marginRight: 6 },
  iconText: { fontSize: 18 },
  textInput: {
    flex: 1,
    minHeight: 38,
    maxHeight: 120,
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: "#F6F8FF",
    marginRight: 8,
  },
  sendButton: { backgroundColor: "#007AFF", paddingHorizontal: 12, paddingVertical: 8, borderRadius: 18, alignItems: "center", justifyContent: "center" },
  sendText: { color: "#fff", fontWeight: "600" },
  modalBackdrop: { flex: 1, backgroundColor: "rgba(0,0,0,0.35)", alignItems: "center", justifyContent: "center" },
  emojiPanel: { width: 320, backgroundColor: "#fff", borderRadius: 12, padding: 14, alignItems: "center" },
  emojiTitle: { fontWeight: "700", marginBottom: 8 },
  emojiGrid: { flexDirection: "row", flexWrap: "wrap", justifyContent: "center" },
  emojiCell: { padding: 8, margin: 6 },
  emoji: { fontSize: 22 },
  emojiClose: { marginTop: 8, backgroundColor: "#007AFF", paddingVertical: 8, paddingHorizontal: 20, borderRadius: 10 },
});