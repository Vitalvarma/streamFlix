# 🎬 StreamFlix

A full-stack **video streaming platform** built using modern web technologies. StreamFlix allows users to browse, watch, and interact with video content through a smooth and responsive interface — similar to platforms like YouTube.

---

## ✨ Features

### 🎥 Video Streaming

* Watch videos directly in the browser using an optimized video player
* Supports Cloudinary-hosted media for fast delivery

### 🔄 Infinite Scroll

* Seamless loading of videos as the user scrolls
* Implemented using **React Query + Intersection Observer**

### 🔍 Search Functionality

* Search videos by title
* Real-time filtering using query parameters

### 🎯 Category Filtering

* Browse videos by categories like:

  * Programming
  * Music
  * Tutorials
  * Gaming

### ❤️ Like System

* Like videos with persistent state using **localStorage**
* Prevents duplicate likes per user
* Updates like count in database

### 🌙 Dark Mode

* Toggle between light and dark themes
* Theme preference is persisted
* Built using **next-themes + Tailwind CSS**

### 🎯 Recommended Videos

* Shows related videos based on category
* Enhances user engagement

### ☁️ Cloudinary Upload Integration

* Upload videos and thumbnails using Cloudinary widget
* Instant preview after upload

---

## 🏗️ Tech Stack

### Frontend

* **Next.js 14 (App Router)**
* **React Query**
* **Tailwind CSS**
* **next-themes**

### Backend

* **Next.js API Routes**
* **Prisma ORM**
* **PostgreSQL**

### Media Storage

* **Cloudinary**

---

## 📂 Project Structure

```
streamflix
│
├── app
│   ├── page.tsx
│   ├── watch/[id]/page.tsx
│   ├── api/videos
│
├── components
│   ├── VideoCard.tsx
│   ├── LikeButton.tsx
│   ├── Navbar.tsx
│   ├── ThemeToggle.tsx
│
├── hooks
│   ├── useVideos.ts
│   ├── useVideo.ts
│
├── lib
│   ├── prisma.ts
│
├── prisma
│   └── schema.prisma
```

---

## ⚙️ Installation & Setup

### 1️⃣ Clone Repository

```bash
git clone https://github.com/your-username/streamflix.git
cd streamflix
```

---

### 2️⃣ Install Dependencies

```bash
npm install
```

---

### 3️⃣ Setup Environment Variables

Create a `.env` file:

```env
DATABASE_URL=your_postgresql_url
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloud_name
```

---

### 4️⃣ Run Database Migration

```bash
npx prisma migrate dev
```

---

### 5️⃣ Start Development Server

```bash
npm run dev
```

---

## 📡 API Endpoints

| Method | Endpoint          | Description                        |
| ------ | ----------------- | ---------------------------------- |
| GET    | `/api/videos`     | Fetch all videos (with pagination) |
| GET    | `/api/videos/:id` | Get single video + recommendations |
| POST   | `/api/videos`     | Upload new video                   |
| PATCH  | `/api/videos/:id` | Increment views                    |
| PUT    | `/api/videos/:id` | Like a video                       |

---

## 🧠 Key Concepts Implemented

* Server Components & Client Components (Next.js App Router)
* Dynamic Routing (`/watch/[id]`)
* Infinite Scrolling
* Optimistic UI updates
* REST API design
* Cloudinary integration
* State management with React Query
* Dark mode implementation

## 🏆 Future Improvements

* 🔐 Authentication (JWT / NextAuth)
* 📊 Video analytics dashboard
* 🎬 Video upload progress bar
* 💬 Comments system
* 📁 Playlist feature
* 🤖 AI-based recommendations

---