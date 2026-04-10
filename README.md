# 🚀 AI-Agent-Chat-Platform

แพลตฟอร์มแชท AI ระดับมืออาชีพที่ออกแบบมาเพื่อแสดงทักษะการทำ **Multi-SDK Integration** โดยใช้สถาปัตยกรรมแบบ **Clean Architecture** รองรับการเชื่อมต่อกับผู้ให้บริการ AI หลายราย (Gemini, OpenAI) ผ่านระบบ **Strategy Pattern** ที่ยืดหยุ่น

## ✨ Key Technical Highlights

- 🧠 **Professional SDK Integration**: แสดงทักษะการใช้งาน Official SDKs จากผู้ให้บริการระดับโลก (Google Generative AI SDK & OpenAI SDK) อย่างลึกซึ้ง
- 🔌 **Provider Strategy Pattern**: ออกแบบระบบให้รองรับการสลับเปลี่ยนและเพิ่ม AI Provider ใหม่ๆ ได้โดยไม่ต้องแก้ไขโค้ดส่วนหลัก
- 🔑 **API Key Management**: ระบบจัดเก็บและจัดการ API Key แยกตามรายผู้ใช้
- 🎨 **Minimalist UI**: ดีไซน์เรียบหรูสไตล์ขาว-ดำ-น้ำเงิน พร้อม Animations ที่ลื่นไหล (Framer Motion)
- 🐳 **Full Dockerization**: รองรับการรันผ่าน Docker ทั้งระบบ (Frontend, Backend, Database)

---

## 🛠️ Tech Stack

### Frontend
- **React 18** + **TypeScript**
- **Vite** (Build Tool)
- **Tailwind CSS** (Styling)
- **Zustand** (State Management)
- **Framer Motion** (Animations)
- **Lucide React** (Icons)

### Backend
- **Node.js** + **Express**
- **TypeScript**
- **Prisma ORM** (Database Management)
- **JWT** (Authentication)
- **Gemini & OpenAI SDKs**

### Database & Infrastructure
- **MySQL** 8.0
- **Docker** & **Docker Compose**

---

## 📦 Getting Started (วิธีติดตั้งและเริ่มใช้งาน)

### Prerequisites (สิ่งที่ต้องมี)
- [Docker Desktop](https://www.docker.com/products/docker-desktop/)
- [Node.js](https://nodejs.org/) (สำหรับรันคำสั่ง Prisma)

### 1. Clone the repository
```bash
git clone https://github.com/Woraphon-S/AI-Agent-Chat-Platform.git
cd AI-Agent-Chat-Platform
```

### 2. Configuration (ตั้งค่า Environment)
เข้าสู่โฟลเดอร์ `/backend` และสร้างไฟล์ `.env` :
```bash
cp backend/.env.example backend/.env
```
จากนั้นเปิดไฟล์ `.env` และใส่ API Key ของคุณ:
- `GEMINI_API_KEY`
- `OPENAI_API_KEY`
- `JWT_SECRET` (ตั้งค่าข้อความลับสำหรับความปลอดภัย)

### 3. Start the containers
รันระบบทั้งหมดผ่าน Docker Compose:
```bash
docker-compose up --build -d
```

### 4. Database Setup (Prisma Migration)
รันคำสั่งเพื่อให้ Prisma สร้าง Tables ในฐานข้อมูล MySQL:
```bash
cd backend
npm install
npx prisma db push
```

---

## 📂 Project Structure
```text
/AI-Agent-Chat-Platform
  ├── backend/          # Node.js + Express API
  │   ├── prisma/       # Schema ฐานข้อมูล
  │   └── src/          # โค้ด Backend แยกสัดส่วนชัดเจน
  ├── frontend/         # React Application
  │   └── src/          # UI Components & Logic
  └── docker-compose.yml # การตั้งค่า Container ทั้งระบบ
```

---
*Created with ❤️ for professional portfolio and resume.*
