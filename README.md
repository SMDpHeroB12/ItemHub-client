# ItemHub – Client

## 📌 Short Project Description

ItemHub is a modern, responsive item listing application where users can browse items publicly, view full item details, and securely add new items after authentication.  
The client focuses on clean UI, light/dark mode compatibility, smooth animations, and real-world authentication & image upload flows.

---

## 🌐 Live Client

https://item-hub-client.vercel.app

---

## ⚙️ Setup & Installation Instructions

### Prerequisites

- Node.js (LTS)
- npm

### Installation Steps

```bash
git clone https://github.com/SMDpHeroB12/ItemHub-client.git
cd ItemHub-client
npm install
```

### Run the Project

```bash
npm run dev
```

Client runs on: http://localhost:3000

---

## 🧭 Route Summary

| Route         | Description              |
| ------------- | ------------------------ |
| `/`           | Home page                |
| `/items`      | Public item listing      |
| `/items/[id]` | Item details page        |
| `/add-item`   | Add new item (protected) |
| `/login`      | Login page               |
| `/api/auth/*` | NextAuth routes          |

---

## ✅ Implemented Features

- Public item listing
- Item details with full data view
- Secure authentication (Credentials & Google)
- Protected add-item route
- Image upload from local device
- Instant image preview before upload
- Secure server-side ImgBB upload
- Light / Dark mode toggle
- Fully responsive UI
- GSAP-based subtle animations
- Toast & modal notifications

---

## 🧠 Brief Feature Explanation

- **Authentication:**  
  Implemented using NextAuth.js with Credentials and Google providers.

- **Image Upload:**  
  Images are selected locally, previewed instantly, uploaded to the server, and then forwarded securely to ImgBB.

- **Protected Routes:**  
  Only authenticated users can access the Add Item page.

- **UI & UX:**  
  Tailwind CSS, DaisyUI, and GSAP ensure a clean, modern, and smooth user experience.

---

## 👨‍💻 Author

SHEKH MD NAYEM YOUSUF
