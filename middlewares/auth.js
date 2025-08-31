import jwt from 'jsonwebtoken';

function authenticateUser(req, res, next) {
    const token = req.cookies.token;
    if(!token) return res.status(401).send({error: 'Token not found'});

    jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
        if(err) return res.status(403).send("Unauthorized");
        req.user = decoded;
        next();
    })
}

export default authenticateUser;