import express from 'express';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import passport from 'passport';
import routers from '../routers/index.mjs';

const app = express();

// Custom Middlewares - Function Body
const logMiddleware = ((req, res, next) => {
    console.log(`${req.method} - ${req.url}`);
    next();
});

// Built-in Middlewares
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

// Custom Middlewares
app.use(logMiddleware);

//Routers
app.use(routers);

const PORT = process.env.PORT || 3000;

app.get('/', async (req, res) => {
    res.send('hello world');
});

app.listen(PORT, () => {
    console.log('Server is running on http://localhost:3000');
});
