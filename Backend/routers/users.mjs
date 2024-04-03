import { Router } from "express";
import passport from "passport";
import "../strategies/google-strategy.mjs";

const router = Router();

//Google ile kullanıcı girişi yapılmasını sağlar.
router.get("/auth/google", passport.authenticate("google"));

//Google ile kullanıcı girişi yapıldıktan sonra yönlendirilen adres.
router.get("/auth/google/redirect", passport.authenticate("google"), (request, response) => {
    response.status(200).send(`Login with Google was successful!! Wellcome Back > ${request.user.name} <`);
});

export default router;