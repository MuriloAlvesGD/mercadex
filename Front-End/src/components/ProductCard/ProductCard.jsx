import DefaultImageIcon from "../../assets/defaultImageIcon.png";
import "./ProductCard.css"
import {useState} from "react";

function ProductCard({product, openPopUp}) {
    return (
        <div className="product-card" onClick={openPopUp}>
            <img src={DefaultImageIcon} alt="product"/>
            <div id="info">
                <h5>{"id: " + product.id}</h5>
                <h3>{product.name}</h3>
                <h4>{product.brand}</h4>
                <p>{"estoque: " + product.quantity}</p>
                {product.hasDiscount ? <p><span id='line-price'>{"R$" + product.price}</span>
                    <span>{"R$" + product.priceNew}</span></p> : <p><span>{"R$" + product.price}</span></p>}
        </div>
</div>
    )
}

export default ProductCard;