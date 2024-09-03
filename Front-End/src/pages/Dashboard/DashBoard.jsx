import "./DashBoard.css"
import {Carousel} from "../../components/Carousel/Carousel.jsx";
import CarouselItem from "../../components/Carousel/CarouselItem.jsx";
import DefaultImageIcon from "../../assets/defaultImageIcon.png";
import { Chart as ChartJS,CategoryScale,LinearScale,BarElement,Title,Tooltip,Legend,} from 'chart.js';
ChartJS.register(CategoryScale,LinearScale,BarElement,Title,Tooltip,Legend);
import {Bar} from 'react-chartjs-2';

const options = {
    responsive: true,
    plugins: {
        legend: {
            position: 'top',
        },
        title: {
            display: true,
            position: 'top',
            text: 'Data',
            color: '#df5201',
        },
        layout: {
            padding: 100,
        }
    },
};

const labels = ["janeiro", "fevereiro", "março", "abril", "maio", "junho", "julho"];
const data = {
    labels,
    datasets: [
        {
            label: 'Dataset vermelho',
            data: labels.map((() => Math.floor(Math.random() * 100))),
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
            borderColor: 'red',
            borderWidth: 1
        },
    ],
};

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
                                    <Bar options={options} data={data}/>
                                </main>
                                <div className="right-section">
                                    <img src={DefaultImageIcon} alt="best seller product"
                                         className="best-seller-product"/>
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