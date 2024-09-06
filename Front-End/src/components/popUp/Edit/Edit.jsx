import React, {useEffect, useState} from 'react';
import './Edit.css';
import Delete from "../Delete/Delete.jsx";

const Edit = ({ isOpen, onClose, editProduct, getProducts, updateProduct, deleteProduct}) => {
    const [productName, setProductName] = useState('');
    const [productBrand, setProductBrand] = useState('');
    const [productWeight, setProductWeight] = useState(0);
    const [productQuantity, setProductQuantity] = useState(0);
    const [productPrice, setProductPrice] = useState('');
    const [oldProduct, setOldProduct] = useState({});
    const [isPopUpOpen, setPopUpOpen] = useState(false);
    const openPopUp = () => setPopUpOpen(true);
    const closePopUp = () => {setPopUpOpen(false); onClose()};

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
        const newProduct = {
            id: oldProduct.id,
            name: productName,
            brand: productBrand,
            weight: productWeight,
            quantity: productQuantity,
            price: productPrice < oldProduct.price ? oldProduct.price : productPrice,
            priceNew: productPrice,
            hasDiscount: productPrice < oldProduct.price,
        }
        updateProduct(oldProduct, newProduct);
        console.log('Produto Registrado:', { name: productName, price: productPrice });
        handleClose() // Fecha o popup após o registro
    };

    useEffect(()=>{
        if (isOpen){
            const item = getProducts().filter((t) => t.id === editProduct)[0];
            setProductName(item.name);
            setProductBrand(item.brand);
            setProductWeight(item.weight);
            setProductPrice(item.price);
            setProductQuantity(item.quantity);
            setOldProduct(item);
            console.log("produto a ser editado  " + item)
        }
    }, [isOpen]);

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
                            type="number"
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
                        <button type="submit">Atualizar</button>
                        <button type="button" onClick={handleClose}>Fechar</button>
                    </div>
                    <button id="delete-btn" type="button" onClick={openPopUp}>Deletar</button>
                </form>
                <Delete isOpen={isPopUpOpen} onClose={closePopUp} getItems={getProducts} deleteItem={deleteProduct} itemID={editProduct} />
            </div>
        </div>
    );
};

export default Edit;
