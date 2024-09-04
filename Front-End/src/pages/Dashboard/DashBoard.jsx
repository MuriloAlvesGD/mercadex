import "./DashBoard.css"
import {Carousel} from "../../components/Carousel/Carousel.jsx";
import CarouselItem from "../../components/Carousel/CarouselItem.jsx";
import DefaultImageIcon from "../../assets/defaultImageIcon.png";
import { Chart as ChartJS,CategoryScale,LinearScale,BarElement,Title,Tooltip,Legend,} from 'chart.js';
ChartJS.register(CategoryScale,LinearScale,BarElement,Title,Tooltip,Legend);
import {Bar} from 'react-chartjs-2';
import ClientCard from "../../components/ClientCard/ClientCard.jsx";
import ProductCard from "../../components/ProductCard/ProductCard.jsx";

const options = {
    responsive: true,
    layout: {
        padding: 20,
    },
    plugins: {
        legend: {
            display: false,
        },
        title: {
            display: true,
            position: 'top',
            text: 'Vendas por Mês',
            color: '#df5201',
            font: {
                size: 20,
                family: 'Inter, system-ui, Avenir, Helvetica, Arial, sans-serif',
            }
        }
    }
};

const labels = ["janeiro", "fevereiro", "março", "abril", "maio", "junho", "julho"];
const data = {
    labels,
    datasets: [
        {
            data: labels.map((() => Math.floor(Math.random() * 100))),
            backgroundColor: '#99e1d9ff',
            borderColor: '#199C8AFF',
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
                                    <div className="dashboard-item-info">
                                        <h1>Nome do Produto</h1>
                                        <h2>preço Médio:</h2>
                                        <h3>Ultima Venda</h3>
                                        <ClientCard client={{}}/>
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
                    <ProductCard product={{name: "nome do produto", price: 155}}/>
                </section>
            </div>
        </>
    )
}

export default DashBoard