import enterpriseService from "../service/EnterpriseService.js";
import enterprise from "../models/enterprise.js"
import functionary from "../models/functionary.js"
import {isBase64, isEmail} from "../helpers/GlobalFunctions.js";
import functionaryService from "../service/FunctionaryService.js";


class EnterpriseController {
    async getDataOfAllEnterprises(req, res) {
        try {
            const enterprises = await enterprise.find({}, {CNPJ: 1, name: 1, profileImage: 1});
            return res.status(200).json(enterprises);
        } catch (e) {
            return res.status(400).json({error: e.message});
        }
    }

    async createEnterprise(req, res) {
        try {
            const email = atob(JSON.parse(req.headers.user));
            const user = await functionary.findOne({login: email}, {_id: 1});
            if (!user) {
                return res.status(404).json({message: 'User not Found'});
            }
            const {name, CNPJ, address, contact, enterpriseEmail, profileImg} = req.body;

            if ([!name, !CNPJ, !address, !contact, !enterpriseEmail, !profileImg].includes(true)) {
                return res.status(400).json({error: 'All Fields are required'});
            }

            const existCNPJ = await enterprise.findOne({CNPJ: CNPJ});
            if (existCNPJ){
                return res.status(400).json({error: 'CNPJ actually in use'});
            }

            const temp = {
                name: name.length <= 100 ? name : name.slice(0, 100),
                CNPJ: CNPJ.length <= 14 ? CNPJ : CNPJ.slice(0, 14),
                profileImage: profileImg,
                admin: user,
                address: {
                    street: address.street,
                    number: address.number,
                    city: address.city,
                    state: address.state,
                    zipCode: address.zipCode,
                },
                contact: {
                    phone: contact.phone,
                    email: isEmail(enterpriseEmail) ? enterpriseEmail : null,
                },
            }

            const result = await enterprise.create(temp)
            const userResult = await functionary.findByIdAndUpdate({_id: user._id}, {
                enterprise_id: result._id,
                assignment: {name: "ADMIN", description: "Administrator of enterprise", accessLevel: 100}
            }, {new: true})

            return res.status(201).json({mensage: "create enterprise sucessful", object: {userResult}})
        } catch (e) {
            return res.status(400).json({error: e.message});
        }
    }
}

export default new EnterpriseController();