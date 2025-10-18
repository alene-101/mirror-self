import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Image,
  Alert,
  ActivityIndicator,
} from "react-native";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

const STORAGE_KEY = "user_profile_v1";

export default function Profile() {
  const router = useRouter();

  const [form, setForm] = useState({
    name: "",
    age: "",
    mbti: "",
    holland: "",
  });
  const [original, setOriginal] = useState(null); 
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    const load = async () => {
      try {
        const raw = await AsyncStorage.getItem(STORAGE_KEY);
        if (raw) {
          const parsed = JSON.parse(raw);
          const picked = {
            name: parsed.name || "",
            age: parsed.age || "",
            mbti: parsed.mbti || "",
            holland: parsed.holland || "",
          };
          setForm(picked);
          setOriginal(picked);
        }
      } catch (e) {
        console.warn("Load profile fail:", e);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  function handleChange(field, value) {
    setForm((p) => ({ ...p, [field]: value }));
  }

  async function handleSave() {
    // validation cơ bản
    if (!form.name.trim()) {
      Alert.alert("Thiếu tên", "Vui lòng nhập tên trước khi lưu.");
      return;
    }

    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(form));
      setOriginal(form);
      setEditing(false);
      Alert.alert("Đã lưu", "Thông tin của bạn đã được lưu cục bộ.");
    } catch (e) {
      console.warn("Save fail:", e);
      Alert.alert("Lỗi", "Không lưu được dữ liệu, thử lại nhé.");
    }
  }

  function handleCancel() {
    // revert về bản gốc
    if (original) {
      setForm(original);
    } else {
      setForm({ name: "", age: "", mbti: "", holland: "" });
    }
    setEditing(false);
  }

  function handleBack() {
    router.push("/main/home");
  }

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView contentContainerStyle={styles.container}>
        <Image
          source={require("../assets/images/cat-mascot1.png")}
          style={styles.avatar}
        />

        {!editing ? (
          <>
            <Text style={styles.nameDisplay}>
              {form.name ? form.name : "Chưa có tên"}
            </Text>

            <View style={styles.infoBox}>
              <Text style={styles.infoText}>Tuổi: {form.age || "-"}</Text>
              <Text style={styles.infoText}>MBTI: {form.mbti || "-"}</Text>
              <Text style={styles.infoText}>
                Holland Code: {form.holland || "-"}
              </Text>
            </View>

            <View style={styles.buttonRow}>
              <Pressable style={styles.editButton} onPress={() => setEditing(true)}>
                <Text style={styles.editText}>Sửa</Text>
              </Pressable>

              <Pressable style={styles.backButton} onPress={handleBack}>
                <Text style={styles.backText}>Quay lại</Text>
              </Pressable>
            </View>
          </>
        ) : (
       
          <>
            <Text style={styles.sectionTitle}>Chỉnh sửa thông tin</Text>

            <TextInput
              style={styles.input}
              placeholder="Tên"
              value={form.name}
              onChangeText={(t) => handleChange("name", t)}
            />

            <TextInput
              style={styles.input}
              placeholder="Tuổi"
              value={form.age}
              onChangeText={(t) => handleChange("age", t)}
              keyboardType="numeric"
            />

            <TextInput
              style={styles.input}
              placeholder="MBTI (VD: INFP)"
              value={form.mbti}
              onChangeText={(t) => handleChange("mbti", t)}
              autoCapitalize="characters"
            />

            <TextInput
              style={styles.input}
              placeholder="John Holland Code (RIASEC)"
              value={form.holland}
              onChangeText={(t) => handleChange("holland", t)}
              autoCapitalize="characters"
            />

            <View style={styles.buttonRow}>
              <Pressable style={styles.saveButton} onPress={handleSave}>
                <Text style={styles.saveText}>Lưu</Text>
              </Pressable>

              <Pressable style={styles.cancelButton} onPress={handleCancel}>
                <Text style={styles.cancelText}>Hủy</Text>
              </Pressable>
            </View>
          </>
        )}
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  centered: { flex: 1, alignItems: "center", justifyContent: "center" },
  container: {
    padding: 24,
    alignItems: "center",
    backgroundColor: "#cfe3ef",
    flexGrow: 1,
  },
  avatar: { width: 110, height: 110, borderRadius: 60, marginTop: 8, marginBottom: 12 },
  nameDisplay: { fontSize: 22, fontWeight: "700", color: "#131ea3", marginBottom: 10 },
  sectionTitle: { fontSize: 20, fontWeight: "700", color: "#131ea3", marginBottom: 12 },

  infoBox: {
    width: "100%",
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 2,
    marginBottom: 12,
  },
  infoText: { fontSize: 16, color: "#333", marginBottom: 8 },

  input: {
    width: "100%",
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 12,
    borderWidth: 1,
    borderColor: "#85a0da",
    marginBottom: 12,
    fontSize: 16,
  },
  multiline: { height: 90, textAlignVertical: "top" },

  buttonRow: { flexDirection: "row", marginTop: 10, width: "100%", justifyContent: "space-between" },

  editButton: {
    flex: 1,
    backgroundColor: "#8899db",
    padding: 12,
    borderRadius: 10,
    marginRight: 6,
    alignItems: "center",
  },
  editText: { color: "#fff", fontWeight: "600" },

  backButton: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#8899db",
    padding: 12,
    borderRadius: 10,
    marginLeft: 6,
    alignItems: "center",
    backgroundColor: "#fff",
  },
  backText: { color: "#3366cc", fontWeight: "600" },

  saveButton: {
    flex: 1,
    backgroundColor: "#4b7bd6",
    padding: 12,
    borderRadius: 10,
    marginRight: 6,
    alignItems: "center",
  },
  saveText: { color: "#fff", fontWeight: "600" },

  cancelButton: {
    flex: 1,
    backgroundColor: "#aaa",
    padding: 12,
    borderRadius: 10,
    marginLeft: 6,
    alignItems: "center",
  },
  cancelText: { color: "#fff", fontWeight: "600" },
});
