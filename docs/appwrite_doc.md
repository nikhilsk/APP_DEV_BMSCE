# Appwrite Integration Guide

A complete step-by-step guide for connecting an Expo React Native app to Appwrite — covering Console setup, code wiring, and common pitfalls.

---

## What Is Appwrite?

Appwrite is an open-source Backend-as-a-Service (BaaS). It gives you:

| Service | What it does |
|---|---|
| **Databases** | Store and query structured documents (like Firestore) |
| **Auth** | Sign up / login / sessions |
| **Storage** | File uploads |
| **Functions** | Server-side code (like Lambda) |

In this workshop we use only **Databases** — reading and writing form submissions.

---

## Part 1 — Appwrite Console Setup

### Step 1: Create an account

Go to [https://cloud.appwrite.io](https://cloud.appwrite.io) and sign up.

---

### Step 2: Create a Project

1. Click **"Create Project"**
2. Give it a name — e.g. `WorkshopApp`
3. Click **Create**
4. You will land on the project dashboard

> Copy your **Project ID** from the dashboard. It looks like: `69b44ab00018538ed108`

---

### Step 3: Add a Platform

Appwrite blocks requests unless the platform (app bundle ID) is registered.

1. In your project, go to **Overview → Add Platform**
2. Choose **React Native**
3. For **Bundle ID (Android)** / **Bundle ID (iOS)** enter: `dev.bmsce.main`  
4. Click **Next**

After adding the platform, Appwrite will show you a **"Getting Started"** screen with your env variables pre-filled. It will look like this:

```env
EXPO_PUBLIC_APPWRITE_PROJECT_ID=xxxxxxxxxxxxxxxxxxxx
EXPO_PUBLIC_APPWRITE_ENDPOINT=https://sgp.cloud.appwrite.io/v1
```

**Copy these values — you will need them in the next step.**

5. Click **Next** / **Skip** to finish the wizard

> ⚠️ If the platform is missing or mismatched, Appwrite returns a `401` or an **"app_list" / "platform_not_found"** error at runtime.

---

### Step 4: Create a Database

1. In the left sidebar, click **Databases**
2. Click **"Create Database"**
3. Set the **Database ID** to: `workshop`  
   *(The ID is what the code uses — not the display name)*
4. Click **Create**

---

### Step 5: Create a Collection

1. Inside the `workshop` database, click **"Create Collection"**
2. Set the **Collection ID** to: `table1`
3. Click **Create**

---

### Step 6: Add Attributes (Columns)

Appwrite collections are **schema-enforced** — you must define every field before writing data.

Click **Attributes → Create Attribute** and add these three:

| Attribute Key | Type | Size | Required |
|---|---|---|---|
| `name` | String | 100 | Yes |
| `email` | String | 100 | Yes |
| `course` | String | 100 | Yes |

> The keys must exactly match what your app sends — they are **case-sensitive**.

---

### Step 7: Set Permissions

By default, Appwrite denies all access. You must explicitly grant it.

1. Inside the `table1` collection, go to the **Settings** tab
2. Scroll to **Permissions**
3. Click **"Add Role"** → Choose **Any** (or `guests` for unauthenticated users)
4. Check both ✅ **Create** and ✅ **Read**
5. Click **Update**

> ⚠️ A permissions error looks like: `AppwriteException: Missing scope (documents.write)` or `(documents.read)`. Always check permissions first when you get a 401/403.

---

## Part 2 — Project Code Setup

### Step 1: Install the SDK

```bash
npm install react-native-appwrite react-native-url-polyfill --legacy-peer-deps
```

- `react-native-appwrite` — official Appwrite SDK for React Native
- `react-native-url-polyfill` — required because React Native's JS engine lacks the browser's `URL` API that the SDK depends on

---

### Step 2: Create the `.env` file

In the **root of your project** (same folder as `package.json`), create a new file called exactly `.env` — no other extension.

Paste the values you copied from the Appwrite platform screen, plus the database and collection IDs:

```env
EXPO_PUBLIC_APPWRITE_PROJECT_ID=paste_your_project_id_here
EXPO_PUBLIC_APPWRITE_ENDPOINT=paste_your_endpoint_here
EXPO_PUBLIC_APPWRITE_DATABASE_ID=workshop
EXPO_PUBLIC_APPWRITE_COLLECTION_ID=table1
```

> The last two (`DATABASE_ID` and `COLLECTION_ID`) are fixed — they must match the IDs you set in Console Steps 4 and 5.

**Why `EXPO_PUBLIC_` prefix?**  
Expo only exposes environment variables to your app bundle if they start with `EXPO_PUBLIC_`. Without this prefix, `process.env.YOUR_VAR` returns `undefined` at runtime.

> ⚠️ The `.env` file **must be in the project root** — not inside `lib/` or any subfolder. Expo does not scan subdirectories for `.env`.

> ⚠️ `.env` is already in `.gitignore` — your credentials will never be committed to git.

---

### Step 3: Create `lib/appwrite.js`

```javascript
import { Client, Databases, ID } from 'react-native-appwrite';

const client = new Client()
  .setEndpoint(process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT)
  .setProject(process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID)
  .setPlatform('dev.bmsce.main'); // must match the Platform you registered in the Console

const databases = new Databases(client);

const DATABASE_ID = process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID;
const COLLECTION_ID = process.env.EXPO_PUBLIC_APPWRITE_COLLECTION_ID;

export const createSubmission = async (data) => {
  return await databases.createDocument(DATABASE_ID, COLLECTION_ID, ID.unique(), data);
};

export const getSubmissions = async () => {
  const res = await databases.listDocuments(DATABASE_ID, COLLECTION_ID);
  return res.documents;
};
```

**Breaking down the client setup:**

| Method | What it does |
|---|---|
| `setEndpoint(...)` | The URL of your Appwrite instance (cloud URL or self-hosted) |
| `setProject(...)` | Tells Appwrite which project to use |
| `setPlatform(...)` | Identifies your app — must match the registered Platform bundle ID |

**Breaking down the database calls:**

| Call | Appwrite method | What it does |
|---|---|---|
| `createDocument(db, col, ID.unique(), data)` | `Databases.createDocument` | Inserts a new document with a random unique ID |
| `listDocuments(db, col)` | `Databases.listDocuments` | Fetches all documents in the collection |

---

### Step 4: Create `app/form.jsx`

This page collects three inputs and calls `createSubmission`.

```jsx
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { createSubmission } from '../lib/appwrite';

export default function Form() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [course, setCourse] = useState('');

  const handleSubmit = async () => {
    await createSubmission({ name, email, course });
    Alert.alert('Success!', 'Submitted!');
    router.push('/submissions');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Register</Text>
      <TextInput style={styles.input} placeholder="Name"   value={name}   onChangeText={setName} />
      <TextInput style={styles.input} placeholder="Email"  value={email}  onChangeText={setEmail} />
      <TextInput style={styles.input} placeholder="Course" value={course} onChangeText={setCourse} />
      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Submit</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container:  { flex: 1, padding: 24, justifyContent: 'center', backgroundColor: '#fff' },
  title:      { fontSize: 28, fontWeight: 'bold', marginBottom: 24 },
  input:      { borderWidth: 1, borderColor: '#ddd', borderRadius: 10, padding: 14, marginBottom: 16, fontSize: 16 },
  button:     { backgroundColor: '#6366F1', padding: 16, borderRadius: 10, alignItems: 'center' },
  buttonText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
});
```

**Key concepts used here:**

| Concept | Explanation |
|---|---|
| `useState('')` | One state variable per input field |
| `onChangeText={setName}` | Updates state every time the user types |
| `async handleSubmit` | Awaits the Appwrite call before showing the alert |
| `router.push('/submissions')` | Navigates to the submissions page after a successful submit |

---

### Step 5: Create `app/submissions.jsx`

This page fetches all documents and renders them in a list.

```jsx
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { getSubmissions } from '../lib/appwrite';

export default function Submissions() {
  const [submissions, setSubmissions] = useState([]);

  useEffect(() => {
    getSubmissions().then(setSubmissions);
  }, []);

  return (
    <FlatList
      data={submissions}
      keyExtractor={(item) => item.$id}
      contentContainerStyle={styles.list}
      ListHeaderComponent={<Text style={styles.title}>Submissions</Text>}
      renderItem={({ item }) => (
        <View style={styles.card}>
          <Text style={styles.name}>{item.name}</Text>
          <Text style={styles.sub}>{item.email}</Text>
          <Text style={styles.sub}>{item.course}</Text>
        </View>
      )}
    />
  );
}

const styles = StyleSheet.create({
  list:  { padding: 24, backgroundColor: '#fff', flexGrow: 1 },
  title: { fontSize: 28, fontWeight: 'bold', marginBottom: 20 },
  card:  { borderWidth: 1, borderColor: '#E2E8F0', borderRadius: 12, padding: 16, marginBottom: 12 },
  name:  { fontSize: 16, fontWeight: 'bold', color: '#0F172A' },
  sub:   { fontSize: 14, color: '#64748B', marginTop: 4 },
});
```

**Key concepts used here:**

| Concept | Explanation |
|---|---|
| `useEffect(() => { ... }, [])` | Runs once when the component mounts — ideal for data fetching |
| `.then(setSubmissions)` | Short-hand for `.then(data => setSubmissions(data))` |
| `item.$id` | Every Appwrite document has a built-in `$id` field — perfect for `keyExtractor` |
| `ListHeaderComponent` | Renders a header above the list items (title lives here so it scrolls with the list) |

---

### Step 6: Register routes in `app/_layout.jsx`

Make sure `form` and `submissions` are in your Stack:

```jsx
import { Stack } from 'expo-router';

export default function Layout() {
  return (
    <Stack>
      <Stack.Screen name="index"        options={{ title: 'Home' }} />
      <Stack.Screen name="form"         options={{ title: 'Register' }} />
      <Stack.Screen name="submissions"  options={{ title: 'Submissions' }} />
      {/* ...other screens */}
    </Stack>
  );
}
```

---

## Part 3 — How It All Connects

```
┌─────────────────────────────────────────────────────────────────┐
│                         Expo App                                │
│                                                                 │
│  app/form.jsx                                                   │
│    └── calls createSubmission({ name, email, course })          │
│           │                                                     │
│  lib/appwrite.js                                                │
│    └── databases.createDocument('workshop', 'table1', ...)      │
│           │                                                     │
│           ▼                                                     │
│  .env (root)                                                    │
│    EXPO_PUBLIC_APPWRITE_ENDPOINT   → https://sgp.cloud.appwrite.io/v1
│    EXPO_PUBLIC_APPWRITE_PROJECT_ID → 69b44ab00018538ed108       │
└─────────────────────────────────────────────────────────────────┘
           │
           ▼  HTTPS
┌──────────────────────────────────┐
│     Appwrite Cloud Console       │
│                                  │
│  Project: WorkshopApp            │
│  Platform: dev.bmsce.main ✓      │
│  Database: workshop              │
│    Collection: table1            │
│      Permissions: Any → Create+Read
│      Attributes: name, email, course
└──────────────────────────────────┘
```

---

## Part 4 — Common Errors & Fixes

| Error | Cause | Fix |
|---|---|---|
| `process.env.EXPO_PUBLIC_... is undefined` | `.env` is not in the project root | Move `.env` to the same folder as `package.json` |
| `AppwriteException: Missing scope (documents.write)` | Permissions not set | Go to Collection → Settings → Permissions → Add Any → Create |
| `AppwriteException: Missing scope (documents.read)` | Read permission missing | Same as above, also check Read |
| `platform_not_found` / 401 on init | Bundle ID not registered | Console → Overview → Add Platform → use same string as `.setPlatform()` |
| `URL is not a constructor` | Missing URL polyfill | `npm install react-native-url-polyfill` and import it |
| `Attribute not found` | Attribute key typo or not created | Console → Collection → Attributes — check exact key names |
| App crashes on Expo Go with native module error | Library needs native build (e.g. reanimated) | Use bare workflow or Expo Development Build, or use an Expo-compatible alternative |

---

## Part 5 — ID Rules & Naming Conventions

| Thing | Rule |
|---|---|
| Database ID | Lowercase letters, numbers, hyphens — **no spaces** |
| Collection ID | Same rules — must match `COLLECTION_ID` in code exactly |
| Attribute keys | Case-sensitive — `name` ≠ `Name` |
| Platform bundle ID | Reverse-domain format — e.g. `com.company.appname` |
| `EXPO_PUBLIC_` prefix | Required for all env vars used inside the app bundle |

---

## Part 6 — Extending This Setup

### Add loading state to submissions

```jsx
const [loading, setLoading] = useState(true);

useEffect(() => {
  getSubmissions()
    .then(setSubmissions)
    .finally(() => setLoading(false));
}, []);

if (loading) return <ActivityIndicator />;
```

### Add error handling to form submit

```jsx
const handleSubmit = async () => {
  try {
    await createSubmission({ name, email, course });
    Alert.alert('Success!', 'Submitted!');
    router.push('/submissions');
  } catch (err) {
    Alert.alert('Error', err.message);
  }
};
```

### Add a query / filter

```javascript
import { Query } from 'react-native-appwrite';

export const getByName = async (name) => {
  const res = await databases.listDocuments(DATABASE_ID, COLLECTION_ID, [
    Query.equal('name', name),
  ]);
  return res.documents;
};
```

### Delete a document

```javascript
export const deleteSubmission = async (documentId) => {
  return await databases.deleteDocument(DATABASE_ID, COLLECTION_ID, documentId);
};
```

---

## Quick Reference

```
npx create-expo-app@latest WorkshopApp --template blank@sdk-54
npm install react-native-appwrite react-native-url-polyfill --legacy-peer-deps
```

**File checklist:**

```
WorkshopApp/
├── .env                    ← EXPO_PUBLIC_ vars — MUST be in root
├── lib/
│   └── appwrite.js         ← Client setup + createSubmission + getSubmissions
└── app/
    ├── _layout.jsx         ← Stack with form + submissions registered
    ├── form.jsx            ← 3 TextInputs + Submit button
    └── submissions.jsx     ← useEffect fetch + FlatList render
```

**Console checklist:**

```
✅ Project created
✅ Platform added (bundle ID matches .setPlatform())
✅ Database created (ID = 'workshop')
✅ Collection created (ID = 'table1')
✅ Attributes added: name, email, course (all String, Required)
✅ Permissions: Any → Create + Read
```
