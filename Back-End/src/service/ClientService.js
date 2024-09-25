import ClientRepository from "../repository/ClientRepository.js";

class ClientService {
    async createClient(clientData) {
        return await ClientRepository.createClient(clientData);
    }

    async getClientById(id) {
        return await ClientRepository.findClientById(id);
    }
    async getAllClients(){
        return await ClientRepository.findAllClients();
    }

    async updateClient(id, clientData) {
        return await ClientRepository.updateClient(id, clientData);
    }

    async deleteClient(id) {
        return await ClientRepository.deleteClient(id);
    }
}

export default new ClientService();