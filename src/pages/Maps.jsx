import React from 'react';
import Anexo1 from "./../assets/Anexo1.1.webp"
import Anexo2 from "./../assets/Anexo2.1.webp"
import Anexo3 from "./../assets/Anexo3.1.webp"
import Anexo4 from "./../assets/Anexo4.1.webp"
import Anexo5 from "./../assets/Anexo5.1.webp"
import Anexo6 from "./../assets/Anexo6.1.webp"
import Anexo7 from "./../assets/Anexo7.1.webp"
import Anexo8 from "./../assets/Anexo8.1.webp"


// import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
// import { Carousel } from 'react-responsive-carousel';
import Carousel from 'react-material-ui-carousel'
import { Paper } from '@mui/material'
import styles from "./../styles/Maps.module.css";

const Maps = () => {
    return (
        <div className={styles.container}>
            <Carousel navButtonsAlwaysVisible fullHeightHover={false} height={"80vh"} autoPlay={false}>
                <Paper >
                    <img style={{ width: "100%" }} src={Anexo1} alt="anexo1"/>
                </Paper>
                <Paper >
                    <img style={{ width: "100%" }} src={Anexo2}  alt="anexo2"/>
                </Paper>
                <Paper >
                    <img style={{ width: "100%" }} src={Anexo3}  alt="anexo3"/>
                </Paper>
                <Paper >
                    <img style={{ width: "100%" }} src={Anexo4}  alt="anexo4"/>
                </Paper>
                <Paper >
                    <img style={{ width: "100%" }} src={Anexo5}  alt="anexo5"/>
                </Paper>
                <Paper >
                    <img style={{ width: "100%" }} src={Anexo6}  alt="anexo6"/>
                </Paper>
                <Paper >
                    <img style={{ width: "100%" }} src={Anexo7}  alt="anexo7"/>
                </Paper>
                <Paper >
                    <img style={{ width: "100%" }} src={Anexo8}  alt="anexo8"/>
                </Paper>
            </Carousel>
        </div>
    );
}

export default Maps;
