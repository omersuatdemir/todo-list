import { Router } from "express";
import userRouter from "./users.mjs";
/*import productRouter from './products.mjs';
import authRouter from "./auths.mjs";*/

const router = Router();

router.use(userRouter);
/*router.use(productRouter);
router.use(authRouter);*/

export default router;