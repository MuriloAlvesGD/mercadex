import {MdAddBox} from "react-icons/md";
import Register from "../../components/popUp/Register/Register.jsx";
import {useEffect, useState} from "react";
import axios from "axios";
import "./PromotionTable.css";
import NewPromotion from "../../components/popUp/Register/Promotion/newPromotion.jsx";
import PromotionCard from "../../components/PromotionCard/PromotionCard.jsx";

function PromotionTable() {
    const [isPopUpOpen, setPopUpOpen] = useState(false);
    const [promotions, setPromotions] = useState([]);
    const [filteredPromotions, setFilteredPromotions] = useState([]);
    const [refresh, setRefresh] = useState(0);
    const [promotion, setPromotion] = useState(null);

    const openPopUp = (promotion) => {
        setPopUpOpen(true);
        setPromotion(promotion);
    };

    const closePopUp = () => {setPopUpOpen(false); setRefresh((prev) => prev + 1); setPromotion(null)};

    const handleFilterPromotion = (e) => {
        const query = e.toLowerCase();
        setFilteredPromotions(promotions.filter(prom => prom.Product.name.toLowerCase().includes(query)));
    };

    const getAllPromotions = async () => {
        try {
            const response = await axios.get('http://localhost:3333/promotion/',
                {withCredentials: true});
            setPromotions(response.data);
            setFilteredPromotions(response.data);
        } catch (e) {
            console.error(e);
        }
    };

    useEffect(() => {
        getAllPromotions();
    }, [refresh]);

    return (
        <div className="content-container">
            <header className="promotion-header">
                <button className="register-btn" onClick={() => openPopUp()}>
                    <MdAddBox/>
                    <h1>CADASTRAR NOVO ITEM</h1>
                </button>
                <div id="promotion-header-text">
                    <h1 className="section-title">Promotions</h1>
                    <input
                        id="product-search"
                        onChange={(e) => handleFilterPromotion(e.target.value)}
                        type="text"
                        placeholder="Search Promotion"
                    />
                </div>
            </header>
            <section id="promotion-table">
                {filteredPromotions.length > 0 && filteredPromotions.map((promotion) => (
                    <PromotionCard key={promotion._id} promotion={promotion} onOpen={openPopUp}/>
                ))}
            </section>
            <NewPromotion isOpen={isPopUpOpen} onClose={closePopUp} promotion={promotion}/>
        </div>
    )
}

export default PromotionTable