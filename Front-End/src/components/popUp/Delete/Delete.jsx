import React from 'react';
import './Delete.css';

const Delete = ({ isOpen, onClose, getItems, deleteItem, itemID}) => {

    const handleClose = () => {
        onClose()
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const index = getItems().findIndex(item => item.id === itemID);
        deleteItem(index);
        console.log('Produto Deletado:', index);
        handleClose() // Fecha o popup após o registro
    };

    if (!isOpen) return null;

    return (
        <div className="popup-overlay">
            <div className="popup-content">
                <h3>Você Realmente quer deletar esse item?</h3>
                <div className="button-group">
                    <button type="submit" onClick={handleSubmit}>Deletar</button>
                    <button type="button" onClick={handleClose}>Fechar</button>
                </div>
            </div>
        </div>
    );
};

export default Delete;
