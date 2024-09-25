import functionaryService from "../service/FunctionaryService.js";
import {isEmail, verifyPassword} from "../helpers/GlobalFunctions.js";

class FunctionaryController {
    async create(req, res) {
        const {name, CPF, bornDate, address, contact, login, password} = req.body;
        if (!verifyPassword(password)) {
            const temp = {
                name: name,
                CPF: CPF,
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
                login: login,
                password: password,
            }
            try {
                const response = await functionaryService.createFunctionary(temp);
                return res.status(201).json({response});
            } catch (error) {
                return res.status(400).json({error: error.message});
            }
        } else {
            return res.status(406).json({error: "invalid password"});
        }
    }
    
    async 
}

export default new FunctionaryController();