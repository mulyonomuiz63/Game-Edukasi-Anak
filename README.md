# Petualangan Belajar Kiko & Kiki 🦊🐰

Game edukasi interaktif ceria untuk anak usia 3-6 tahun mengenal huruf (fonik), berhitung angka, bentuk, warna, dan sosial-emosional bersama karakter Kiko si Rubah dan Kiki si Kelinci.

---

## 🚀 Panduan Menjalankan di Komputer / Laptop Lokal

### 1. Prasyarat
Pastikan laptop Anda sudah terinstal **Node.js** (versi 18, 20, atau lebih baru).
- Cek versi Node.js dengan perintah:
  ```bash
  node -v
  npm -v
  ```
- Jika belum terinstal, unduh versi LTS di: [https://nodejs.org/](https://nodejs.org/)

---

### 2. Buka Terminal / CMD di Folder Proyek
Buka terminal (Command Prompt, PowerShell, Terminal macOS, atau Git Bash) dan pastikan Anda berada di direktori proyek hasil clone:
```bash
cd petualangan-belajar-kiko-kiki
```

---

### 3. Pasang Dependensi (Install Packages)
Unduh seluruh library yang dibutuhkan:
```bash
npm install
```

---

### 4. Siapkan File Environment (Opsional)
Salin contoh environment file:
```bash
cp .env.example .env
```
*(Di Windows PowerShell/CMD bisa gunakan: `copy .env.example .env`)*

---

### 5. Jalankan Server Pengembangan (Dev Server)
Jalankan perintah berikut:
```bash
npm run dev
```

Terminal akan menampilkan pesan seperti:
```
  VITE v8.x.x  ready in ... ms

  ➜  Local:   http://localhost:3000/
  ➜  Network: http://...:3000/
```

---

### 6. Buka di Browser
Buka Google Chrome, Edge, atau Safari, lalu buka alamat:
👉 **`http://localhost:3000`**

Nikmati bermain dan belajar bersama Kiko & Kiki! 🎉

---

## 📦 Perintah Berguna Lainnya
- **Build untuk Production**:
  ```bash
  npm run build
  ```
- **Preview Hasil Build**:
  ```bash
  npm run preview
  ```
- **Pemeriksaan Tipe (Linting)**:
  ```bash
  npm run lint
  ```
