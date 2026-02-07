const validateJewelry = (req, res, next) => {
  const {
    title,
    type,
    price,
    material,
    stone,
    description,
    inStock
  } = req.body;

  if (
    !title ||
    !type ||
    material == null ||
    stone == null ||
    description == null
  ) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  if (typeof title !== 'string') {
    return res.status(400).json({ message: 'Title must be a string' });
  }

  if (typeof price !== 'number') {
    return res.status(400).json({ message: 'Price must be a number' });
  }

  if (typeof inStock !== 'boolean') {
    return res.status(400).json({ message: 'inStock must be boolean' });
  }

  next();
};
module.exports = { validateJewelry };