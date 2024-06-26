import passport from "passport";
import { Strategy } from "passport-local";
import { MainUser } from "../mongoose/schemas/main-users.mjs";
import { ComparePassword } from "../utils/helpers.mjs";

passport.serializeUser((user, done) => {
    console.log(user);
    console.log(`Welcome Back! > ${user.email} <`);
    return done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    try {
        const user = await MainUser.findById({ _id: id });
        if(!user) throw new Error("User Not Found!");
        return done(null, user);

    } catch (err) {
        console.log();
        return done(err, null);
    }
})

export default passport.use(
    new Strategy({ usernameField: "email" }, async (email, password, done) => {
        try {
            const user = await MainUser.findOne({ email: email });
            if(!user) throw new Error("User Not Found!");

            if(!ComparePassword(password, user.password)) throw new Error("Bad Credentials!");
            
            return done(null, user);

        } catch (err) {
            return done(err, null);
        }
    }
));