import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Mock Database in-memory for MVP
  const db = {
    users: [
      { id: "user_1", email: "kontraktor@example.com", credits: 1250, role: "contractor", name: "CV. Karya Abadi" },
      { id: "user_2", email: "admin@indoconstruct.ai", credits: 9999, role: "super_admin", name: "Admin Utama" },
      { id: "user_3", email: "klien@gmail.com", credits: 0, role: "customer", name: "Bpk. Budi" },
    ],
    projects: [
      { 
        id: "proj_1", 
        contractor_id: "user_1", 
        client_name: "Bpk. Budi", 
        title: "Villa Modern 2 Lantai - Canggu", 
        status: "in_progress", 
        share_token: "token_abc123",
        progress: 45
      }
    ],
    milestones: [
      { id: "m1", project_id: "proj_1", title: "Pondasi & Sloof", description: "Pekerjaan galian dan cor beton pondasi.", is_completed: true, completed_at: "2024-03-15T10:00:00Z" },
      { id: "m2", project_id: "proj_1", title: "Dinding Lt. 1", description: "Pemasangan bata merah dan plesteran.", is_completed: true, completed_at: "2024-04-01T14:30:00Z" },
      { id: "m3", project_id: "proj_1", title: "Dak Beton Lt. 2", description: "Pembesian dan pengecoran plat lantai.", is_completed: false, completed_at: null },
      { id: "m4", project_id: "proj_1", title: "Finishing & Atap", description: "Pemasangan plafon dan genteng.", is_completed: false, completed_at: null },
    ],
    notifications: [
      { id: "n1", user_id: "user_1", type: "credits", message: "Pembelian 500 kredit berhasil!", is_read: false, created_at: new Date().toISOString() },
      { id: "n2", user_id: "user_1", type: "milestone", message: "Milestone 'Dinding Lt. 1' telah selesai.", is_read: true, created_at: new Date().toISOString() },
    ],
    ahsp: [
      { code: "A.2.2.1", name: "Pekerjaan Galian Tanah Biasa", unit: "m3", price: 75000 },
      { code: "A.4.1.1", name: "Pemasangan Bata Merah", unit: "m2", price: 125000 },
      { code: "B.1.1.0", name: "Pengecatan Tembok", unit: "m2", price: 35000 },
    ]
  };

  // API Routes
  app.get("/api/user", (req, res) => {
    const userId = req.query.id as string || "user_1";
    const user = db.users.find(u => u.id === userId);
    res.json(user);
  });

  app.get("/api/projects", (req, res) => {
    const userId = req.query.userId as string;
    const projects = db.projects.filter(p => p.contractor_id === userId);
    res.json(projects);
  });

  app.get("/api/projects/shared/:token", (req, res) => {
    const project = db.projects.find(p => p.share_token === req.params.token);
    if (!project) return res.status(404).json({ error: "Proyek tidak ditemukan" });
    const milestones = db.milestones.filter(m => m.project_id === project.id);
    res.json({ project, milestones });
  });

  app.get("/api/milestones/:projectId", (req, res) => {
    const milestones = db.milestones.filter(m => m.project_id === req.params.projectId);
    res.json(milestones);
  });

  app.post("/api/milestones/toggle", (req, res) => {
    const { milestoneId } = req.body;
    const milestone = db.milestones.find(m => m.id === milestoneId);
    if (milestone) {
      milestone.is_completed = !milestone.is_completed;
      milestone.completed_at = milestone.is_completed ? new Date().toISOString() : null;
      
      // Notify client if project is linked
      const project = db.projects.find(p => p.id === milestone.project_id);
      if (project && milestone.is_completed) {
        db.notifications.push({
          id: `n_${Date.now()}`,
          user_id: "user_3", // Mock for client
          type: "milestone",
          message: `Progres Baru: Milestone '${milestone.title}' pada proyek ${project.title} telah selesai!`,
          is_read: false,
          created_at: new Date().toISOString()
        });
      }
      res.json({ success: true, milestone });
    } else {
      res.status(404).json({ error: "Milestone not found" });
    }
  });

  app.get("/api/notifications", (req, res) => {
    const userId = req.query.userId as string || "user_1";
    res.json(db.notifications.filter(n => n.user_id === userId));
  });

  app.post("/api/notifications/read", (req, res) => {
    const { id } = req.body;
    const notification = db.notifications.find(n => n.id === id);
    if (notification) {
      notification.is_read = true;
      res.json({ success: true });
    } else {
      res.status(404).json({ error: "Notif not found" });
    }
  });

  app.post("/api/credits/deduct", (req, res) => {
    const { amount } = req.body;
    if (db.users[0].credits >= amount) {
      db.users[0].credits -= amount;
      res.json({ success: true, remaining: db.users[0].credits });
    } else {
      res.status(402).json({ success: false, error: "Kredit tidak cukup" });
    }
  });

  app.post("/api/rab/calculate", (req, res) => {
    const { buildingArea, type } = req.body;
    // Simple logic for BoQ estimation
    const multiplier = type === "minimalist" ? 1.2 : 1.5;
    const boq = db.ahsp.map(item => ({
      ...item,
      qty: (Math.random() * buildingArea * multiplier).toFixed(2),
      total: 0
    })).map(item => ({
      ...item,
      total: Number(item.qty) * item.price
    }));

    const granTotal = boq.reduce((acc, curr) => acc + curr.total, 0);
    res.json({ boq, granTotal });
  });

  // Vite integration
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(__dirname, "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`IndoConstruct AI Server running at http://localhost:${PORT}`);
  });
}

startServer();
