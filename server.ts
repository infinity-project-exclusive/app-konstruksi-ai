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
      { id: "user_1", email: "kontraktor@example.com", credits: 50, role: "contractor" },
    ],
    projects: [],
    ahsp: [
      { code: "A.2.2.1", name: "Pekerjaan Galian Tanah Biasa", unit: "m3", price: 75000 },
      { code: "A.4.1.1", name: "Pemasangan Bata Merah", unit: "m2", price: 125000 },
      { code: "B.1.1.0", name: "Pengecatan Tembok", unit: "m2", price: 35000 },
    ]
  };

  // API Routes
  app.get("/api/user", (req, res) => {
    res.json(db.users[0]);
  });

  app.get("/api/ahsp", (req, res) => {
    res.json(db.ahsp);
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
