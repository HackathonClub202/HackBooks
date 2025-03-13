const loginSuccess = (req, res) => {
    if (req.user) {
      res.status(200).json({
        success: true,
        user: req.user,
      });
    } else {
      res.status(403).json({ success: false });
    }
  };
  
  const logout = (req, res) => {
    req.logout((err) => {
      if (err) return res.status(500).send('Logout error');
      res.status(200).send('Logged out');
    });
  };
  
  module.exports = { loginSuccess, logout };
  