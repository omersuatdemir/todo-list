import passport from "passport";
import { Strategy } from "passport-google-oauth20";
import { MainUser } from "../mongoose/schemas/main-users.mjs";
import crypto from "crypto";
import { HashPassword } from "../utils/helpers.mjs";
import config from "../config.mjs";

passport.serializeUser((user, done) => {
    console.log(user);
    console.log(`Welcome Back! > ${user.name} <`);
    return done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    try {
        const user = await MainUser.findById(id);
        return user ? done(null, user) : done(null, null);

    } catch (err) {
        return done(err, null);
    }
});

export default passport.use(new Strategy({
    clientID: config.googleClientID,
    clientSecret: config.googleAppSecret,
    callbackURL: config.googleRedirectUrl,
    scope: ["profile", "email"]}, async (accesToken, refeshToken, profile, done) => {
        let user;
        try {
            user = await MainUser.findOne({ email: profile.emails[0].value });
            if(user) if(!user.googleID) await MainUser.updateOne({ googleID: profile.id, name: profile.displayName });

        } catch (err) {
            return done(err, null);
        }

        try {
            if(!user){
                console.log(profile);
                const newUser = new MainUser({ googleID: profile.id, name: profile.displayName, email: profile.emails[0].value, password: HashPassword(crypto.randomBytes(12).toString("hex")) });
                const savedUser = await newUser.save();
                return done(null, savedUser);
            }
            return done(null, user);
            
        } catch (err) {
            console.log(`Google Auth Error!\n${err}`);
            return done(err, null);
        }
    }
));