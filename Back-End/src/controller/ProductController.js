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
            // Verifica se o header 'user' está presente
            if (!req.headers.user) {
                return res.status(400).json({ message: 'User header is required' });
            }

            const email = atob(JSON.parse(req.headers.user));
            const data = req.body;

            // Verifica se o corpo da requisição contém os dados necessários
            if (!data || Object.keys(data).length === 0) {
                return res.status(400).json({ message: 'Product data is required' });
            }

            const enterpriseOfUser = await functionary.findOne(
                { login: email },
                { enterprise_id: 1, _id: 0 }
            );

            if (!enterpriseOfUser) {
                return res.status(404).json({ message: 'Enterprise/user not found' });
            }

            const enterpriseId = enterpriseOfUser.enterprise_id;

            const productData = { enterprise_id: enterpriseId, ...data};
            console.log(productData);
            const product = await ProductService.createProduct(productData);
            return res.status(201).json(product); // Usar 201 Created
        } catch (e) {
            return res.status(400).json({ error: e.message });
        }
    }

    async updateProduct(req, res) {
        try {
            // Verifica se o header 'user' está presente
            if (!req.headers.user) {
                return res.status(400).json({ message: 'User header is required' });
            }

            const data = req.body;

            // Verifica se o corpo da requisição contém os dados necessários
            if (!data || Object.keys(data).length === 0) {
                return res.status(400).json({ message: 'Product data is required' });
            }

            // Verifica se o ID do produto está presente nos parâmetros da requisição
            const productId = req.params.id; // Supondo que o ID do produto seja passado na URL

            if (!productId) {
                return res.status(400).json({ message: 'Product ID is required' });
            }

            // Atualiza o produto no banco de dados
            const updatedProduct = await ProductService.updateProduct(productId, data, {new: true});

            if (!updatedProduct) {
                return res.status(404).json({ message: 'Product not found' });
            }

            return res.status(200).json(updatedProduct); // Usar 200 OK
        } catch (e) {
            return res.status(400).json({ error: e.message });
        }
    }

    async deleteProduct(req, res) {
        try {
            if (!req.headers.user) {
                return res.status(400).json({ message: 'User header is required' });
            }

            const productId = req.params.id; // Supondo que o ID do produto seja passado na URL

            if (!productId) {
                return res.status(400).json({ message: 'Product ID is required' });
            }

            const deletedProduct = await ProductService.deleteProduct(productId);

            if (!deletedProduct) {
                return res.status(404).json({ message: 'Product not found' });
            }
            return res.status(200).json(deletedProduct);
        }
        catch (e) {
            return res.status(400).json({ error: e.message });
        }
    }

}

export default new ProductController();