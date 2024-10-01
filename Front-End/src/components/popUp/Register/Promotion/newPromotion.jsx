import React, {useEffect, useState} from 'react';
import axios from 'axios';
import '../../PopUpForm.css';
import "./newPromotion.css"
import Delete from "../../Delete/Delete.jsx";
import ProductCard from "../../../ProductCard/ProductCard.jsx";

const NewPromotion = ({isOpen, onClose, promotion}) => {
    const [promotionPrice, setPromotionPrice] = useState('');
    const [errorMensage, setErrorMensage] = useState("")
    const [products, setProducts] = useState([])
    const [expireAt, setExpireAt] = useState('')
    const [selectedProduct, setSelectedProduct] = useState('')
    const [isPopUpOpen, setPopUpOpen] = useState(false);
    const openPopUp = () => setPopUpOpen(true);
    const closePopUp = () => {
        setPopUpOpen(false);
        onClose()
    };

    const handleClose = () => {
        setPromotionPrice('');
        setSelectedProduct('');
        setExpireAt('');
        setProducts([]);
        onClose()
    }

    const getProducstOnStock = async () => {
        try {
            const response = await axios.get('http://localhost:3333/products/stock', {withCredentials: true});
            setProducts(response.data)
        }
        catch (error) {
            console.log(error)
        }
    }

    const deletePromotion = async (deleteID) => {
        try {
            const response = await axios.delete(`http://localhost:3333/promotion/${deleteID}`, {withCredentials: true});
            console.log("promotion deleted");
        }
        catch (error) {
            console.log(error)
        }
    }

    const handleSubmit = async () => {
        if (!selectedProduct) {
            console.log("Por favor, selecione uma carta.");
            return;
        }

        if (!promotionPrice || promotionPrice >= selectedProduct.price) {
            console.log("Por favor, insira um preço menor do que o atual");
            return;
        }

        if (new Date(expireAt).getTime() <= new Date(Date.now()).getTime()) {
            console.log("Por favor, insira uma data Válida");
            return;
        }

        if (!promotion) {
            try {
                // Enviar os dados completos para o backend
                const response = await axios.post("http://localhost:3333/promotion/", {
                    productId: selectedProduct._id,
                    price: promotionPrice,
                    expireAt: expireAt,
                }, {withCredentials: true});
                handleClose();
            } catch (error) {
                console.error("Erro ao atualizar promoção:", error);
                console.log(error.response.data.error);
            }
        }
            else {
            try {
                const response = await axios.put(
                    "http://localhost:3333/promotion/" + promotion._id,
                    {
                        productId: selectedProduct._id,
                        price: promotionPrice,
                        expireAt: expireAt,
                    },{withCredentials: true}
                );
                handleClose();
            } catch (error) {
                console.log(error);
            }
        }
    };


    useEffect(() => {
        getProducstOnStock()
        if (promotion){
            setPromotionPrice(promotion.price);
            setSelectedProduct(promotion.Product);
            setExpireAt(promotion.expireAt.split("T")[0]);
        }
    }, [isOpen])


    if (!isOpen) return null;

    return (
        <div className="popup-overlay">
            <div className="popup-content">
                <h2>{promotion ? "Atualizar" : "Registrar"} Promoção</h2>
                <div id="popup-promotion-header">
                    <div>
                        <div className="form-group">
                            <label>Data de Expiração:</label>
                            <input
                                type="Date"
                                value={expireAt}
                                onChange={(e) => setExpireAt(e.target.value)}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>Valor da Promoção:</label>
                            <input
                                type="number"
                                value={promotionPrice}
                                onChange={(e) => setPromotionPrice(e.target.value)}
                                required
                            />
                        </div>
                    </div>
                    <div className="button-group">
                        <button type="button" onClick={handleClose}>Fechar</button>
                        <button type="submit" onClick={handleSubmit}>{promotion ? "Atualizar" : "Registrar"}</button>
                        {promotion ? <button type="button" onClick={openPopUp}>Deletar</button> : ""}
                    </div>
                </div>
                <section className="products-table">
                    {products.map((product) => (
                        <div className={selectedProduct._id === product._id ? "outline-product" : ""} key={product._id} onClick={() => setSelectedProduct(product)}>
                        <ProductCard product={product}/>
                        </div>
                    ))}
                </section>
                <Delete isOpen={isPopUpOpen} onClose={closePopUp} deleteFunction={deletePromotion} deleteID={promotion._id}/>
            </div>
        </div>
    );
};

export default NewPromotion;
