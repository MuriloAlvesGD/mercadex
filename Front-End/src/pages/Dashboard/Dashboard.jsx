import "./Dashboard.css";
import Carousel from "../../components/Carousel/Carousel.jsx";
import DefaultImageIcon from "../../assets/defaultImageIcon.png";
import {Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend} from 'chart.js';
import {Bar} from 'react-chartjs-2';
import ClientCard from "../../components/ClientCard/ClientCard.jsx";
import axios from "axios";
import {useEffect, useState} from "react";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);


function Dashboard() {
    const [dashs, setDashs] = useState({})

    const getAllProducts = async () => {
        try {
            const response = await axios.get('http://localhost:3333/products/group',
                {withCredentials: true});
            console.log(response.data[0]);
            setDashs(response.data[0])
        } catch (e) {
            console.error(e);
        }
    };

    const setOption = (title) => {
        return {
            responsive: true,
            layout: {
                padding: 20,
            },
            plugins: {
                legend: {display: false},
                title: {
                    display: true,
                    position: 'top',
                    text: title,
                    color: '#df5201',
                    font: {
                        size: 20,
                        family: 'Inter, system-ui, Avenir, Helvetica, Arial, sans-serif',
                    }
                }
            }
        };
    }

    const getRandomColor = () => {
        const randomColor = Math.floor(Math.random()*16777215).toString(16);
        return `#${randomColor}`;
    }

    const setDataDash = (group) => {
        const labels = group ? group.map(item => item._id) : ["default"];
        const backgroundColors = group ? group.map(() => getRandomColor()) : ['#99e1d9ff'];

        return {
            labels,
            datasets: [{
                data: group ? group.map(item => item.totalQuantity) : [0],
                backgroundColor: backgroundColors,
                borderColor: '#ffffff',
                borderWidth: 1
            }],
        };
    }

    const sumAllStock = (group) => {
        let sum = 0
         group ? group.map(item => sum += item.totalQuantity) : sum += 0;
        return sum;
    }

    useEffect(() => {
        getAllProducts();
    }, [])

    return (
        <div className="content-container">
            <Carousel>
                {dashs &&
                    <div className="dashboard-container">
                        <div className="dashboard-item">
                            <main className="multcharts">
                                <h1 className="dashboard-title">Quantidades</h1>
                                <div id="dashs">
                                {dashs.byBrand && (
                                    <div className="dash">
                                        <Bar options={setOption("qtd. por Marca")} data={setDataDash(dashs.byBrand)} />
                                    </div>
                                )}
                                {dashs.byName && (
                                    <div className="dash">
                                        <Bar options={setOption("qtd. por Nome")} data={setDataDash(dashs.byName)} />
                                    </div>
                                )}
                                {dashs.byCategory && (
                                    <div className="dash">
                                        <Bar options={setOption("qtd. por Categoria")} data={setDataDash(dashs.byCategory)} />
                                    </div>
                                )}
                                    <div className="dash">
                                        <div className="info-card">
                                            <h1>{sumAllStock(dashs.byBrand)}</h1>
                                            <div>
                                                <h3>TOTAL DE PRODUTOS</h3>
                                                <h5>{`EM: ${new Date().toLocaleString()}`}</h5>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </main>
                        </div>
                    </div>
                }
                <div className="dashboard-container">
                    <div className="dashboard-item">
                        <main className="left-section">
                            <h1 className="dashboard-title">Produto Mais Vendido</h1>
                            <Bar options={setOption()} data={setDataDash()}/>
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
            {/*<h1 className="section-title">Best Clients</h1>*/}
            {/*<Carousel>*/}
            {/*    {Array.from({length: 5}, (_, index) => (*/}

            {/*        <img key={index} src={DefaultImageIcon} className="enterpriseImage"*/}
            {/*             alt={`Enterprise ${index + 1}`}/>*/}
            {/*    ))}*/}
            {/*</Carousel>*/}
        </div>
    );
}

export default Dashboard;
