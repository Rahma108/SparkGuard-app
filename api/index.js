import bootstrap from "../src/app.bootstrap.js";

let app;

export default async function handler(req, res) {
  try {
    if (!app) {
      app = await bootstrap();
    }
    return app(req, res);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: err.message });
  }
}