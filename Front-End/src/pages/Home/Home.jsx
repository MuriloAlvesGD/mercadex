import "./Home.css"
import {Carousel} from "../../components/Carousel/Carousel.jsx"
import {CarouselItem} from "../../components/Carousel/CarouselItem.jsx"
import DefaultImageIcon from "../../assets/defaultImageIcon.png"

function Home() {
    return (
        <>
            <div className="content-container">
                <Carousel margin={"0 25vh"} translateVar={170}>
                    {/*colocar imagens no padrão 16:9 */}
                    <CarouselItem><p className="teste">teste</p></CarouselItem>
                    <CarouselItem><p className="teste">teste</p></CarouselItem>
                    <CarouselItem><p className="teste">teste</p></CarouselItem>
                    <CarouselItem><p className="teste">teste</p></CarouselItem>
                    <CarouselItem><p className="teste">teste</p></CarouselItem>
                </Carousel>
                <Carousel margin={"0 5vh"} translateVar={10}>
                    {/*colocar imagens no padrão 16:9 */}
                    <CarouselItem><img src={DefaultImageIcon} className="enterpriseImage"/></CarouselItem>
                    <CarouselItem><img src={DefaultImageIcon} className="enterpriseImage"/></CarouselItem>
                    <CarouselItem><img src={DefaultImageIcon} className="enterpriseImage"/></CarouselItem>
                    <CarouselItem><img src={DefaultImageIcon} className="enterpriseImage"/></CarouselItem>
                    <CarouselItem><img src={DefaultImageIcon} className="enterpriseImage"/></CarouselItem>
                </Carousel>
                <section className="table" id="products">
                    <div className="product-card">
                        <img src={DefaultImageIcon} alt="product"/>
                        <p>Nome da Loja</p>
                        <h3>Nome do Produto</h3>
                        <p>preço</p>
                    </div>
                </section>
            </div>
        </>
    )
}

export default Home;