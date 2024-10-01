import "./PromotionCard.css"
import DefaultImageIcon from "../../assets/defaultImageIcon.png";
import NewPromotion from "../popUp/Register/Promotion/newPromotion.jsx";
import {useState} from "react";

function PromotionCard({promotion, onOpen}) {

    function formatDate(isoDate) {
        const date = new Date(isoDate);
        const day = String(date.getUTCDate()).padStart(2, '0');
        const month = String(date.getUTCMonth() + 1).padStart(2, '0'); // Mês (0-11)
        const year = date.getUTCFullYear(); // Ano

        return `${day}/${month}/${year}`;
    }

    return (
        <div className="promotion-card">
            <img src={promotion.Product.images[0] ? promotion.Product.images[0] : DefaultImageIcon} alt=""/>
            <div className="promotion-infos">
                <div>
                    <h4>Nome do Produto:</h4>
                    <h3>{promotion.Product.name}</h3>
                </div>
                <div>
                    <h4>Estoque:</h4>
                    <h3>{promotion.Product.stock.qtd}</h3>
                </div>
                <div>
                    <h4>Valor da Promoção:</h4>
                    <h3>{"R$" + promotion.price.toFixed(2)}</h3>
                </div>
                <div>
                    <h4>Válido Até:</h4>
                    <h3>{formatDate(promotion.expireAt)}</h3>
                </div>
                <div>
                    <h4>Cliente:</h4>
                    <h3>{promotion.Client ? promotion.Client.name : "todos"}</h3>
                </div>
                <button className="register-btn" onClick={() => onOpen(promotion)}>EDITAR</button>
            </div>
        </div>
    )
}

export default PromotionCard;