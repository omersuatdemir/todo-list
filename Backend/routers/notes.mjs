import { Router } from "express";

const router = Router();

router.get("/notes", (request, response) => {
    return response.send("Notlar buraya gelecekk.").status(201);
});

export default router;