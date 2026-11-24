import { FlatList, StyleSheet, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const items = [
  { id: "1", title: "First sample item" },
  { id: "2", title: "Second sample item" },
  { id: "3", title: "Third sample item" },
];

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.screen}>
      <Text accessibilityRole="header" style={styles.heading}>
        Sample items
      </Text>
      <FlatList
        data={items}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <Text style={styles.row}>{item.title}</Text>}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, paddingHorizontal: 20 },
  heading: { fontSize: 24, fontWeight: "600" },
  row: { fontSize: 16, paddingVertical: 12 },
});
