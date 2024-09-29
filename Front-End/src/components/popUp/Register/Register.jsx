import React, {useEffect, useState} from 'react';
import axios from 'axios';
import '../PopUpForm.css';
import {CiImageOn} from "react-icons/ci";
import Delete from "../Delete/Delete.jsx";

const Register = ({isOpen, onClose, product}) => {
    const [productName, setProductName] = useState('');
    const [productBrand, setProductBrand] = useState('');
    const [productDescription, setProductDescription] = useState('');
    const [productImages, setProductImages] = useState([]);
    const [productPrice, setProductPrice] = useState('');
    const [hasDiscount, setHasDiscount] = useState(false);
    const [currency, setCurrency] = useState('');
    const [productWeight, setProductWeight] = useState(0);
    const [productQuantity, setProductQuantity] = useState(0);
    const [profileImgs, setProfileImgs] = useState([])
    const [errorMensage, setErrorMensage] = useState("")
    const [isPopUpOpen, setPopUpOpen] = useState(false);
    const openPopUp = () => setPopUpOpen(true);
    const closePopUp = () => {setPopUpOpen(false); onClose()};

    const handleClose = () => {
        setProductName('');
        setProductWeight('');
        setProductBrand('');
        setProductQuantity(0);
        setProductPrice('');
        setProfileImgs([]);
        onClose()
    }

    const handlesetProfileImgs = (e) => {
        const files = Array.from(e.target.files); // Converte a lista de arquivos em um array
        const newImages = [];

        files.forEach((file) => {
            const reader = new FileReader();
            reader.readAsDataURL(file); // Lê o arquivo como URL de dados

            reader.onload = function (e) {
                const imageUrl = e.target.result; // URL da imagem
                const imageType = imageUrl.split(":")[1].split(";")[0];

                if (imageType === "image/jpeg" || imageType === "image/png") {
                    setErrorMensage(""); // Limpa a mensagem de erro
                    newImages.push(imageUrl); // Adiciona a imagem ao array
                    if (newImages.length === files.length) {
                        if (profileImgs.length < 6) {
                            setProfileImgs((prevImages) => [...prevImages, ...newImages]); // Atualiza o estado com as novas imagens
                        }
                        else {
                            const imagesToKeep = profileImgs.slice(0, profileImgs.length - newImages.length);
                            setProfileImgs([...imagesToKeep, ...newImages]);
                        }
                    }
                } else {
                    setErrorMensage("Adicione arquivos do tipo JPEG ou PNG");
                }
            };
        });
    };

    const handleDeleteImg = (index) => {
        setProfileImgs((prevImages) => {
            return prevImages.filter((_, i) => i !== index);
        });
    }

    const handleSubmit = async () => {
        try {
            if (!product._id){
                const response = await axios.post('http://localhost:3333/products/',
                    {
                        name: productName,
                        brand: productBrand,
                        images: profileImgs,
                        price: {
                            price: productPrice,
                            hasDiscount: false
                        },
                        stock: {
                            qtd: productQuantity,
                        },
                        specification: {
                            weight: productWeight,
                        }}, {withCredentials: true});
            } else {
                const response = await axios.put('http://localhost:3333/products/' + product._id,
                    {
                        name: productName,
                        brand: productBrand,
                        images: profileImgs,
                        price: {
                            price: productPrice,
                            hasDiscount: false
                        },
                        stock: {
                            qtd: productQuantity,
                        },
                        specification: {
                            weight: productWeight,
                        }}, {withCredentials: true});
            }
            handleClose();
        }
        catch (e) {
            console.error(e)
        }
    };

    useEffect(() => {
        if (product._id) {
            setProductName(product.name);
            setProductWeight(product.specification.weight);
            setProductBrand(product.brand);
            setProductQuantity(product.stock.qtd);
            setProductPrice(product.price.price);
            setProfileImgs(product.images);
        }
    },[isOpen])


    if (!isOpen) return null;

    return (
        <div className="popup-overlay">
            <div className="popup-content">
                <h2>{product._id ? "Atualizar" :"Registrar"} Produto</h2>
                <div id="imgs">
                    <label htmlFor="profile-img-input" id="img-input-label"><CiImageOn/><h3>foto de produto {profileImgs.length}/6</h3>
                    </label>
                    {profileImgs.length > 0 ? profileImgs.map((img, index) => (
                        <img key={index} src={img} alt={`Imagem ${index + 1}`} onClick={() => handleDeleteImg(index)}/>
                    )) : ""}
                </div>
                <input id="profile-img-input" onChange={(e) => handlesetProfileImgs(e)} type='file' accept="image/*"
                       multiple
                       style={{"display": "none"}}/>
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
                    {product._id ? <button type="button" onClick={openPopUp}>Deletar</button> : ""}
                    <button type="submit" onClick={handleSubmit}>{product._id ? "Atualizar":"Registrar"}</button>
                    <button type="button" onClick={handleClose}>Fechar</button>
                </div>
                <Delete isOpen={isPopUpOpen} onClose={closePopUp} deleteProduct={product._id}/>
            </div>
        </div>
    );
};

export default Register;
