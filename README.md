# 📱 React Native / Expo 2-Hour Workshop

Welcome to the React Native workshop! In this session, we'll build a multi-page interactive application while learning the core fundamentals of mobile development.

---

## ⚡ Clone & Run This Repo

```bash
# 1. Clone
git clone https://github.com/nikhilsk/APP_DEV_BMSCE.git
cd APP_DEV_BMSCE

# 2. Install dependencies
npm install --legacy-peer-deps

# 3. Set up environment variables
cp .env.example .env
# Then open .env and fill in your Appwrite Project ID and Endpoint

# 4. Start the app
npx expo start
```

Then **scan the QR code** with the Expo Go app on your phone.

> ⚠️ `.env` is never committed to git (it contains secrets). You must copy `.env.example` → `.env` and fill in your own Appwrite credentials. See [`appwrite_doc.md`](./appwrite_doc.md) for the full setup guide.

---

## 🚀 1. Getting Started From Scratch

### Prerequisites
- **Node.js** installed on your machine.
- **Expo Go** app installed on your physical Android or iOS device.

### Create the Project
Run the following commands in your terminal:

```bash
npx create-expo-app@latest MyWorkshopApp --template blank@sdk-54
```

> 💡 **Available Templates (replace `sdk-54` with your Expo Go SDK version):**
> | Template | What you get |
> |---|---|
> | `--template default@sdk-54` | `expo-router`, `app/` folder, file-based navigation ✅ Use this |
> | `--template blank@sdk-54` | Just `App.js`, no navigation, great for simple demos |
> | `--template blank-typescript@sdk-54` | Same as blank but with TypeScript |
> | `--template tabs@sdk-54` | Tab-based navigation with expo-router |

> ✅ **Pro Tip:** Using `@sdk-54` in the template name pins the project to Expo SDK 54, matching your Expo Go app version and avoiding the version mismatch error entirely!

```bash
# Navigate into the project folder
cd MyWorkshopApp

# Start the development server
npx expo start
```

---

## ⚠️ 2. Troubleshooting: SDK Version Mismatch

If you scan the QR code and see the error:  
> **"Project is incompatible with this version of Expo Go. This project requires a newer version..."**

It means your phone's Expo Go app is out of date, or the project is using a version not yet supported by the app stores.

### How to Fix:
1.  **Check your phone's SDK version:** Open Expo Go -> Settings (usually displayed at the bottom).
2.  **Update `package.json`:** Manually change the `"expo"` version to match your phone (e.g., `"~52.0.0"` or `"~54.0.0"`).
3.  **Sync Dependencies:** Run these commands to clean and reinstall:
    ```bash
    # Remove old modules
    rm -rf node_modules package-lock.json

    # Reinstall correct versions
    npm install --legacy-peer-deps

    # Sync Expo versions
    npx expo install --fix

    # Restart with clear cache
    npx expo start -c
    ```

---

## 🏗️ 3. What We Are Building: "The Multi-Suite Demo"

Instead of a single-purpose app, we are building a **5-Page Suite** designed to teach every major concept a beginner needs:

### 🏠 Home Page (`app/index.jsx`)
*   **Concepts:** Basic Layouts, Local/Remote Images, and Routing.
*   **Goal:** Understand how the file-based router works.

### 📊 Dashboard (`app/dashboard.jsx`)
*   **Concepts:** `ScrollView`, Grid Layouts using Flexbox, and `TouchableOpacity` for custom buttons.
*   **Goal:** Learn how to create complex, modern UI structures.

### 👤 Profile (`app/profile.jsx`)
*   **Concepts:** Circular images, Border styling, and structured "Info Rows."
*   **Goal:** Master pixel-perfect styling and spacing.

### ⚙️ Settings (`app/settings.jsx`)
*   **Concepts:** `FlatList` component and performance optimization for lists.
*   **Goal:** Understand the difference between scrolling a `View` vs. a `FlatList`.

### ✉️ Contact (`app/contact.jsx`)
*   **Concepts:** Forms, `TextInput`, `useState` (React Hooks), and `KeyboardAvoidingView`.
*   **Goal:** Learn how to handle user input without the keyboard covering the screen.

---

## 🎓 4. Core Concepts Checklist
- [ ] **Views & Text:** The `div` and `span` of mobile.
- [ ] **Flexbox:** Everything is `flexDirection: 'column'` by default!
- [ ] **State:** Using `useState` to make the app interactive.
- [ ] **Navigation:** Moving between files using `expo-router`.
- [ ] **Native Components:** Using `Image`, `ScrollView`, and `TouchableOpacity`.

---

Happy Coding! 🚀
