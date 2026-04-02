import app from "../src/app.bootstrap.js";

export default function handler(req, res) {
  return app(req, res);
}