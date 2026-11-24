import { useState } from "react";
import {
  Button,
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const items = [
  { id: "1", title: "First sample item" },
  { id: "2", title: "Second sample item" },
  { id: "3", title: "Third sample item" },
];

function signInWithDemoAccount(email: string, password: string) {
  if (
    email.trim().toLowerCase() !== "demo@example.com" ||
    password !== "demo1234"
  ) {
    return null;
  }

  return { email: "demo@example.com" };
}

export default function HomeScreen() {
  const [user, setUser] = useState<{ email: string } | null>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  function handleLogin() {
    const demoUser = signInWithDemoAccount(email, password);

    if (!demoUser) {
      setError("Incorrect email or password.");
      return;
    }

    setError("");
    setPassword("");
    setUser(demoUser);
  }

  function handleLogout() {
    setEmail("");
    setUser(null);
  }

  return (
    <SafeAreaView style={styles.screen}>
      {user ? (
        <>
          <Text accessibilityRole="header" style={styles.heading}>
            Sample items
          </Text>
          <Text>Signed in as {user.email}</Text>
          <FlatList
            data={items}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <Text style={styles.row}>{item.title}</Text>
            )}
          />
          <Button title="Log out" onPress={handleLogout} />
        </>
      ) : (
        <View style={styles.form}>
          <Text accessibilityRole="header" style={styles.heading}>
            Log in
          </Text>
          <TextInput
            accessibilityLabel="Email"
            placeholder="Email"
            autoCapitalize="none"
            autoCorrect={false}
            keyboardType="email-address"
            value={email}
            onChangeText={setEmail}
            style={styles.input}
          />
          <TextInput
            accessibilityLabel="Password"
            placeholder="Password"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
            onSubmitEditing={handleLogin}
            style={styles.input}
          />
          {error ? <Text accessibilityRole="alert">{error}</Text> : null}
          <Button title="Log in" onPress={handleLogin} />
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, paddingHorizontal: 20 },
  heading: { fontSize: 24, fontWeight: "600" },
  row: { fontSize: 16, paddingVertical: 12 },
  form: { gap: 12 },
  input: {
    borderWidth: 1,
    borderColor: "#9ca3af",
    borderRadius: 8,
    paddingHorizontal: 12,
    minHeight: 48,
  },
});
