import ProductService from '../service/ProductService.js';
import product from '../models/productModels/product.js';
import functionary from "../models/functionary.js";


class ProductController {
    async getAllProducts(req, res) {
        try {
            const email = atob(JSON.parse(req.headers.user));
            const enterpriseOfUser = await functionary.findOne({login: email}, {enterprise_id: 1, _id:0});
            if (!enterpriseOfUser) {
                return res.status(404).json({message: 'enterprise/user not Found'});
            }

            const enterpriseId = enterpriseOfUser.enterprise_id;
            const products = await product.find({enterprise_id: enterpriseId}, {__v: 0})
            console.log(products);
            return res.status(200).json(products);
        }
        catch (e) {
            return res.status(400).json({error: e.message});
        }
    }

    async createProduct(req, res) {
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