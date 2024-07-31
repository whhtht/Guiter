import { Router } from "express";

import healthCheck from "routes/healthcheck/healthCheck.router";
import authRouter from "routes/auth/auth.router";

const router: Router = Router();
router.use(healthCheck);
router.use("/auth", authRouter);

export default router;
