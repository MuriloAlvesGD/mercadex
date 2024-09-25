import functionary from "../models/functionary.js"

class FunctionaryRepository {
    async createFunctionary(functionaryData){
        const temp = new functionary(functionaryData);
        return await temp.save();
    }

    async findFunctionaryById(id){
        return await functionary.findById(id);
    }

    async findAllFunctionarys(){
        return await functionary.find();
    }

    async updateFunctionary(id, functionaryData) {
        return await functionary.findByIdAndUpdate(id, functionaryData, { new: true });
    }

    async deleteFunctionary(id) {
        return await functionary.findByIdAndDelete(id);
    }
}

export default new FunctionaryRepository();