import { buildAuthenticatedRouter } from "@adminjs/express";
import AdminJS from "adminjs";
import dotenv from "dotenv";
import express from "express";
import path from "path";
import * as url from "url";
import provider from "./admin/auth-provider.js";
import options from "./admin/options.js";
import initializeDb from "./db/index.js";
dotenv.config();
const port = process.env.PORT || 5000;

const __dirname = url.fileURLToPath(new URL(".", import.meta.url));

const start = async () => {
  const app = express();
  await initializeDb();
  const admin = new AdminJS(options);
  if (process.env.NODE_ENV === "production") {
    await admin.initialize();
  } else {
    admin.watch();
  }
  const publicPath = path.join(__dirname, "public");
  app.use(`${admin.options.rootPath}`, express.static(publicPath));
  const router = buildAuthenticatedRouter(
    admin,
    {
      cookiePassword: process.env.COOKIE_SECRET,
      cookieName: "adminjs",
      provider,
    },
    null,
    {
      secret: process.env.COOKIE_SECRET,
      saveUninitialized: true,
      resave: true,
    }
  );
  app.use(admin.options.rootPath, router);
  app.listen(port, () => {
    console.log(
      `AdminJS available at http://localhost:${port}${admin.options.rootPath}`
    );
  });
};
start();
