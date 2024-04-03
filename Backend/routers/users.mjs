import { Router } from "express";
import { checkSchema, validationResult, matchedData } from "express-validator";
import passport from "passport";
import { LocalUser } from "../mongoose/schemas/local-users.mjs";
import { UserValidation } from "../utils/validationSchemas.mjs";
import { HashPassword } from "../utils/helpers.mjs";
import "../strategies/local-strategy.mjs";
import "../strategies/google-strategy.mjs";

const router = Router();

//Aktif kullanıcı varsa kullanıcı bilgilerini gösterir yoksa hata verir.
router.get("/auth", (request, response) => {
    return request.user ? response.send(request.user) : response.sendStatus(401);
});

//Kullanıcı kaydının yapıldığı kısım.
router.post("/auth/register", checkSchema(UserValidation), async (request, response) => {
    const result = validationResult(request);
    if(!result.isEmpty()) return response.status(400).send(result.array());
    const data = matchedData(request);
    data.password = HashPassword(data.password);
    console.log(data);
    const newUser = new LocalUser(data);
    try {
        const savedUser = await newUser.save();
        return response.status(201).send(`New User Created!! \n${savedUser}`);
    } catch (err) {
        console.log(err);
        return response.sendStatus(400);
    }
});

//Kullanıcı girişinin yapıldığı kısım.
router.post("/auth/login", passport.authenticate("local"), (request, response) => {
    response.sendStatus(200);
});

//Aktif bir kullanıcı varsa oturumunu kapatmasını sağlar.
router.post("/auth/logout", (request, response) => {
    if(!request.user) return response.sendStatus(401);
    request.logOut((err) => {
        if (err) return response.sendStatus(400);
        response.sendStatus(200);
    });
});

//Google ile kullanıcı girişi yapılmasını sağlar.
router.get("/auth/google", passport.authenticate("google"));

//Google ile kullanıcı girişi yapıldıktan sonra yönlendirilen adres.
router.get("/auth/google/redirect", passport.authenticate("google"), (request, response) => {
    response.status(200).send(`Login with Google was successful!! Wellcome Back > ${request.user.name} <`);
});

export default router;