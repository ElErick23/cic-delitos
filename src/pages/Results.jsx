import React from 'react';
// import Graph from "./../assets/graph.PNG";
import { Typography } from '@mui/material';
import AsociationMap from '../components/cluster/asociationMap/AsociationMap';

const Results = () => {

    // let chart = {
    //     title:"Clasificación de Delitos",
    //     info: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
    //     type: "doughnut",
    //     state: {
    //         labels: ["Delitos de Género", "Delitos Violentos", "Delitos Comunes"],
    //         datasets: [
    //             {
    //                 label: "Rainfall",
    //                 backgroundColor: ["#1C658C", "#398AB9", "#702963", ],
    //                 borderColor: "#FFFFFF",
    //                 borderWidth: 2,
    //                 data: [65, 59, 80]
    //             }
    //         ]
    //     }
    // }

    return (
        <div style={{ padding: "28px", }}>
            {/* <Grid container alignItems="center" >
                <Grid item xs={12} md={7} lg={8} style={{ textAlign: "center", display:"flex" }} justifyContent="center"  >
                    <div style={{ width: "450px"}}>
                        <Chart
                            type={chart.type}
                            data={chart.state}
                            options={{
                                plugins: {
                                    title: {
                                        display: true,
                                        text: chart.title,
                                        font:{
                                            size: 20,
                                            
                                        },
                                        color: "#2E2E2E"

                                    },
                                    legend:{
                                        labels:{
                                            padding:18
                                        },
                                        position:"bottom"
                                    },
                                    
                                },
                            }}
                        />
                    </div>
                </Grid>
                <Grid item xs={12} md={5} lg={4}>
                    <Container>
                        <Box style={{ backgroundColor: "#800040", color: "white", padding: "18px", borderTopLeftRadius: "8px", borderTopRightRadius: "8px" }} >
                            <Typography sx={{ fontSize: 18 }} color="white" >
                                Clasificación de los delitos
                            </Typography>
                        </Box>
                        <Box style={{ padding: "18px", border: "1px solid #800040" }}>
                            Cras mattis consectetur purus sit amet fermentum.
                            Cras justo odio, dapibus ac facilisis in, egestas eget quam.
                            Morbi leo risus, porta ac consectetur ac, vestibulum at eros.
                            Praesent commodo cursus magna, vel scelerisque nisl consectetur et.`,
                        </Box>
                    </Container>
                </Grid>
            </Grid> */}
            {/* <br /> */}
            <div >
                <Typography sx={{ fontSize: 24 }} color="black" >
                    Delitos de Género
                </Typography>
                <div style={{ borderBottom: "1.5px solid #800040", backgroundColor: "#800040" }} />
            </div>
            <br />

            <AsociationMap markerType="delitos_genero" type="Genero" />
            <br />
            <div >
                <Typography sx={{ fontSize: 24 }} color="black" >
                    Delitos Violentos
                </Typography>
                <div style={{ borderBottom: "1.5px solid #800040", backgroundColor: "#800040" }} />
            </div>
            <br />
            <AsociationMap markerType="delitos_violentos" type="Violentos" />
        </div>
    );
}

export default Results;
