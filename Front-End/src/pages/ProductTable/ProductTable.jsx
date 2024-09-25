import "./ProductTable.css";
import { useEffect, useState } from "react";
import ProductCard from "../../components/ProductCard/ProductCard.jsx";
import { MdAddBox } from "react-icons/md";
import Register from "../../components/popUp/Register/Register.jsx";
import Edit from "../../components/popUp/Edit/Edit.jsx";
import axios from "axios";

function ProductTable() {
    const [isPopUpOpen, setPopUpOpen] = useState(false);
    const [pop, setPop] = useState(0);
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);

    const openPopUp = (pop) => {
        setPopUpOpen(true);
        setPop(pop);
    };

    const closePopUp = () => setPopUpOpen(false);

    const handleFilterProduct = (e) => {
        const query = e.toLowerCase();
        setFilteredProducts(products.filter(prod => prod.name.toLowerCase().includes(query)));
    };

    useEffect(() => {
        const getAllProducts = async () => {
            try {
                const response = await axios.get('http://localhost:3333/products/', { withCredentials: true });
                setProducts(response.data);
                setFilteredProducts(response.data);
            } catch (e) {
                console.error(e);
            }
        };

        getAllProducts();
    }, []);

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
                    <MdAddBox />
                    <h1>CADASTRAR NOVO ITEM</h1>
                </button>
                {filteredProducts.map((product) => (
                    <ProductCard product={product} key={product._id} openPopUp={() => openPopUp(2)} />
                ))}
            </section>
            {pop === 1 && <Register isOpen={isPopUpOpen} onClose={closePopUp} />}
            {pop === 2 && <Edit isOpen={isPopUpOpen} onClose={closePopUp} />}
        </div>
    );
}

export default ProductTable;
