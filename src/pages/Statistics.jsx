import React, { useState, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import ChartC from '../components/Chart';
import axios from 'axios';

const Statistics = () => {
    const [delitosGDelegacion, setDelitosGDelegacion] = useState();
    const [delitosVDelegacion, setDelitosVDelegacion] = useState();
    const [delitosHour, setDelitosHour] = useState();
    const [delitosEdad, setDelitosEdad] = useState();

    useEffect(() => {
        async function fetchData() {
            console.log("Iniciando petición: delitos_genero/graph1");
            try {
                const response = await axios.get("http://localhost:8081/delitos_genero/graph1");
                console.log("Respuesta recibida: delitos_genero/graph1", response.data);
                
                // Sort data in descending order
                const sortedData = response.data.sort((a, b) => parseInt(b.count) - parseInt(a.count));
                
                let labels = [];
                let data = [];
                sortedData.forEach((delito) => {
                    labels.push(delito.AlcaldiaHechos);
                    data.push(parseInt(delito.count));
                });
    
                // Calculate statistics
                const maxValue = Math.max(...data);
                const minValue = Math.min(...data);
                const maxDelegacion = labels[data.indexOf(maxValue)];
                const minDelegacion = labels[data.indexOf(minValue)];
                const average = data.reduce((a, b) => a + b, 0) / data.length;
    
                const statisticsText = `Máximo: ${maxValue} (${maxDelegacion}), Mínimo: ${minValue} (${minDelegacion}), Promedio: ${average.toFixed(2)}`;
    
                setDelitosGDelegacion({
                    title: "Delitos de género por delegación",
                    info: "Número de delitos de género por delegación en la Ciudad de México",
                    type: "bar",
                    state: {
                        labels: labels,
                        datasets: [
                            {
                                label: "Delitos cometidos",
                                backgroundColor: "#800040",
                                borderColor: "#671D1D",
                                borderWidth: 2,
                                data: data
                            }
                        ],
                    },
                    statisticsText: statisticsText
                });
                console.log("Datos procesados y estado actualizado: delitos_genero/graph1");
            } catch (error) {
                console.error("Error en petición delitos_genero/graph1:", error);
            }
        }
        fetchData();
    }, []);

    useEffect(() => {
        async function fetchData() {
            console.log("Iniciando petición: delitos_genero/graph2");
            try {
                const response = await axios.get("http://localhost:8081/delitos_genero/graph2");
                console.log("Respuesta recibida: delitos_genero/graph2", response.data);
                
                // Group data by hour ranges
                const hourRanges = {
                    "00:00-03:59": 0,
                    "04:00-07:59": 0,
                    "08:00-11:59": 0,
                    "12:00-15:59": 0,
                    "16:00-19:59": 0,
                    "20:00-23:59": 0
                };
    
                response.data.forEach(delito => {
                    const hour = parseInt(delito.HoraHecho.split(':')[0]);
                    const count = parseInt(delito.count);
    
                    if (hour >= 0 && hour < 4) hourRanges["00:00-03:59"] += count;
                    else if (hour >= 4 && hour < 8) hourRanges["04:00-07:59"] += count;
                    else if (hour >= 8 && hour < 12) hourRanges["08:00-11:59"] += count;
                    else if (hour >= 12 && hour < 16) hourRanges["12:00-15:59"] += count;
                    else if (hour >= 16 && hour < 20) hourRanges["16:00-19:59"] += count;
                    else hourRanges["20:00-23:59"] += count;
                });
    
                const labels = Object.keys(hourRanges);
                const data = Object.values(hourRanges);
    
                setDelitosHour({
                    title: "Delitos de género por rango de hora",
                    info: "Delitos de género cometidos por rango de hora en la Ciudad de México",
                    type: "doughnut",
                    state: {
                        labels: labels,
                        datasets: [
                            {
                                label: "Delitos cometidos",
                                borderWidth: 4,
                                data: data,
                                backgroundColor: [
                                    'rgba(255, 99, 132, 1)',
                                    'rgba(255, 159, 64, 1)',
                                    'rgba(255, 205, 86, 1)',
                                    'rgba(75, 192, 192, 1)',
                                    'rgba(54, 162, 235, 1)',
                                    'rgba(153, 102, 255, 1)'
                                ],
                            }
                        ],
                    },
                });
                console.log("Datos procesados y estado actualizado: delitos_genero/graph2");
            } catch (error) {
                console.error("Error en petición delitos_genero/graph2:", error);
            }
        }
        fetchData();
    }, []);

    useEffect(() => {
        async function fetchData() {
            console.log("Iniciando petición: delitos_genero/graph3");
            axios.get("http://localhost:8081/delitos_genero/graph3").then((response) => {
                console.log("Respuesta recibida: delitos_genero/graph3", response.data);
                let labels = [];
                let data = [];
                response.data.map((delito) => {
                    labels.push(delito.age_group);
                    data.push(parseInt(delito.count));
                    return true;
                })
                setDelitosEdad({
                    title: "Delitos de género por edad",
                    info: "Delitos de género cometidos por rango de edad en años en la Ciudad de México ",
                    type: "doughnut",
                    state: {
                        labels: labels,
                        datasets: [
                            {
                                label: "Delitos cometidos",
                                borderWidth: 4,
                                data: data,
                                backgroundColor: [
                                    'rgba(225, 99, 132, 1)',
                                    'rgba(215, 159, 64, 1)',
                                    'rgba(185, 205, 86, 1)',
                                    'rgba(155, 192, 192, 1)',
                                    'rgba(125, 162, 235, 1)',
                                    'rgba(103, 102, 255, 1)',
                                    'rgba(21, 203, 207, 1)',
                                    'rgba(255, 99, 132, 1)',
                                    'rgba(255, 159, 64, 1)',
                                    'rgba(255, 205, 86, 1)',
                                    'rgba(75, 192, 192, 1)',
                                    'rgba(54, 162, 235, 1)',
                                    'rgba(153, 102, 255, 1)',
                                    'rgba(201, 203, 207, 1)',
                                ],
                            }
                        ],
                    },
                });
                console.log("Datos procesados y estado actualizado: delitos_genero/graph3");
            }).catch((error) => {
                console.error("Error en petición delitos_genero/graph3:", error);
            })
        }
        fetchData();
    }, [])

    useEffect(() => {
        async function fetchData() {
            console.log("Iniciando petición: delitos_genero/graph4");
            try {
                const response = await axios.get("http://localhost:8081/delitos_genero/graph4");
                console.log("Respuesta recibida: delitos_genero/graph4", response.data);
                
                // Sort data in descending order
                const sortedData = response.data.sort((a, b) => parseInt(b.count) - parseInt(a.count));
                
                let labels = [];
                let data = [];
                sortedData.forEach((delito) => {
                    labels.push(delito.AlcaldiaHechos);
                    data.push(parseInt(delito.count));
                });
    
                // Calculate statistics
                const maxValue = Math.max(...data);
                const minValue = Math.min(...data);
                const maxDelegacion = labels[data.indexOf(maxValue)];
                const minDelegacion = labels[data.indexOf(minValue)];
                const average = data.reduce((a, b) => a + b, 0) / data.length;
    
                const statisticsText = `Máximo: ${maxValue} (${maxDelegacion}), Mínimo: ${minValue} (${minDelegacion}), Promedio: ${average.toFixed(2)}`;
    
                setDelitosVDelegacion({
                    title: "Delitos violentos por delegación",
                    info: "Número de delitos violentos por delegación en la Ciudad de México",
                    type: "bar",
                    state: {
                        labels: labels,
                        datasets: [
                            {
                                label: "Delitos cometidos",
                                backgroundColor: "#FFC000",
                                borderColor: "#FFD700",
                                borderWidth: 2,
                                data: data
                            }
                        ],
                    },
                    statisticsText: statisticsText
                });
                console.log("Datos procesados y estado actualizado: delitos_genero/graph4");
            } catch (error) {
                console.error("Error en petición delitos_genero/graph4:", error);
            }
        }
        fetchData();
    }, []);

    return (
        <Container sx={{ m: "2rem" }}>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={12} md={12}>
                    {delitosGDelegacion && (
                        <>
                            <ChartC 
                                title={delitosGDelegacion.title} 
                                info={delitosGDelegacion.info} 
                                state={delitosGDelegacion.state} 
                                type={delitosGDelegacion.type}
                            />
                            <p>{delitosGDelegacion.statisticsText}</p>
                        </>
                    )}
                </Grid>
                <Grid item xs={12} sm={12} md={12}>
                    {delitosVDelegacion && (
                        <>
                            <ChartC 
                                title={delitosVDelegacion.title} 
                                info={delitosVDelegacion.info} 
                                state={delitosVDelegacion.state} 
                                type={delitosVDelegacion.type}
                            />
                            <p>{delitosVDelegacion.statisticsText}</p>
                        </>
                    )}
                </Grid>
                <Grid item xs={12} sm={6} md={6}>
                    {delitosHour && <ChartC title={delitosHour.title} info={delitosHour.info} state={delitosHour.state} type={delitosHour.type}></ChartC>}
                </Grid>
                <Grid item xs={12} sm={6} md={6}>
                    {delitosEdad && <ChartC title={delitosEdad.title} info={delitosEdad.info} state={delitosEdad.state} type={delitosEdad.type}></ChartC>}
                </Grid>
            </Grid>
        </Container>
    );
}

export default Statistics;