import Product from '../../models/product';

const getAllProducts = async (req, res) => {
  const { _id: userId } = req.user;

  const products = await Product(userId).find();

  return res.status(200).json({ products });
};

export default getAllProducts;
