import { Router } from "express";

import healthCheck from "routes/healthcheck/healthCheck.router";
import authRouter from "routes/auth/auth.router";

const router: Router = Router();
router.use(healthCheck);
router.use("/auth", authRouter);

let storedData: Array<{ email: string; password: string }> = [];

router.post("/", (req, res) => {
  const { email, password } = req.body;
  console.log("Received data:", req.body);
  if (email && password) {
    storedData.push({ email, password });
    console.log("Stored data:", storedData);
    res.status(200).send("API endpoint reached");
  } else {
    console.log("Invalid data");
    res.status(400).send("Invalid data");
  }
});

router.get("/", (req, res) => {
  if (storedData) {
    console.log("Returning data:", storedData);
    res.status(200).json({ data: storedData });
  } else {
    res.status(404).send("No data found");
  }
});

export default router;
