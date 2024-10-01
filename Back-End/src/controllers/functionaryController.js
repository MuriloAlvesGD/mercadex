import functionaryService from "../service/FunctionaryService.js";
import {isEmail, verifyPassword} from "../helpers/GlobalFunctions.js";

class FunctionaryController {
    async create(req, res) {
        try {
            const {name, CPF, bornDate, address, contact, login, password} = req.body;

            // Verifica a validade da senha
            if (!verifyPassword(password)) {
                return res.status(406).json({error: "Invalid password"});
            }

            // Cria o objeto temporário para o funcionário
            const temp = {
                name,
                CPF,
                bornDate: new Date(bornDate),
                address: {
                    street: address.street,
                    number: address.number,
                    city: address.city,
                    state: address.state,
                    zipCode: address.zipCode,
                },
                contact: {
                    phone: contact.phone,
                    email: isEmail(login) ? login : null,
                },
                login,
                password,
            };
            const response = await functionaryService.createFunctionary(temp);
            return res.status(201).json({response});
        } catch (error) {
            return res.status(400).json({error: error.message});
        }
    }
}

export default new FunctionaryController();
