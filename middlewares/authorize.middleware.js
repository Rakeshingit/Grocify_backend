const authorize = (allowedRoles) => {
  return (req, res, next) => {
    // console.log(req.user, allowedRoles);
    if (!req.user) return res.status(401).json({ message: "Unauthorized" });
    if (!allowedRoles.includes(req.user.role))
      return res.status(403).json({ message: "Forbidden: Access Denied" });
    next();
  };
};
export default authorize;
