# 🛠️ Developer Guide: Components and APIs

This guide explains the core React Native and Expo components used in our workshop app. Use this as a reference to understand how each building block works.

---

## 🏗️ Core UI Components

### 1. `View`
The most fundamental component for building UI. It is a container that supports layout with **Flexbox**, style, and touch handling.
*   **Think of it as:** A `<div>` in HTML.
*   **Usage:** Used to wrap other components and create layouts.

### 2. `Text`
A component for displaying text. In React Native, all text **must** be wrapped in a `<Text>` component.
*   **Think of it as:** A `<p>` or `<span>`.
*   **Tip:** You cannot put text directly inside a `<View>`.

### 3. `Image`
Used to display images from local folders or the internet.
*   **Local:** `source={require('./path/to/img.png')}`
*   **Remote:** `source={{ uri: 'https://link.com/img.png' }}`

### 4. `TouchableOpacity`
A wrapper for making views respond properly to touches. When pressed, the opacity of the wrapped view is decreased, providing visual feedback.
*   **Think of it as:** A more flexible `<button>`.

---

## 📜 Scrolling & Lists

### 5. `ScrollView`
A generic scrolling container that can contain multiple components and views.
*   **Usage:** Best for pages with a small, fixed amount of content (like our Dashboard).

### 6. `FlatList`
A performant interface for rendering basic, flat lists.
*   **Why use it?** It only renders items that are currently visible on the screen, making it much faster than a ScrollView for long lists.
*   **Key Props:** `data`, `renderItem`, and `keyExtractor`.

---

## ⌨️ Inputs & Forms

### 7. `TextInput`
A foundational component for inputting text into the app via a keyboard.
*   **Props:** `onChangeText`, `value`, `placeholder`, `multiline`.

### 8. `KeyboardAvoidingView`
A component to solve the common problem of views that need to move out of the way of the virtual keyboard.
*   **Usage:** Crucial for form pages (like our Contact page) so the keyboard doesn't hide the text input.

---

## 🗺️ Navigation

### 9. `Link` (from `expo-router`)
A component to navigate between different pages in your app. It uses file-based routing.
*   **Think of it as:** An `<a>` tag in HTML.

---

## 📁 File-Based Routing & `_layout.jsx`

### 10. `_layout.jsx` — The Root Layout
`_layout.jsx` is a **special file** in `expo-router`. It is the **wrapper that surrounds every page** in your app. Think of it as the "frame" of your app.

*   **Where it lives:** `app/_layout.jsx`
*   **Why it matters:** Every screen in the `app/` folder is rendered *inside* this layout.
*   **What it controls:**
    *   The **navigation stack** (how screens slide in/out).
    *   **Global imports** — anything you import here (like fonts or global styles) applies to ALL pages.
    *   **Header titles** for each screen via `Stack.Screen`.

#### Example from our app:
```jsx
import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: "Home" }} />
      <Stack.Screen name="dashboard" options={{ title: "Dashboard" }} />
    </Stack>
  );
}
```

#### Key Concepts:
| Term | Meaning |
|---|---|
| `Stack` | A navigator where screens are stacked on top of each other (like a pile of cards). |
| `Stack.Screen` | Registers a page and lets you set its header title, hide the header, etc. |
| `name` prop | Must match the **filename** inside the `app/` folder (e.g., `"dashboard"` → `app/dashboard.jsx`). |
| `options` prop | Controls the header — `title`, `headerShown: false` to hide it, etc. |

#### 💡 Workshop Tip:
To **hide the header** on a specific page, add `headerShown: false` to its options:
```jsx
<Stack.Screen name="index" options={{ headerShown: false }} />
```

---

## 🎨 Styling with `StyleSheet`
In React Native, we don't use CSS files. Instead, we use `StyleSheet.create()` to define our styles using JavaScript objects. Common properties include:
*   `flex: 1` (Take up all available space)
*   `justifyContent` (Align along main axis)
*   `alignItems` (Align along cross axis)
*   `padding`, `margin`, `borderRadius`

---

## 📚 Official Resources
For deeper dives and a full list of props, visit:
*   [React Native Official Docs](https://reactnative.dev/docs/components-and-apis)
*   [Expo Documentation](https://docs.expo.dev/)
*   [Expo Router Guide](https://docs.expo.dev/router/introduction/)
