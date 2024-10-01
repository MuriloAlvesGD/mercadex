import enterpriseService from "../service/EnterpriseService.js";
import enterprise from "../models/enterprise.js";
import functionary from "../models/functionary.js";
import { isBase64, isEmail } from "../helpers/GlobalFunctions.js";
import functionaryService from "../service/FunctionaryService.js";

class EnterpriseController {
    async getDataOfAllEnterprises(req, res) {
        try {
            const enterprises = await enterprise.find({}, { CNPJ: 1, name: 1, profileImage: 1 });
            return res.status(200).json(enterprises);
        } catch (e) {
            return res.status(400).json({ error: e.message });
        }
    }

    async createEnterprise(req, res) {
        try {
            const email = atob(JSON.parse(req.headers.user));
            const user = await functionary.findOne({ login: email }, { _id: 1 });

            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }

            const { name, CNPJ, address, contact, enterpriseEmail, profileImg } = req.body;

            // Validação dos campos obrigatórios
            if (![name, CNPJ, address, contact, enterpriseEmail, profileImg].every(Boolean)) {
                return res.status(400).json({ error: 'All fields are required' });
            }

            const existCNPJ = await enterprise.findOne({ CNPJ });
            if (existCNPJ) {
                return res.status(400).json({ error: 'CNPJ already in use' });
            }

            const temp = {
                name: name.slice(0, 100), // Limita o nome a 100 caracteres
                CNPJ: CNPJ.slice(0, 14), // Limita o CNPJ a 14 caracteres
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
            };

            const result = await enterprise.create(temp);
            await functionary.findByIdAndUpdate(user._id, {
                enterprise_id: result._id,
                assignment: { name: "ADMIN", description: "Administrator of enterprise", accessLevel: 100 }
            }, { new: true });

            return res.status(201).json({ message: "Enterprise created successfully", object: { userResult: result } });
        } catch (e) {
            return res.status(400).json({ error: e.message });
        }
    }
}

export default new EnterpriseController();
