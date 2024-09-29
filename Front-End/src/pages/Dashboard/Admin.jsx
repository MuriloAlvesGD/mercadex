import "./Admin.css";
import Carousel from "../../components/Carousel/Carousel.jsx";
import DefaultImageIcon from "../../assets/defaultImageIcon.png";
import {Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend} from 'chart.js';
import {Bar} from 'react-chartjs-2';
import ClientCard from "../../components/ClientCard/ClientCard.jsx";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const options = {
    responsive: true,
    layout: {
        padding: 20,
    },
    plugins: {
        legend: {display: false},
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
    datasets: [{
        data: labels.map(() => Math.floor(Math.random() * 100)),
        backgroundColor: '#99e1d9ff',
        borderColor: '#199C8AFF',
        borderWidth: 1
    }],
};

function Admin() {
    return (
        <div className="content-container">
            <Carousel>
                <div className="dashboard-container">
                    <div className="dashboard-item">
                        <main className="left-section">
                            <h1 className="dashboard-title">Produto Mais Vendido</h1>
                            <Bar options={options} data={data}/>
                        </main>
                        <div className="right-section">
                            <img src={DefaultImageIcon} alt="best seller product" className="best-seller-product"/>
                            <div className="dashboard-item-info">
                                <h1>Nome do Produto</h1>
                                <h2>Preço Médio:</h2>
                                <h3>Última Venda</h3>
                                <ClientCard client={{}}/>
                            </div>
                        </div>
                    </div>
                </div>
            </Carousel>
            <h1 className="section-title">Best Clients</h1>
            <Carousel>
                {Array.from({length: 5}, (_, index) => (

                    <img key={index} src={DefaultImageIcon} className="enterpriseImage"
                         alt={`Enterprise ${index + 1}`}/>
                ))}
            </Carousel>
        </div>
    );
}

export default Admin;
