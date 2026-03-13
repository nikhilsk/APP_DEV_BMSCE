import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: "Home" }} />
      <Stack.Screen name="dashboard" options={{ title: "Dashboard" }} />
      <Stack.Screen name="profile" options={{ title: "Profile" }} />
      <Stack.Screen name="settings" options={{ title: "Settings" }} />
      <Stack.Screen name="contact" options={{ title: "Contact" }} />
      <Stack.Screen name="form" options={{ title: "Register" }} />
      <Stack.Screen name="submissions" options={{ title: "Submissions" }} />
    </Stack>
  );
}
