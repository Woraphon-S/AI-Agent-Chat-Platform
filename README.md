# 🚀 MONTO AI - Personal Assistant

แพลตฟอร์มแชท AI ระดับมืออาชีพที่ออกแบบมาด้วยแนวคิด **Minimalist & Premium** ขับเคลื่อนด้วยขุมพลัง **Google Gemini** ภายใต้สถาปัตยกรรมแบบ **Clean Architecture** และ **Strategy Pattern** ที่มีความยืดหยุ่นสูง

---

## 🛠️ ฟังก์ชันหลักของระบบ (Main Functions)

- 💬 **Smart Chat & Personalized AI**: สนทนากับ AI อัจฉริยะ (Gemini Pro) ที่สามารถปรับแต่งบุคลิกและคำสั่งระบบ (System Prompt) ได้ตามความต้องการของผู้ใช้
- 📝 **Auto-Generated Chat Titles**: ระบบจะช่วยสรุปหัวข้อการสนทนาและตั้งชื่อแชทให้อัตโนมัติจากข้อความแรกที่คุณส่ง
- 👤 **User Profile & Avatar Management**: จัดการข้อมูลส่วนตัว เลือกภาพโปรไฟล์ (Avatar) และชื่อแสดงผลที่ต้องการ โดยระบบจะบันทึกข้อมูลไว้ถาวรภายใต้บัญชีของคุณ
- 🌙 **Modern & Responsive UI**: อินเทอร์เฟซที่ออกแบบมาให้มีความพรีเมียมด้วย Dark Mode เป็นค่าเริ่มต้น พร้อมแอนิเมชันที่ลื่นไหล รองรับการใช้งานจากทุกอุปกรณ์
- 🔐 **Privacy & Secure Storage**: ระบบลงทะเบียนและเข้าสู่ระบบที่ปลอดภัย แยกข้อมูลแชทและประวัติการสนทนาส่วนตัวตามรายผู้ใช้

---

## 🛠️ Tech Stack

### **Frontend**
- **React 18** + **TypeScript**
- **Vite** (Next-gen Build Tool)
- **Zustand** (State Management - Lightweight & Fast)
- **Tailwind CSS** (Styling with Custom Design System)
- **Framer Motion** (Premium Animations)
- **Sonner** (State-of-the-art Notifications)

### **Backend**
- **Node.js** + **Express**
- **TypeScript**
- **Prisma ORM** (Modern Database Management)
- **JWT** (Secure Authentication)
- **Google Generative AI SDK** (Official Gemini Integration)

---

## 📦 การติดตั้งและเริ่มใช้งาน

### 1. Clone the repository
```bash
git clone https://github.com/Woraphon-S/AI-Agent-Chat-Platform.git
cd AI-Agent-Chat-Platform
```

### 2. ตั้งค่า Environment (.env)
เข้าสู่โฟลเดอร์ `/backend` และสร้างไฟล์ `.env` :
```bash
cp backend/.env.example backend/.env
```
ใส่ค่า API Key ของคุณ:
- `GEMINI_API_KEY` (รับได้ที่ Google AI Studio)
- `DATABASE_URL` (Link สำหรับเชื่อมต่อ MySQL)
- `JWT_SECRET` (กำหนดความลับสำหรับ Token)

### 3. รันระบบผ่าน Docker
รันระบบทั้งหมดด้วยคำสั่งเดียว:
```bash
docker-compose up --build -d
```

### 4. Database Setup
รันคำสั่งเพื่อให้ Prisma สร้าง Tables:
```bash
cd backend
npm install
npx prisma db push
```

---

## 📂 โครงสร้างโปรเจกต์
```text
/AI-Agent-Chat-Platform
  ├── backend/          # Node.js API (Clean Service Layer)
  │   ├── prisma/       # Database Schema & Migrations
  │   └── src/          # Logic, Strategies & Controllers
  ├── frontend/         # React Application (Modular UI)
  │   └── src/          # Stores, Components & Styling
  └── docker-compose.yml # Container Orchestration
```

---
*Created with ❤️ by Woraphon-S for MONTO AI Innovation.*
