import { type Request, Router } from "express";
import { signup } from "../controllers/auth.controller";

const router = Router();

router.post("/sign-up", signup);
router.post("/login", (req: Request, res) => {
  const authHeader = req.headers.authorization;
  console.log(authHeader);
  res.status(401).json({ message: "no auth" });
});
router.post("/logout", () => {});
export default router;
