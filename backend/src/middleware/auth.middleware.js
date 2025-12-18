import jwt from 'jsonwebtoken';

export function authMiddleware(req, res, next) {
    const authHeader = req.headers.authorization;
    if(!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({error: 'Authorization token missing'});
    }
    const token = authHeader.split(' ')[1];

    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // {userId, email, iat, exp}
        next();
    }
    catch(err){
        console.error('JWT verify error: ',err);
        return res.status(401).json({error: 'Invalid token'});
    }
}