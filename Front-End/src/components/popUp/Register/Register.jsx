import React, {useState} from 'react';
import './Register.css';

const Register = ({ isOpen, onClose, addProduct, getProducts}) => {
    const [productName, setProductName] = useState('');
    const [productBrand, setProductBrand] = useState('');
    const [productWeight, setProductWeight] = useState(0);
    const [productQuantity, setProductQuantity] = useState(0);
    const [productPrice, setProductPrice] = useState('');

    const handleClose = () => {
        setProductName('');
        setProductWeight('');
        setProductBrand('');
        setProductQuantity(0);
        setProductPrice('');
        onClose()
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const products = getProducts();
        const lastId = products[products.length - 1].id;
        const newProduct = {
            id: lastId + 1,
            name: productName,
            brand: productBrand,
            weight: productWeight,
            quantity: productQuantity,
            price: productPrice,
            priceNew: "",
            hasDiscount: false,
        }
        addProduct(newProduct);
        console.log('Produto Registrado:', { name: productName, price: productPrice });
        handleClose() // Fecha o popup após o registro
    };

    if (!isOpen) return null;

    return (
        <div className="popup-overlay">
            <div className="popup-content">
                <h2>Registrar Produto</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Nome do Produto:</label>
                        <input
                            type="text"
                            value={productName}
                            onChange={(e) => setProductName(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Marca do Produto:</label>
                        <input
                            type="text"
                            value={productBrand}
                            onChange={(e) => setProductBrand(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Peso do Produto (em gramas):</label>
                        <input
                            type="text"
                            value={productWeight}
                            onChange={(e) => setProductWeight(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Estoque do Produto:</label>
                        <input
                            type="number"
                            value={productQuantity}
                            onChange={(e) => setProductQuantity(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Preço do Produto:</label>
                        <input
                            type="number"
                            value={productPrice}
                            onChange={(e) => setProductPrice(e.target.value)}
                            required
                        />
                    </div>
                    <div className="button-group">
                        <button type="submit">Registrar</button>
                        <button type="button" onClick={handleClose}>Fechar</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Register;
