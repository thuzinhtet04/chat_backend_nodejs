import { type Request, Router } from "express";
import { login, signup } from "../controllers/auth.controller";

const router = Router();

router.post("/sign-up", signup);
router.post("/sign-in", login);
router.post("/logout", () => {});
export default router;
