import ProductRepository from "../repository/ProductRepository.js";

class ProductService {
    async createProduct(productData) {
        return await ProductRepository.createProduct(productData);
    }

    async getProductById(id) {
        return await ProductRepository.findProductById(id);
    }
    async getAllProducts(){
        return await ProductRepository.findAllProducts();
    }

    async updateProduct(id, productData) {
        return await ProductRepository.updateProduct(id, productData);
    }

    async deleteProduct(id) {
        return await ProductRepository.deleteProduct(id);
    }
}

export default new ProductService();