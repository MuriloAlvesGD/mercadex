import "./Admin.css";
import { useState} from "react";
import { Carousel } from "../../components/Carousel/Carousel.jsx";
import CarouselItem from "../../components/Carousel/CarouselItem.jsx";
import DefaultImageIcon from "../../assets/defaultImageIcon.png";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import ClientCard from "../../components/ClientCard/ClientCard.jsx";
import ProductCard from "../../components/ProductCard/ProductCard.jsx";
import { MdAddBox } from "react-icons/md";
import Register from "../../components/popUp/Register/Register.jsx";
import Edit from "../../components/popUp/Edit/Edit.jsx";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const options = {
    responsive: true,
    layout: {
        padding: 20,
    },
    plugins: {
        legend: { display: false },
        title: {
            display: true,
            position: 'top',
            text: 'Vendas por Mês',
            color: '#df5201',
            font: {
                size: 20,
                family: 'Inter, system-ui, Avenir, Helvetica, Arial, sans-serif',
            }
        }
    }
};

const labels = ["janeiro", "fevereiro", "março", "abril", "maio", "junho", "julho"];
const data = {
    labels,
    datasets: [{
        data: labels.map(() => Math.floor(Math.random() * 100)),
        backgroundColor: '#99e1d9ff',
        borderColor: '#199C8AFF',
        borderWidth: 1
    }],
};

let products = [
    {
        id: 1,
        name: "arroz",
        brand: "japonês",
        weight: 1000,
        quantity: 9,
        price: 10,
        priceNew: 0,
        hasDiscount: false,
    },
    {
        id: 2,
        name: "bolacha recheada",
        brand: "trakinas",
        weight: 250,
        quantity: 4,
        price: 10,
        priceNew: 0,
        hasDiscount: false,
    }
]

function Admin() {
    const [searchProduct, setSearchProduct] = useState('');
    const [isPopUpOpen, setPopUpOpen] = useState(false);
    const [pop, setPop] = useState(0);
    const openPopUp = (pop) => {setPopUpOpen(true);setPop(pop)}
    const closePopUp = () => setPopUpOpen(false);
    const [editProduct, setEditProduct] = useState(0);

    const addProduct = (newProduct) => products.push(newProduct);
    const getProducts = () => products
    const updateProduct = (oldProduct, newProduct) => {products = products.map(product => (product.id === oldProduct.id) ? newProduct : product);};
    const deleteProduct = (index) => products.splice(index, 1);

    const handleSearchProduct = (e) => setSearchProduct(e.target.value);

    const filteredProducts = products.filter(prod =>
        prod.name.toLowerCase().includes(searchProduct.toLowerCase())
    );

    return (
        <div className="content-container">
            <Carousel margin={"0 25vh"} translateVar={170}>
                <CarouselItem>
                    <div className="dashboard-container">
                        <div className="dashboard-item">
                            <main className="left-section">
                                <h1 className="dashboard-title">Produto Mais Vendido</h1>
                                <Bar options={options} data={data} />
                            </main>
                            <div className="right-section">
                                <img src={DefaultImageIcon} alt="best seller product" className="best-seller-product" />
                                <div className="dashboard-item-info">
                                    <h1>Nome do Produto</h1>
                                    <h2>Preço Médio:</h2>
                                    <h3>Última Venda</h3>
                                    <ClientCard client={{}} />
                                </div>
                            </div>
                        </div>
                    </div>
                </CarouselItem>
            </Carousel>
            <h1 className="section-title">Best Clients</h1>
            <Carousel margin={"0 5vh"} translateVar={10}>
                {Array.from({ length: 5 }, (_, index) => (
                    <CarouselItem key={index}>
                        <img src={DefaultImageIcon} className="enterpriseImage" alt={`Enterprise ${index + 1}`} />
                    </CarouselItem>
                ))}
            </Carousel>
            <h1 className="section-title">Selling Products</h1>
            <input
                id="product-search"
                onChange={handleSearchProduct}
                type="text"
                placeholder="Search Item"
            />
            <section id="table">
                <button className="register-btn" onClick={() => openPopUp(1)}><MdAddBox/><h1>CADASTRAR NOVO ITEM</h1></button>
                {filteredProducts.map((product) => (
                    <ProductCard product={product} key={product.id} openPopUp={() => {openPopUp(2); setEditProduct(product.id)}}/>
                ))}
            </section>
            {pop === 1 ? <Register isOpen={isPopUpOpen} onClose={closePopUp} addProduct={addProduct} getProducts={getProducts}/> : ''}
            {pop === 2 ? <Edit isOpen={isPopUpOpen} onClose={closePopUp} editProduct={editProduct} getProducts={getProducts} updateProduct={updateProduct} deleteProduct={deleteProduct}/> : ''}
        </div>
    );
}

export default Admin;
