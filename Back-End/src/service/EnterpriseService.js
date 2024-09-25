import EnterpriseRepository from "../repository/EnterpriseRepository.js";

class EnterpriseService {
    async createEnterprise(enterpriseData) {
        return await EnterpriseRepository.createEnterprise(enterpriseData);
    }

    async getEnterpriseById(id) {
        return await EnterpriseRepository.findEnterpriseById(id);
    }
    async getAllEnterprises(){
        return await EnterpriseRepository.findAllEnterprises();
    }

    async updateEnterprise(id, enterpriseData) {
        return await EnterpriseRepository.updateEnterprise(id, enterpriseData);
    }

    async deleteEnterprise(id) {
        return await EnterpriseRepository.deleteEnterprise(id);
    }
}

export default new EnterpriseService();