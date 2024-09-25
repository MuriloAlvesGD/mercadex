import enterprise from "../models/enterprise.js"

class EnterpriseRepository {
    async createEnterprise(enterpriseData){
        const temp = new enterprise(enterpriseData);
        return await temp.save();
    }

    async findEnterpriseById(id){
        return await enterprise.findById(id);
    }

    async findAllEnterprises(){
        return await enterprise.find({},{CNPJ: 1, name: 1, profileImage: 1});
    }

    async updateEnterprise(id, enterpriseData) {
        return await enterprise.findByIdAndUpdate(id, enterpriseData, { new: true });
    }

    async deleteEnterprise(id) {
        return await enterprise.findByIdAndDelete(id);
    }
}

export default new EnterpriseRepository();