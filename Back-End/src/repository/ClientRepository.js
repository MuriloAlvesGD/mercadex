import client from "../models/client.js"

class ClientRepository {
    async createClient(clientData){
        const temp = new client(clientData);
        return await temp.save();
    }

    async findClientById(id){
        return await client.findById(id);
    }

    async findAllClients(){
        return await client.find();
    }

    async updateClient(id, clientData) {
        return await client.findByIdAndUpdate(id, clientData, { new: true });
    }

    async deleteClient(id) {
        return await client.findByIdAndDelete(id);
    }
}

export default new ClientRepository();