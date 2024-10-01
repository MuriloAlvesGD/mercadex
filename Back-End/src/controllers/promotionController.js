import Promotion from '../models/Promotion.js';
import Product from '../models/productModels/product.js';
import Client from '../models/client.js';
import {getEnterpriseId} from "../helpers/GlobalFunctions.js";

export const getAllPromotions = async (req, res) => {
    try {
        const enterpriseId = await getEnterpriseId(req);
        const promotions = await Promotion.find({enterprise_id: enterpriseId})
            .populate('Product', ["name", "images", "stock"])
            .populate('Client', "name")



        // Filtra e deleta promoções sem produto ou estoque
        const promotionsToDelete = promotions.filter(promotion => {
            const product = promotion.Product;
            return !product || product.stock.qtd <= 0;
        });

        if (promotionsToDelete.length > 0) {
            await Promotion.deleteMany({ _id: { $in: promotionsToDelete.map(p => p._id) } });
        }

        const remainingPromotions = await Promotion.find({enterprise_id: enterpriseId})
            .populate('Product', ["name", "images", "stock"])
            .populate('Client', "name");

        return res.status(200).json(remainingPromotions);
    } catch (e) {
        return res.status(500).json({message: "erro ao buscar as promos", error: e.message});
    }
}

export const getPromotionById = async (req, res) => {
    try {
        const {id} = req.params;
        const promotion = await Promotion.findById(id)
            .populate('Product', ["name", "images", "stock"])
            .populate('Client', "name");

        if (!promotion) {
            return res.status(404).json({message: 'Promotion not found'});
        }

        return res.status(200).json(promotion);
    } catch (e) {
        return res.status(500).json({error: e.message});
    }
}

export const getPromotionByClientId = async (req, res) => {
    try {
        const {id} = req.params;
        const promotions = id
            ? await Promotion.find({Client: id})
            : await Promotion.find();

        return res.status(200).json(promotions);
    } catch (e) {
        return res.status(500).json({error: e.message});
    }
}

export const createPromotion = async (req, res) => {
    try {
        const {productId, clientId, price, expireAt} = req.body;
        const enterpriseId = await getEnterpriseId(req);

        if (!productId || !price || !expireAt) {
            return res.status(400).json({error: 'Undefined Parameters'});
        }

        if (new Date(expireAt) <= new Date()) {
            return res.status(400).json({error: 'Expire date is in the past'});
        }

        const existPromotion = await Promotion.findOne({Product: productId, enterprise_id: enterpriseId});
        if (existPromotion) {
            return res.status(400).json({error: 'Promotion already exists for this product'});
        }

        const existProduct = await Product.findById(productId);
        if (!existProduct || existProduct.stock.qtd <= 0) {
            return res.status(400).json({error: 'Product Not Found or not in stock'});
        }

        if (clientId) {
            const existClient = await Client.findById(clientId);
            if (!existClient) {
                return res.status(400).json({error: 'Client Not Found'});
            }
        }

        if (price < 0 || price >= existProduct.price.price) {
            return res.status(400).json({error: 'Invalid Price'});
        }

        const newPromotion = new Promotion({Product: productId, enterprise_id: enterpriseId, Client: clientId, price, expireAt});
        await newPromotion.save();

        return res.status(201).json({message: "New promotion created", newPromotion});
    } catch (error) {
        return res.status(400).json({error: error.message});
    }
}

export const updatePromotion = async (req, res) => {
    try {
        const {id} = req.params;
        const {productId, clientId, price, expireAt} = req.body;
        const enterpriseId = await getEnterpriseId(req);

        if (!productId || !price || !expireAt) {
            return res.status(400).json({error: 'Undefined Parameters'});
        }

        if (new Date(expireAt) <= new Date()) {
            return res.status(400).json({error: 'Expire date is in the past'});
        }

        const existPromotion = await Promotion.findById(id);
        if (!existPromotion) {
            return res.status(404).json({error: 'Promotion Not Found'});
        }

        const existProduct = await Product.findById(productId);
        if (!existProduct) {
            return res.status(400).json({error: 'Product Not Found'});
        }

        if (clientId) {
            const existClient = await Client.findById(clientId);
            if (!existClient) {
                return res.status(400).json({error: 'Client Not Found'});
            }
        }

        if (price < 0 || price >= existProduct.price.price) {
            return res.status(400).json({error: 'Invalid Price'});
        }

        const updatedPromotion = await Promotion.findByIdAndUpdate(id, {
            Product: productId,
            Client: clientId,
            price,
            expireAt
        }, { new: true });

        return res.status(200).json({updatedPromotion});
    } catch (error) {
        return res.status(400).json({error: error.message});
    }
}

export const deletePromotionById = async (req, res) => {
    try {
        const {id} = req.params;
        const result = await Promotion.deleteOne({_id: id});
        return res.status(200).json({result});
    } catch (error) {
        return res.status(400).json({error: error.message});
    }
}
