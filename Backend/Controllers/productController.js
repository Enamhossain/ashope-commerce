const { ObjectId } = require("mongodb");
const productCollection = require("../models/product");

exports.deletedproduct = async (req, res) => {
  try {
    const { id } = req.params;
    
    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid product ID." });
    }

    const result = await productCollection.deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: "Product not found." });
    }

    res.status(200).json({ message: "Product deleted successfully." });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.reviewProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const review = req.body;

    console.log("Received review:", review);
    console.log("Product ID:", id);

    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid product ID." });
    }

    // Use updateOne instead of findByIdAndUpdate
    const updatedProduct = await productCollection.updateOne(
      { _id: new ObjectId(id) }, // Find product by ID
      { $push: { reviews: review } } // Push new review
    );

    if (updatedProduct.modifiedCount === 0) {
      return res.status(404).json({ message: "Product not found." });
    }
    console.log("Updated Product:", updatedProduct);

    res.status(200).json({
      message: "Review added successfully.",
      product: updatedProduct, 
    });
  } catch (err) {
    console.error("Error reviewing product:", err.message);
    res.status(500).json({
      message: "Failed to review product.",
      error: err.message,
    });
  }
};

exports.editProduct = async (req, res) => {
  try {
    const { id } = req.params;
    console.log("Received request:", id); // Debugging Log
    const updates = req.body;
    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid product ID." });
    }
    const updatedProduct = await productCollection.findOneAndUpdate(
      { _id: new ObjectId(id) },
      { $set: updates },
      { returnDocument: "after" }
    );

    // ✅ Check if product exists
    if (!updatedProduct.value) {
      return res.status(404).json({ message: "Product not found." });
    }

    // ✅ Success response
    res.status(200).json({
      message: "Product updated successfully.",
      product: updatedProduct.value,
    });
  } catch (err) {
    console.error("Error updating product:", err.message);
    res.status(500).json({
      message: "Failed to update product.",
      error: err.message,
    });
  }
};

exports.getProducts = async (req, res) => {
  try {
    const { category, subcategory, nestedSubcategory } = req.params; // Now all are in params
    const { page = 1, limit = 10 } = req.query; // Pagination params

    const filter = {};

    if (category) filter.category = category;
    if (subcategory) filter.subcategory = subcategory;
    if (nestedSubcategory) filter.nestedSubcategory = nestedSubcategory;

    console.log("Filters applied:", filter);

    const skip = (parseInt(page) - 1) * parseInt(limit);
    const products = await productCollection
      .find(filter)
      .skip(skip)
      .limit(parseInt(limit))
      .toArray();

    const totalProducts = await productCollection.countDocuments(filter);

    res.status(200).json({
      products,
      totalProducts,
      currentPage: parseInt(page),
      totalPages: Math.ceil(totalProducts / limit),
    });
  } catch (err) {
    console.error("Error fetching products:", err);
    res.status(500).json({
      message: "Failed to fetch products. Please try again later.",
      error: err.message,
    });
  }
};

exports.productsCollection = async (req, res) => {
  try {
    const {
      category,
      subcategory,
      nestedSubcategory,
      size,
      fit,
      pattern,
      colors,
      minPrice,
      maxPrice,
      page = 1,
      limit = 10,
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

    const products = await productCollection
      .find(filter)
      .skip((page - 1) * limit)
      .limit(parseInt(limit));

    const totalProducts = await products.countDocuments(filter);

    res.status(200).json({
      totalProducts,
    });
  } catch (err) {
    console.error("Error fetching products:", err);
    res.status(500).json({
      message: "Failed to fetch products. Please try again later.",
      error: err.message,
    });
  }
};

exports.productDetailsById = async (req, res) => {
  const id = req.params.id;
  console.log("Received ID:", id); // Debugging the id

  if (!id) {
    return res.status(400).json({ error: "Invalid product ID" });
  }

  try {
    const product = await productCollection.findOne({ _id: new ObjectId(id) });
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }
    return res.status(200).json(product);
  } catch (error) {
    console.error("Error fetching product:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.createProduct = async (req, res) => {
  const product = req.body;
  try {
    const newProduct = await productCollection.insertOne(product);
    res.status(201).json(newProduct);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
