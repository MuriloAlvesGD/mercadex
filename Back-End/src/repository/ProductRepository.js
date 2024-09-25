import product from "../models/productModels/product.js"

class ProductRepository {
    async createProduct(productData){
        const temp = new product(productData);
        return await temp.save();
    }

    async findProductById(id){
        return await product.findById(id);
    }

    async findAllProducts(){
        return await product.find();
    }

    async updateProduct(id, productData) {
        return await product.findByIdAndUpdate(id, productData, { new: true });
    }

    async deleteProduct(id) {
        return await product.findByIdAndDelete(id);
    }
}

export default new ProductRepository();