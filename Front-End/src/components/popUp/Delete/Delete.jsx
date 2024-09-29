import React from 'react';
import '../PopUpForm.css';
import axios from "axios";

const Delete = ({isOpen, onClose, deleteProduct}) => {

    const handleClose = () => {
        onClose()
    }

    const handleDelete = async () => {
        try {
            // Verifica se deleteProduct é válido
            if (!deleteProduct) {
                throw new Error('Product ID is required for deletion');
            }

            const response = await axios.delete(`http://localhost:3333/products/${deleteProduct}`, { withCredentials: true });

            // Verifica se a resposta é bem-sucedida
            if (response.status === 200) {
                handleClose(); // Fecha o popup após a exclusão
            } else {
                console.log('Error deleting product:', response.data);
            }
        } catch (e) {
            // Loga o erro com mais detalhes
            console.error('Error occurred during deletion:', e.response ? e.response.data : e.message);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="popup-overlay">
            <div className="popup-content" id="pop-delete">
                <h2>Você Realmente quer deletar esse item?</h2>
                <div className="button-group">
                    <button type="submit" onClick={handleDelete}>Deletar</button>
                    <button type="button" onClick={handleClose}>Fechar</button>
                </div>
            </div>
        </div>
    );
};

export default Delete;
