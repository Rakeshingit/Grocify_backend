const authorize = (allowedRoles) => {
  return (req, res, next) => {
    // console.log(req.user);
    // console.log(`Allowed roles: ${allowedRoles}`);
    if (!req.user) return res.status(401).json({ message: "Unauthorized" });
    if (!allowedRoles.includes(req.user.role))
      return res.status(403).json({ message: `Forbidden: Access Denied(${req.user.role})` });
    next();
  };
};
export default authorize;
