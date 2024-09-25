import DefaultImageIcon from "../../assets/defaultImageIcon.png";
import "./ProductCard.css"

function ProductCard({product, openPopUp}) {
    return (
        <div className="product-card" onClick={openPopUp}>
            <img src={product.images[0] || DefaultImageIcon} alt="product"/>
            <div id="info">
                <h5>{"id: " + product._id}</h5>
                <h3>{product.name}</h3>
                <h4>{product.brand}</h4>
                <p>{"estoque: " + product.stock.qtd}</p>
                {product.price.hasDiscount ? <p><span id='line-price'>{"R$" + product.price.oldPrice}</span>
                    <span>{"R$" + product.price.price}</span></p> : <p><span>{"R$" + product.price.price}</span></p>}
        </div>
</div>
    )
}

export default ProductCard;