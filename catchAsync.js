// Wraps async controller functions so errors are forwarded to Express error middleware
module.exports = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};
