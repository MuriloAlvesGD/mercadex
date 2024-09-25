import OrderRepository from "../repository/OrderRepository.js";

class OrderService {
    async createOrder(orderData) {
        return await OrderRepository.createOrder(orderData);
    }

    async getOrderById(id) {
        return await OrderRepository.findOrderById(id);
    }
    async getAllOrders(){
        return await OrderRepository.findAllOrders();
    }

    async updateOrder(id, orderData) {
        return await OrderRepository.updateOrder(id, orderData);
    }

    async deleteOrder(id) {
        return await OrderRepository.deleteOrder(id);
    }
}

export default new OrderService();