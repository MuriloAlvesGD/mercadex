import enterpriseService from "../service/EnterpriseService.js";


class EnterpriseController {
    async getDataOfAllEnterprises(req, res) {
        try {
            const enterprises = await enterpriseService.getAllEnterprises();
            return res.status(200).json(enterprises);
        }
        catch (e) {
            return res.status(400).json({error: e.message});
        }
    }
}

export default new EnterpriseController();