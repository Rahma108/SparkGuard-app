import bootstrap from "../src/app.bootstrap.js";

let app;

export default async function handler(req, res) {
  if (!app) {
    app = await bootstrap();
  }
  return app(req, res);
}