const productService = require("../services/productService");

exports.deletedproduct = async (req, res) => {
  try {
    const { id } = req.params;
    await productService.deleteProduct(id);
    res.status(200).json({ message: "Product deleted successfully." });
  } catch (err) {
    res.status(err.message === "Product not found" ? 404 : 400).json({ message: err.message });
  }
};

exports.reviewProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const review = req.body;
    await productService.addReview(id, review);
    res.status(200).json({ message: "Review added successfully." });
  } catch (err) {
    res.status(400).json({ message: "Failed to review product.", error: err.message });
  }
};

exports.editProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;
    const product = await productService.updateProduct(id, updates);
    res.status(200).json({ message: "Product updated successfully.", product });
  } catch (err) {
    res.status(400).json({ message: "Failed to update product.", error: err.message });
  }
};

exports.getProducts = async (req, res) => {
  try {
    const { category, subcategory, nestedSubcategory } = req.params;
    const { page = 1, limit = 10 } = req.query;

    const filter = {};
    if (category) filter.category = category;
    if (subcategory) filter.subcategory = subcategory;
    if (nestedSubcategory) filter.nestedSubcategory = nestedSubcategory;

    const { products, totalProducts } = await productService.getProducts(filter, page, limit);

    res.status(200).json({
      products,
      totalProducts,
      currentPage: parseInt(page),
      totalPages: Math.ceil(totalProducts / limit),
    });
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch products.", error: err.message });
  }
};

exports.productsCollection = async (req, res) => {
  try {
    const {
      category, subcategory, nestedSubcategory,
      size, fit, pattern, colors, minPrice, maxPrice,
      page = 1, limit = 10,
    } = req.query;

    let filter = {};
    if (category) filter.category = category;
    if (subcategory) filter.subcategory = subcategory;
    if (nestedSubcategory) filter.nestedSubcategory = nestedSubcategory;
    if (size) filter.size = { $in: size.split(",") };
    if (fit) filter.fit = fit;
    if (pattern) filter.pattern = pattern;
    if (colors) filter.colors = { $in: colors.split(",") };
    if (minPrice && maxPrice)
      filter.price = { $gte: parseFloat(minPrice), $lte: parseFloat(maxPrice) };

    const { totalProducts } = await productService.getProducts(filter, page, limit);

    res.status(200).json({ totalProducts });
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch product count.", error: err.message });
  }
};

exports.productDetailsById = async (req, res) => {
  try {
    const product = await productService.getProductById(req.params.id);
    return res.status(200).json(product);
  } catch (error) {
    res.status(error.message === "Product not found" ? 404 : 400).json({ error: error.message });
  }
};

exports.createProduct = async (req, res) => {
  try {
    const newProduct = await productService.createProduct(req.body);
    res.status(201).json(newProduct);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

