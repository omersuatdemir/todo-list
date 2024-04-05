import { Router } from "express";
import userRouter from "./users.mjs";
import noteRouter from "./notes.mjs";

const router = Router();

router.use(userRouter);
router.use(noteRouter);

export default router;