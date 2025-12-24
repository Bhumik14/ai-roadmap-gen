import jwt from 'jsonwebtoken';

export function authMiddleware(req, res, next) {
    const authHeader = req.headers.authorization;
    if(!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({error: 'Authorization token missing'});
    }
    const token = authHeader.split(' ')[1];

    try{
        req.user = jwt.verify(token, process.env.JWT_SECRET); // {userId, email, iat, exp}
        next();
    }
    catch(err){
        console.error('JWT verify error: ',err);
        return res.status(401).json({error: 'Invalid token'});
    }
}