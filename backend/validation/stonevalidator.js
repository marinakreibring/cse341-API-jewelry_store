const validateStone = (req, res, next) => {
  const { name, color, origin, chakra, meaning, element, property } = req.body;

  if (
    !name ||
    !color ||
    !origin ||
    !chakra ||
    !meaning ||
    !element ||
    !property
  ) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  next();
};
module.exports = { validateStone };