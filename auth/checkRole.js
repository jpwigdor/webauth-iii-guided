module.exports = function(role) {
  return function(req, res, next) {
    if (req.user) {
      if (
        req.user.roles && // user has a role
        Array.isArray(req.user.roles) && // make sure the role is an array and not an object
        req.user.roles.includes(role) // you are actually the role checked when running this middleware
      ) {
        next();
      } else {
        res.status(403).json({ message: "Access Denied due to Permissions" });
      }
    } else {
      res.status(401).json({ message: "you cannot pass!" });
    }
  };
};
