import ProductService from '../service/ProductService.js';
import product from '../models/productModels/product.js';
import functionary from "../models/functionary.js";
import { getEnterpriseId } from "../helpers/GlobalFunctions.js"; // Importando a função

class ProductController {
    async getAllProducts(req, res) {
        try {
            const enterpriseId = await getEnterpriseId(req); // Usando a função importada
            const products = await product.aggregate([
                {
                    $match: { enterprise_id: enterpriseId }
                },
                {
                    $lookup: {
                        from: 'promotions', // Nome da coleção de promoções
                        localField: '_id', // Campo na coleção de cartões
                        foreignField: 'Product', // Campo na coleção de promoções
                        as: 'promotions' // Nome do campo onde as promoções correspondentes serão armazenadas
                    }
                },
                {
                    $addFields: {
                        'price.newPrice': { $arrayElemAt: ['$promotions.price', 0] } // Adiciona newPrice dentro de price
                    }
                },
                {
                    $project: {
                        _id: 1,
                        name: 1,
                        brand: 1,
                        images: 1,
                        price: 1, // O campo price agora inclui newPrice
                        stock: 1,
                        specification: 1
                    }
                }
            ]);

            return res.status(200).json(products);
        } catch (e) {
            return res.status(400).json({ error: e.message});
        }
    }

    async getAllProductsOnStock(req, res) {
        try {
            const enterpriseId = await getEnterpriseId(req); // Usando a função importada
            const products = await product.find({ enterprise_id: enterpriseId, 'stock.qtd': { $gt: 0 }}, { __v: 0 });
            return res.status(200).json(products);
        } catch (e) {
            return res.status(400).json({ error: e.message });
        }
    }

    async getProductsGroup(req, res) {
        try {
            const enterpriseId = await getEnterpriseId(req); // Usando a função importada

            const products = await product.aggregate([
                {
                    $match: { enterprise_id: enterpriseId } // Filtra produtos pela enterprise_id
                },
                {
                    $facet: {
                        byBrand: [{
                            $group: {
                                _id: "$brand", // Agrupa pelos campos de marca
                                totalQuantity: { $sum: "$stock.qtd" } // Soma as quantidades dentro do objeto stock
                            }
                        }],
                        byName: [{
                            $group: {
                                _id: "$name", // Agrupa pelos campos de nome
                                totalQuantity: { $sum: "$stock.qtd" } // Soma as quantidades dentro do objeto stock
                            }
                        }],
                        byCategory: [{
                            $group: {
                                _id: "$specification.category", // Agrupa pelos campos de categoria
                                totalQuantity: { $sum: "$stock.qtd" } // Soma as quantidades dentro do objeto stock
                            }
                        }],
                    }
                }
            ]);

            return res.status(200).json(products); // Retorna os produtos agrupados
        } catch (e) {
            return res.status(400).json({ error: e.message });
        }
    }

    async createProduct(req, res) {
        try {
            if (!req.headers.user) {
                return res.status(400).json({ message: 'User header is required' });
            }

            const data = req.body;

            if (!data || Object.keys(data).length === 0) {
                return res.status(400).json({ message: 'Product data is required' });
            }

            const enterpriseId = await getEnterpriseId(req); // Usando a função importada

            const productData = { enterprise_id: enterpriseId, ...data };
            productData.brand = productData.brand.toUpperCase();

            const product = await ProductService.createProduct(productData);
            return res.status(201).json({ message: "Product created successfully", product }); // Mensagem de sucesso
        } catch (e) {
            return res.status(400).json({ error: e.message });
        }
    }

    async updateProduct(req, res) {
        try {
            if (!req.headers.user) {
                return res.status(400).json({ message: 'User header is required' });
            }

            const data = req.body;

            if (!data || Object.keys(data).length === 0) {
                return res.status(400).json({ message: 'Product data is required' });
            }

            const productId = req.params.id; // Supondo que o ID do produto seja passado na URL

            if (!productId) {
                return res.status(400).json({ message: 'Product ID is required' });
            }

            const updatedProduct = await ProductService.updateProduct(productId, data, { new: true });

            if (!updatedProduct) {
                return res.status(404).json({ message: 'Product not found' });
            }

            return res.status(200).json({ message: "Product updated successfully", updatedProduct }); // Mensagem de sucesso
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
            return res.status(200).json({ message: "Product deleted successfully", deletedProduct }); // Mensagem de sucesso
        } catch (e) {
            return res.status(400).json({ error: e.message });
        }
    }
}

export default new ProductController();