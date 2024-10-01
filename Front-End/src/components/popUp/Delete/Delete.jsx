import React from 'react';
import '../PopUpForm.css';
import axios from "axios";

const Delete = ({isOpen, onClose, deleteFunction, deleteID}) => {

    const handleClose = () => {
        onClose()
    }

    const handleDelete = async () => {
        try {
            // Verifica se deleteProduct é válido
            if (!deleteID) {
                throw new Error('Delete ID is required for deletion');
            }

            await deleteFunction(deleteID);
            handleClose();
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
