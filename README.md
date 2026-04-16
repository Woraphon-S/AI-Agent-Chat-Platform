# 🚀 MONTO AI - Personal Assistant 💎
> "แพลตฟอร์ม AI สำหรับเป็นผู้ช่วยส่วนตัวในการจัดการข้อมูลและตอบคำถาม เน้นความเรียบง่ายและใช้งานสะดวก"

---

## ✨ จุดเด่นของระบบ (Architectural Highlights)
โปรเจกต์นี้เน้น **โครงสร้างโค้ดที่สะอาดและเป็นระเบียบ** เพื่อให้ง่ายต่อการทำความเข้าใจและพัฒนาต่อ:

- 🏗️ **Clean Architecture:** แบ่งแยกส่วนของ Business Logic, Controller และ Service ออกจากกันอย่างชัดเจนตามมาตรฐานสากล
- 🧠 **Strategy Pattern (LLM Strategy):** มีการออกแบบให้ AI Provider เป็น Plug-and-play สามารถสลับหรือเพิ่มโมเดลอื่น (เช่น GPT-4 หรือ Claude) ได้ในอนาคตโดยไม่ต้องแก้โค้ดหลัก
- ⚡ **Zustand State Management:** ใช้ระบบจัดการสถานะที่เบาและเร็วที่สุดในปัจจุบัน เพื่อประสบการณ์การใช้งานที่ลื่นไหล
- 🔐 **Secure Auth & Profiling:** รองรับการตั้งระบบสมาชิกพร้อมบันทึกภาพ Avatar และ System Prompt ส่วนตัวถาวร

---

## 🛠️ ฟังก์ชันหลัก (Main Features)
- 💬 **Smart Chat:** สนทนากับ Gemini 1.5 Flash พร้อมระบบจำบริบท (Context-Aware)
- 📝 **Auto-Titling:** สรุปหัวข้อการสนทนาและตั้งชื่อห้องแชทให้อัตโนมัติจากข้อความแรก
- 👤 **Profile Customization:** เปลี่ยนชื่อและรูป Profile พร้อมปรับแต่ง "บุคลิก" ของ AI ผ่าน System Instruction
- 🌙 **Simple Dark Mode**: ดีไซน์เรียบง่ายสไตล์ Minimalist ที่เน้นความสบายตาสำหรับการใช้งานระยะยาว

---

## 📦 Tech Stack
| Frontend | Backend | Database & AI |
| :--- | :--- | :--- |
| **React 18** (TypeScript) | **Node.js** (Express) | **Google Gemini AI** |
| **Vite** (Build Tool) | **Prisma ORM** | **MySQL** |
| **Tailwind CSS** | **JWT Authentication** | **Docker & Docker Compose** |
| **Framer Motion** | **Zod** (Validation) | |

---

---

## 📋 สิ่งที่ต้องเตรียมก่อนเริ่ม (Prerequisites)
ก่อนเริ่มใช้งาน คุณจำเป็นต้องติดตั้งโปรแกรมต่อไปนี้ลงในเครื่องของคุณ:

1.  **Docker Desktop:** เพื่อใช้สำหรับรันฐานข้อมูลและระบบทั้งหมด (แนะนำ)
    *   ดาวน์โหลดได้ที่: [Docker Desktop Official](https://www.docker.com/products/docker-desktop/)
2.  **Node.js (v20 หรือสูงกว่า):** สำหรับการจัดการฐานข้อมูล (Prisma)
    *   ดาวน์โหลดได้ที่: [Node.js Official](https://nodejs.org/)

---

## 🚀 วิธีการติดตั้งและเริ่มใช้งาน (Getting Started)

### 1. การเตรียม API Key (สำคัญมาก)
คุณจำเป็นต้องมี **Gemini API Key** เพื่อให้ AI ทำงานได้:
1. เข้าไปที่ [Google AI Studio](https://aistudio.google.com/)
2. เข้าสู่ระบบด้วย Gmail
3. คลิกปุ่ม **"Get API key"** ที่แถบด้านซ้าย
4. คลิก **"Create API key"** 
5. คัดลอก Code ไว้เพื่อนำมาใส่ในขั้นตอนถัดไป

### 2. ตั้งค่าไฟล์ Environment (.env)
1. เข้าไปในโฟลเดอร์ `backend`
2. สร้างไฟล์ชื่อ `.env` (อ้างอิงจากข้อมูลใน `.env.example`) และใส่ข้อมูลดังนี้:
```env
GEMINI_API_KEY=ใส่_KEY_ของคุณที่นี่
JWT_SECRET=monto_ai_secret_key_123456
PORT=5000
DATABASE_URL="mysql://user:user_password@db:3306/ai_agent_db"
```

### 3. รันระบบผ่าน Docker (แนะนำ - ง่ายที่สุด)
รันคำสั่งนี้ที่โฟลเดอร์หลัก (Root) ของโปรเจกต์:
```bash
docker-compose up --build -d
```
*ระบบจะสร้าง Container สำหรับ Database, Backend และ Frontend ให้โดยอัตโนมัติ*

### 4. การจัดการฐานข้อมูล (ครั้งแรกครั้งเดียว)
หลังจากรัน Docker ขึ้นมาแล้ว ให้รันคำสั่งนี้เพื่อให้ Prisma สร้าง Tables:
```bash
cd backend
npm install
npx prisma db push
```

### 5. เข้าใช้งาน
เมื่อรันเสร็จสิ้น สามารถใช้งานผ่านเบราว์เซอร์ได้ที่:
- 🌐 **Frontend:** [http://localhost:3005](http://localhost:3005)
- ⚙️ **Backend API:** [http://localhost:6060/health](http://localhost:6060/health)

---

## 📂 โครงสร้างโฟลเดอร์
- `/frontend`: ระบบหน้าแอปพลิเคชัน (React, Vite, Tailwind)
- `/backend`: ระบบ API และ Logic (Node.js, Prisma, Strategies)
- `docker-compose.yml`: ระบบควบคุมการรันแบบ Multi-container

---
*Created with ❤️ by Woraphon-S.*
