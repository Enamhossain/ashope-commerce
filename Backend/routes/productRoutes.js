const express = require("express");
const { createProduct, getProducts, editProduct, productDetailsById, productsCollection, deletedproduct, reviewProduct } = require("../Controllers/productController");

const router = express.Router();

router.post('/createproduct',createProduct)
router.get('/collection',getProducts)
// router.get("/collection/:category/:subcategory", getProducts);
router.get("/collection/:category/:subcategory/:nestedSubcategory", productsCollection);
router.get('/productdetails/:id', productDetailsById);
router.patch('/editProduct/:id', editProduct);
router.post("/review/:id", reviewProduct)
router.delete('/deleted/:id', deletedproduct);









module.exports = router;