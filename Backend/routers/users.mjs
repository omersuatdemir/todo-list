import { Router } from "express";
import { checkSchema, validationResult, matchedData } from "express-validator";
import passport from "passport";
import crypto from "crypto";
import { MainUser } from "../mongoose/schemas/main-users.mjs";
import { Token } from "../mongoose/schemas/tokens.mjs";
import { UserValidation, PasswordValidation } from "../utils/validationSchemas.mjs";
import { HashPassword } from "../utils/helpers.mjs";
import { sendEmail } from "../utils/email-sender.mjs";
import config from "../config.mjs";
import "../strategies/local-strategy.mjs";
import "../strategies/google-strategy.mjs";

const router = Router();

//Aktif kullanıcı varsa kullanıcı bilgilerini gösterir yoksa hata verir.
router.get("/auth", (request, response) => {
    console.log(request.sessionID);
    console.log(request.user);
    return request.user ? response.send(request.user) : response.sendStatus(401);
});

//Kullanıcı kaydının yapıldığı kısım.
router.post("/auth/register", checkSchema(UserValidation), async (request, response) => {
    const errors = validationResult(request);
    if(!errors.isEmpty()) return response.status(400).json({ errors: errors.array() });

    const data = matchedData(request);
    data.password = HashPassword(data.password);
    console.log(data);
    const newUser = new MainUser(data);

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
    return response.sendStatus(200);
});

//Aktif bir kullanıcı varsa oturumunu kapatmasını sağlar.
router.post("/auth/logout", (request, response) => {
    if(!request.user) return response.sendStatus(401);

    request.logOut((err) => {
        if (err) return response.sendStatus(400);
        
        response.clearCookie("connect.sid");
        return response.sendStatus(200);
    });
});

//Kullanıcının şifre sıfırlama bağlantısı "E-Mail" adresine gönderilir.
router.post("/auth/reset-password", async (request, response) => {
    const user = await MainUser.findOne({ email: request.body.email });
    if(!user) return response.sendStatus(400);

    try {
        const token = await new Token({
            tokenID: crypto.randomBytes(32).toString("hex"),
            userID: user.id,
            userEMail: user.email,
        }).save();

        const message = `Hi ${user.email},\nClick to Reset your Password!!\nhttp://localhost:${config.PORT}/auth/user/reset-password/${user._id}/${token.tokenID}`;
        await sendEmail(user.email, "Password Reset", message);
        return response.status(201).send(`Password-Reset E-Mail Sent to ${user.email} !!`)

    } catch (err) {
        console.log(`Password Reset Failed!! ${err}`);
        return response.sendStatus(400);
    }
});

//Şifre sıfırlama bağlantısına tıklayan kullanıcı şifresini belirlenen kouşllara uygun olarak değiştirebilir.
router.post("/auth/user/reset-password/:id/:token", checkSchema(PasswordValidation), async (request, response) => {
    try {
        const errors = validationResult(request);
        if (!errors.isEmpty()) return response.status(400).json({ errors: errors.array() });
        
        const newPassword = HashPassword(request.body.password);
        const user = await MainUser.findOne({ _id: request.params.id });
        if(!user) return response.status(400).send("User Not Found!!");

        const token = await Token.findOne({ tokenID: request.params.token, userID: user._id });

        if(!token) return response.status(400).send("Token Not Found!!");

        await MainUser.updateOne({ _id: user._id }, { $set: { password: newPassword } });
        await Token.findOneAndDelete({ userID: user._id });

        const message = `Hi ${user.email},\nYour Password has been Successfully Updated!!`;
        await sendEmail(user.email, "Password-Reset Succesfully!", message);
        return response.status(200).send("Password Reset Succesfully!!");

    } catch (err) {
        console.log(`Password Reset Failed!! ${err}`);
        return response.status(400).send(err);
    }
});

//Google ile kullanıcı girişi yapılmasını sağlar.
router.get("/auth/google", passport.authenticate("google"));

//Google ile kullanıcı girişi yapıldıktan sonra yönlendirilen adres.
router.get("/auth/google/redirect", passport.authenticate("google"), (request, response) => {
    //response.status(200).send(`Login with Google was successful!! Wellcome Back > ${request.user.name} <`);
    return request.user ? response.send(request.user) : response.sendStatus(401);
});

export default router;