import "./DashBoard.css"
import {Carousel} from "../../components/Carousel/Carousel.jsx";
import CarouselItem from "../../components/Carousel/CarouselItem.jsx";
import DefaultImageIcon from "../../assets/defaultImageIcon.png";

function DashBoard() {
    return (
        <>
            <div className="content-container">
                <Carousel margin={"0 25vh"} translateVar={170}>
                    {/*colocar imagens no padrão 16:9 */}
                    <CarouselItem>
                        <div className="dashboard-container">
                            <div className="dashboard-item">
                                <main className="left-section">
                                    <h1 className="dashboard-title">Produto Mais Vendido</h1>
                                </main>
                                <div className="right-section">
                                    <img src={DefaultImageIcon} alt="best seller product" className="best-seller-product"/>
                                    <div className="dashboard-item-text">
                                        <h1>Nome do Produto</h1>
                                        <h2>preço</h2>
                                        <h3>Ultima Venda</h3>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </CarouselItem>
                </Carousel>
                <h1 className="section-title">Best Clients</h1>
                <Carousel margin={"0 5vh"} translateVar={10}>
                    {/*colocar imagens no padrão 16:9 */}
                    <CarouselItem><img src={DefaultImageIcon} className="enterpriseImage"/></CarouselItem>
                    <CarouselItem><img src={DefaultImageIcon} className="enterpriseImage"/></CarouselItem>
                    <CarouselItem><img src={DefaultImageIcon} className="enterpriseImage"/></CarouselItem>
                    <CarouselItem><img src={DefaultImageIcon} className="enterpriseImage"/></CarouselItem>
                    <CarouselItem><img src={DefaultImageIcon} className="enterpriseImage"/></CarouselItem>
                </Carousel>
                <h1 className="section-title">Selling Products</h1>
                <section className="table" id="products">
                    <div className="product-card">
                        <img src={DefaultImageIcon} alt="product"/>
                        <div id="info">
                            <h3>Nome do Produto</h3>
                            <p>preço</p>
                        </div>
                    </div>
                </section>
            </div>
        </>
    )
}

export default DashBoard