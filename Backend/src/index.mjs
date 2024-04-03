import express from 'express';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import passport from 'passport';
import routers from '../routers/index.mjs';
import { logMiddleware } from "../utils/middlewares.mjs";

const app = express();

app.use(express.json());
app.use(cookieParser("Pi7utbj8EI"));
app.use(session({
    secret: 'UW6pw4uraD',
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24
    }
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(logMiddleware);
app.use(routers);

const PORT = 3000;

app.get('/', async (request, response) => {
    response.send('Welcome My Website...');
});

app.listen(PORT, () => {
    console.log(`Server has been started on this PORT ${PORT}!`);
});