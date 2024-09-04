import DefaultImageIcon from "../../assets/defaultImageIcon.png";
import "./ProductCard.css"

function ProductCard({product}) {
    return(
        <div className="product-card">
            <img src={DefaultImageIcon} alt="product"/>
            <div id="info">
                <h3>{product.name}</h3>
                <p>{"R$" + product.price}</p>
            </div>
        </div>
    )
}

export default ProductCard;