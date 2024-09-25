import ProductService from '../service/ProductService.js';


class ProductController {
    async getAllProducts(req, res) {
        try {
            const products = await ProductService.getAllProducts();
            return res.status(200).json(products);
        }
        catch (e) {
            return res.status(400).json({error: e.message});
        }
    }

    async postProduct(req, res) {
        try {
            const product = await ProductService.createProduct(req.body);
            return res.status(200).json(product);
        }
        catch (e) {
            return res.status(400).json({error: e.message});
        }
    }
}

export default new ProductController();