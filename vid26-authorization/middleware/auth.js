import { getUser } from "../service/auth.js";

// Authentication
const checkForAuthentication = (req, res, next) => {
    const tokenCookie = req.cookies?.token;
    req.user = null;
    if (!tokenCookie) {
        return next();
    }
    req.user = getUser(tokenCookie);
    return next();
}

// Authorization
const restrictTo = (role = []) => {
    return (req, res, next) => {
        if (!req.user) {
            return res.redirect('/login');
        }
        if (!role.includes(req.user.role)) {
            return res.end('Unauthorized!');
        }
        next();
    }
}

export { checkForAuthentication, restrictTo };