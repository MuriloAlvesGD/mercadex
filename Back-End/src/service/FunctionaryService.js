import FunctionaryRepository from "../repository/FunctionaryRepository.js";

class FunctionaryService {
    async createFunctionary(functionaryData) {
        return await FunctionaryRepository.createFunctionary(functionaryData);
    }

    async getFunctionaryById(id) {
        return await FunctionaryRepository.findFunctionaryById(id);
    }
    async getAllFunctionarys(){
        return await FunctionaryRepository.findAllFunctionarys();
    }

    async updateFunctionary(id, functionaryData) {
        return await FunctionaryRepository.updateFunctionary(id, functionaryData);
    }

    async deleteFunctionary(id) {
        return await FunctionaryRepository.deleteFunctionary(id);
    }
}

export default new FunctionaryService();