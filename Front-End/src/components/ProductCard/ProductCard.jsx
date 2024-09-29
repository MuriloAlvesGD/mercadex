import DefaultImageIcon from "../../assets/defaultImageIcon.png";
import {IoIosArrowBack} from "react-icons/io";
import {IoIosArrowForward} from "react-icons/io";
import "./ProductCard.css"
import {useState} from "react";

function ProductCard({product, openPopUp}) {
    const [index, setIndex] = useState(0);

    return (


        <div className="product-card">
            <div id="arrow-btns">
                <IoIosArrowBack className="arrow" onClick={() => setIndex((prev) => prev === 0 ? product.images.length - 1 : prev - 1)}/>
                <IoIosArrowForward className="arrow" onClick={() => setIndex((prev) => prev === product.images.length - 1 ? 0 : prev + 1)}/>
            </div>
            <div onClick={openPopUp}>
                <img src={product.images[index] || DefaultImageIcon} alt="product"/>
                <div id="info">
                    <h5>{"id: " + product._id}</h5>
                    <h3>{product.name}</h3>
                    <h4>{product.brand}</h4>
                    <p>{"estoque: " + product.stock.qtd}</p>
                    {product.price.hasDiscount ? <p><span id='line-price'>{"R$" + product.price.oldPrice}</span>
                            <span>{"R$" + product.price.price}</span></p> :
                        <p><span>{"R$" + product.price.price}</span></p>}
                </div>
            </div>
        </div>
    )
}

export default ProductCard;