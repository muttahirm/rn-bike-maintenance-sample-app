// Import the React state hook.
import { useState } from "react";
// Import React Native UI components.
import {
  // Import the button component.
  Button,
  // Import the scrollable list component.
  FlatList,
  // Import the stylesheet API.
  StyleSheet,
  // Import the text component.
  Text,
  // Import the text input component.
  TextInput,
  // Import the generic view component.
  View,
} from "react-native";
// Import the safe-area container component.
import { SafeAreaView } from "react-native-safe-area-context";

// Store the sample list items.
const items = [
  // Store the first sample item.
  { id: "1", title: "First sample item" },
  // Store the second sample item.
  { id: "2", title: "Second sample item" },
  // Store the third sample item.
  { id: "3", title: "Third sample item" },
  // Close the sample list array.
];

// Validate credentials for the demo account.
function signInWithDemoAccount(email: string, password: string) {
  // Check the normalized email and password.
  if (
    // Normalize the email before comparison.
    email.trim().toLowerCase() !== "demo@example.com" ||
    // Compare the submitted password.
    password !== "demo1234"
    // Close the validation condition.
  ) {
    // Reject invalid credentials.
    return null;
    // Handle valid credentials.
  } else {
    // Return the demo user.
    return { email: "demo@example.com" };
    // Close the credential branch.
  }
  // Close the validation function.
}

// Export the default home screen component.
export default function HomeScreen() {
  // Track the authenticated demo user.
  const [user, setUser] = useState<{ email: string } | null>(null);
  // Track the email input value.
  const [email, setEmail] = useState("");
  // Track the password input value.
  const [password, setPassword] = useState("");
  // Track the login error message.
  const [error, setError] = useState("");

  // Handle a login attempt.
  function handleLogin() {
    // Validate the entered credentials.
    const demoUser = signInWithDemoAccount(email, password);
    // Handle invalid credentials.
    if (!demoUser) {
      // Set the login error message.
      setError("Incorrect email or password.");
      // Stop processing the failed login.
      return;
    }
    // Clear the login error.
    setError("");
    // Clear the password field.
    setPassword("");
    // Store the authenticated user.
    setUser(demoUser);
  }

  // Handle a logout action.
  function handleLogout() {
    // Clear the email field.
    setEmail("");
    // Clear the authenticated user.
    setUser(null);
  }

  // Render the screen interface.
  return (
    // Apply safe-area spacing.
    <SafeAreaView style={styles.screen}>
      {/* Select the authenticated or login interface. */}
      {user ? (
        // Render the authenticated interface.
        <>
          {/* Render the sample items heading. */}
          <Text accessibilityRole="header" style={styles.heading}>
            Sample items
          </Text>
          {/* Render the signed-in email. */}
          <Text>Signed in as {user.email}</Text>
          {/* Render the sample items list. */}
          <FlatList
            data={items}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <Text style={styles.row}>{item.title}</Text>
            )}
          />
          {/* Render the logout button. */}
          <Button title="Log out" onPress={handleLogout} />
        </>
      ) : (
        // Render the login form.
        <View style={styles.form}>
          {/* Render the login heading. */}
          <Text accessibilityRole="header" style={styles.heading}>
            Log in
          </Text>
          {/* Render the email input. */}
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
          {/* Render the password input. */}
          <TextInput
            accessibilityLabel="Password"
            placeholder="Password"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
            onSubmitEditing={handleLogin}
            style={styles.input}
          />
          {/* Render the login error when present. */}
          {error ? <Text accessibilityRole="alert">{error}</Text> : null}
          {/* Render the login button. */}
          <Button title="Log in" onPress={handleLogin} />
        </View>
      )}
    </SafeAreaView>
    // Close the rendered interface.
  );
  // Close the home screen component.
}

// Create the reusable component styles.
const styles = StyleSheet.create({
  // Configure the screen layout.
  screen: { flex: 1, paddingHorizontal: 20 },
  // Configure the heading typography.
  heading: { fontSize: 24, fontWeight: "600" },
  // Configure the list row typography and spacing.
  row: { fontSize: 16, paddingVertical: 12 },
  // Configure spacing in the login form.
  form: { gap: 12 },
  // Configure the text input appearance.
  input: {
    // Add a border around the input.
    borderWidth: 1,
    // Set the input border color.
    borderColor: "#9ca3af",
    // Round the input corners.
    borderRadius: 8,
    // Add horizontal input padding.
    paddingHorizontal: 12,
    // Set the minimum input height.
    minHeight: 48,
    // Close the input style.
  },
  // Close the stylesheet.
});
