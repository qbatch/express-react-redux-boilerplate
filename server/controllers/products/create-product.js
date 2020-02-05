import Product from '../../models/product';

const createProduct = async (req, res) => {
  const { user: { _id: userId }, body: { name, description, price } } = req;

  const product = await Product(userId).create({ name, description, price });

  return res.status(200).json({ product });
};

export default createProduct;
