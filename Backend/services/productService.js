const { ObjectId } = require("mongodb");
const productCollection = require("../models/product");

class ProductService {
  async getProducts(filter, page = 1, limit = 10) {
    const skip = (parseInt(page) - 1) * parseInt(limit);
    const products = await productCollection
      .find(filter)
      .skip(skip)
      .limit(parseInt(limit))
      .toArray();

    const totalProducts = await productCollection.countDocuments(filter);
    return { products, totalProducts };
  }

  async getProductById(id) {
    if (!ObjectId.isValid(id)) throw new Error("Invalid product ID");
    const product = await productCollection.findOne({ _id: new ObjectId(id) });
    if (!product) throw new Error("Product not found");
    return product;
  }

  async createProduct(productData) {
    return await productCollection.insertOne(productData);
  }

  async updateProduct(id, updates) {
    if (!ObjectId.isValid(id)) throw new Error("Invalid product ID");
    const result = await productCollection.findOneAndUpdate(
      { _id: new ObjectId(id) },
      { $set: updates },
      { returnDocument: "after" }
    );
    if (!result || !result.value) {
        // Fallback for different driver versions or if value is not returned
        return await productCollection.findOne({ _id: new ObjectId(id) });
    }
    return result.value;
  }

  async deleteProduct(id) {
    if (!ObjectId.isValid(id)) throw new Error("Invalid product ID");
    const result = await productCollection.deleteOne({ _id: new ObjectId(id) });
    if (result.deletedCount === 0) throw new Error("Product not found");
    return result;
  }

  async addReview(id, review) {
    if (!ObjectId.isValid(id)) throw new Error("Invalid product ID");
    const result = await productCollection.updateOne(
      { _id: new ObjectId(id) },
      { $push: { reviews: review } }
    );
    if (result.modifiedCount === 0) throw new Error("Product not found or not updated");
    return result;
  }
}

module.exports = new ProductService();
