'use strict';

const router = require('koa-router')();

const paginate = require('koa-ctx-paginate');
const bodyParser = require('koa-bodyparser');
const session = require('koa-session');
const passport = require('koa-passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

const Koa = require('koa');
const app = new Koa();

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    userProfileURL: "https://www.googleapis.com/oauth2/v3/userinfo",
    callbackURL: 'http://localhost:3000/auth/google/callback'
}, function (accessToken, refreshToken, profile, cb) {
    cb(null, profile);
}));

passport.serializeUser(function(user, cb) {
    cb(null, user);
});

passport.deserializeUser(function(obj, cb) {
    cb(null, obj);
});

app.use(bodyParser());
app.keys = ['MY_SUPER_SECRET_SECRET'];
app.use(session(app));
app.use(passport.initialize());
app.use(passport.session());

router.get('/', ctx => {
    if (ctx.isAuthenticated()) {
        ctx.body = `Hello, ${ctx.state.user.displayName}!`;
    } else {
        ctx.body = 'My cool video hosting API';
    }
});
router.get('/auth/google', passport.authenticate('google', { scope: ['profile'] }));
router.get('/auth/google/callback', passport.authenticate('google', {
    successRedirect: '/'
}));

router.use(paginate.middleware(10, 50));
router.use('/videos', require('./routes/videos').routes());
router.use('/comments', require('./routes/comments').routes());
router.use('/users', require('./routes/users').routes());

app.use(router.routes());

app.listen(3000);
