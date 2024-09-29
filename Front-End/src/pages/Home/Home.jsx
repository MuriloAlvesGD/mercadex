import "./Home.css"
import Carousel from "../../components/Carousel/Carousel.jsx"
import DefaultImageIcon from "../../assets/defaultImageIcon.png"

function Home() {
    return (
        <>
            <div className="content-container">
                <Carousel>
                    {/*colocar imagens no padrão 16:9 */}
                    <p className="teste">teste</p>
                    <p className="teste">teste</p>
                    <p className="teste">teste</p>
                    <p className="teste">teste</p>
                    <p className="teste">teste</p>
                </Carousel>
                <Carousel>
                    {/*colocar imagens no padrão 16:9 */}
                    <img src={DefaultImageIcon} className="enterpriseImage"/>
                    <img src={DefaultImageIcon} className="enterpriseImage"/>
                    <img src={DefaultImageIcon} className="enterpriseImage"/>
                    <img src={DefaultImageIcon} className="enterpriseImage"/>
                    <img src={DefaultImageIcon} className="enterpriseImage"/>
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