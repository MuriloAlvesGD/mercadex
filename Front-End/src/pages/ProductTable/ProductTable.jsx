import "./ProductTable.css";
import {useEffect, useState} from "react";
import ProductCard from "../../components/ProductCard/ProductCard.jsx";
import {MdAddBox} from "react-icons/md";
import Register from "../../components/popUp/Register/Register.jsx";
import axios from "axios";

function ProductTable() {
    const [isPopUpOpen, setPopUpOpen] = useState(false);
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [refresh, setRefresh] = useState(0);
    const [product, setProduct] = useState({});

    const openPopUp = (product) => {
        setPopUpOpen(true);
        setProduct(product)
    };

    const closePopUp = () => {setPopUpOpen(false); setRefresh((prev) => prev + 1); setProduct({})};

    const handleFilterProduct = (e) => {
        const query = e.toLowerCase();
        setFilteredProducts(products.filter(prod => prod.name.toLowerCase().includes(query)));
    };

    const getAllProducts = async () => {
        try {
            const response = await axios.get('http://localhost:3333/products/',
                {withCredentials: true});
            console.log(response.data);
            setProducts(response.data);
            setFilteredProducts(response.data);
        } catch (e) {
            console.error(e);
        }
    };

    useEffect(() => {
        getAllProducts();
    }, [refresh]);

    return (
        <div className="content-container">
            <h1 className="section-title">Selling Products</h1>
            <input
                id="product-search"
                onChange={(e) => handleFilterProduct(e.target.value)}
                type="text"
                placeholder="Search Item"
            />
            <section id="table">
                <button className="register-btn" onClick={() => openPopUp(1)}>
                    <MdAddBox/>
                    <h1>CADASTRAR NOVO ITEM</h1>
                </button>
                {filteredProducts.map((product) => (
                    <ProductCard product={product} key={product._id} openPopUp={() => openPopUp(product)}/>
                ))}
            </section>
            <Register isOpen={isPopUpOpen} onClose={closePopUp} product={product}/>
        </div>
    );
}

export default ProductTable;
