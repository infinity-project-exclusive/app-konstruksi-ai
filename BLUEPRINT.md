# Technical Blueprint: IndoConstruct AI

## 1. Skema Database (PostgreSQL / Supabase)

Berikut adalah rancangan relasional untuk sistem SaaS konstruksi:

### Tabel: `users`
| Kolom | Tipe | Deskripsi |
|-------|------|-----------|
| `id` | UUID | Primary Key (Auth.uid) |
| `email` | String | Alamat email user |
| `role` | Enum | `super_admin`, `contractor`, `customer` |
| `credits` | Integer | Saldo kredit AI |
| `preferences` | JSONB | Pengaturan notifikasi (email, in-app) |
| `created_at` | Timestamp | Waktu pendaftaran |

### Tabel: `projects`
| Kolom | Tipe | Deskripsi |
|-------|------|-----------|
| `id` | UUID | Primary Key |
| `contractor_id` | UUID | Foreign Key -> `users.id` |
| `client_id` | UUID | Foreign Key -> `users.id` (Opsional) |
| `client_name` | String | Nama klien end-user |
| `title` | String | Judul proyek (misal: Rumah Minimalis 45m2) |
| `status` | Enum | `planning`, `in_progress`, `completed` |
| `share_token` | String | Token unik untuk link white-label klien |

### Tabel: `milestones`
| Kolom | Tipe | Deskripsi |
|-------|------|-----------|
| `id` | UUID | Primary Key |
| `project_id` | UUID | Foreign Key -> `projects.id` |
| `title` | String | Judul Milestone |
| `description` | Text | Deskripsi progres |
| `is_completed` | Boolean | Status penyelesaian |
| `completed_at` | Timestamp | Waktu penyelesaian |

### Tabel: `notifications`
| Kolom | Tipe | Deskripsi |
|-------|------|-----------|
| `id` | UUID | Primary Key |
| `user_id` | UUID | Foreign Key -> `users.id` |
| `type` | String | Jenis (milestone, credits, feedback) |
| `message` | Text | Isi pesan notifikasi |
| `is_read` | Boolean | Status baca |
| `created_at` | Timestamp | Waktu pembuatan |

### Tabel: `generated_designs`
| Kolom | Tipe | Deskripsi |
|-------|------|-----------|
| `id` | UUID | Primary Key |
| `project_id` | UUID | Foreign Key -> `projects.id` |
| `prompt` | Text | Deskripsi input AI |
| `image_url` | String | URL Storage untuk hasil render |
| `parameters` | JSONB | Style, lighting, material settings |
| `credit_cost` | Integer | Biaya kredit yang didebet |

### Tabel: `ahsp_catalog` (Standar Harga Nasional)
| Kolom | Tipe | Deskripsi |
|-------|------|-----------|
| `id` | UUID | Primary Key |
| `code` | String | Kode AHSP (misal: A.2.2.1) |
| `item_name` | String | Nama pekerjaan/material |
| `unit` | String | Satuan (m2, m3, kg, dll) |
| `unit_price` | Numeric | Harga satuan dasar |
| `region` | String | Wilayah (Jakarta, Jabar, dll) |

### Tabel: `project_rab`
| Kolom | Tipe | Deskripsi |
|-------|------|-----------|
| `id` | UUID | Primary Key |
| `project_id` | UUID | Foreign Key -> `projects.id` |
| `item_id` | UUID | Foreign Key -> `ahsp_catalog.id` |
| `quantity` | Numeric | Volume pekerjaan |
| `custom_price` | Numeric | Harga override oleh kontraktor |

---

## 2. Diagram Arsitektur Sistem

1.  **Frontend (Next.js/React)**: Antarmuka pengguna untuk kontrol parameter AI dan visualisasi dashboard.
2.  **Backend (Supabase/Express)**: 
    *   **Auth**: Mengelola sesi pengguna.
    *   **Edge Functions**: Menangani deduction kredit sebelum memanggil API AI.
3.  **AI Engine**: 
    *   **Gemini/Stable Diffusion**: Untuk render desain.
    *   **Custom LLM Prompting**: Untuk ekstraksi BoQ (Bill of Quantities) dari deskripsi desain.
4.  **Payment Gateway (Midtrans)**: Webhook untuk top-up kredit otomatis.

---

## 3. Strategi API Routing & Kredit

Untuk menjaga keamanan, pengurangan kredit harus dilakukan di **Server-Side** sebelum API AI dipanggil:

1.  Client mengirim permintaan render ke `/api/generate`.
2.  Server memverifikasi sesi user.
3.  Server memeriksa `users.credits`. Jika cukup, kurangi saldo (Locked Transaction).
4.  Server memanggil API AI (Gemini/Replicate).
5.  Server menyimpan hasil ke DB dan Storage.
6.  Jika API AI gagal, server melakukan *refunding* kredit secara otomatis.

---

## 4. Roadmap Implementasi (MVP)

### Fase 1: Fondasi & Auth
*   Setup Supabase Auth & Schema.
*   Dashboard dasar Kontraktor & Manajemen Profil.

### Fase 2: AI Design Gen (Core)
*   Integrasi Gemini SDK untuk Text-to-Image / Image-to-Image.
*   Sistem Kredit & Histori Generasi.

### Fase 3: Engine RAB & Katalog AHSP
*   Database Katalog AHSP Indonesia.
*   Logika perhitungan BoQ otomatis berdasarkan input luas & tipe rumah.
*   Ekspor PDF RAB.

### Fase 4: Portal Klien & Pembayaran
*   Fitur Share Link White-label.
*   Integrasi Midtrans untuk top-up kredit.

---

## 5. Error Handling & Monitoring
*   **API Timeouts**: Menggunakan Retry logic untuk panggilan AI API.
*   **Cost Monitoring**: Logging setiap token/credit yang digunakan untuk audit internal.
*   **Validation**: Zod schema untuk validasi input parameter desain.
