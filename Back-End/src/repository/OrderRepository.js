import order from "../models/order.js"

class OrderRepository {
    async createOrder(orderData){
        const temp = new order(orderData);
        return await temp.save();
    }

    async findOrderById(id){
        return await order.findById(id);
    }

    async findAllOrders(){
        return await order.find();
    }

    async updateOrder(id, orderData) {
        return await order.findByIdAndUpdate(id, orderData, { new: true });
    }

    async deleteOrder(id) {
        return await order.findByIdAndDelete(id);
    }
}

export default new OrderRepository();