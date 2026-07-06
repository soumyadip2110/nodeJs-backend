import { getUser } from "../service/auth.js";

const restrictToLoggedInUserOnly = (req, res, next) => {
    const authToken = req.headers['authorization'];
    if (!authToken) {
        return res.redirect('/login');
    }

    const token = authToken.split('Bearer ')[1];
    const user = getUser(token);
    if (!user) {
        return res.redirect('/login');
    }
    req.user = user;
    next();
}

const checkAuth = (req, res, next) => {
    const authToken = req.headers['authorization'];
    const token = authToken.split('Bearer ')[1];
    const user = getUser(token);
    req.user = user;
    next();
}

export { restrictToLoggedInUserOnly, checkAuth };