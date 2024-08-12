import React, { useEffect, useRef, useState } from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import styles from "./../../../styles/AsociationMap.module.css";
import { Box, CircularProgress, Container, Typography } from '@mui/material';

import { MAPBOX_KEY } from "./../../../config/constants";
import { iconMarker } from '../MarkerIcon';

import axios from "axios";

import Regla1 from "./../../../assets/Regla_1.PNG";
import Regla2 from "./../../../assets/Regla_2.PNG";
import Regla3 from "./../../../assets/Regla_3.PNG";
import Regla4 from "./../../../assets/Regla_4.PNG";
import Regla5 from "./../../../assets/Regla_5.PNG";
import Regla6 from "./../../../assets/Regla_6.PNG";
import Regla7 from "./../../../assets/Regla_7.PNG";
import Regla8 from "./../../../assets/Regla_8.PNG";
import Regla9 from "./../../../assets/Regla_9.PNG";
import Regla10 from "./../../../assets/Regla_10.PNG";
import Regla11 from "./../../../assets/Regla_11.PNG";
import Regla12 from "./../../../assets/Regla_12.PNG";
import Regla13 from "./../../../assets/Regla_13.PNG";
import Regla14 from "./../../../assets/Regla_14.PNG";

import * as L from 'leaflet';
import 'leaflet.markercluster';
require("leaflet.markercluster/dist/MarkerCluster.css");
require("leaflet.markercluster/dist/MarkerCluster.Default.css");

const mapboxUriTileLayer = "https://api.mapbox.com/styles/v1/medinavilla/cl6v5mk8w000t14mtzhgb5kbd/tiles/256/{z}/{x}/{y}@2x?access_token=" + MAPBOX_KEY

const AsociationMap = ({ markerType }) => {
    const mapRef = useRef(null);
    const [zoom] = useState(11);

    const [markers, setMarkers] = useState([]);
    const [markerSelected, setMarkerSelected] = useState();


    const [transitionOn, setTransitionOn] = useState(false);

    const [showAside] = useState(true);

    const [loading, setLoading] = useState(true);
    const [loadingData, setLoadingData] = useState(true);

    /* Obrenemos los delitos de genero de nuestra API*/
    useEffect(() => {
        async function fetchData() {
            axios.get("http://localhost:8081/" + markerType).then((response) => {
                if (response.data) {
                    setMarkers(response.data)
                    setLoadingData(false);
                }

            }).catch((error) => {
                alert(error.message);
                setLoadingData(false);
            })
        }
        fetchData();
    }, [markerType])


    /* Listeners que siempre estara pendiente del cualquier cambio del tamaño del mapa para hacer un RESIZE*/
    useEffect(() => {
        if (transitionOn) {
            const interval = setInterval(() => {
                try {
                    mapRef.current.invalidateSize();
                } catch {
                    clearInterval(interval);
                }
            }, 10);
        }
    }, [transitionOn])

    useEffect(() => {
        if (!loading) {
            setTimeout(() => {
                mapRef.current.invalidateSize();
            }, 200);
        }
    }, [loading])

    console.log(markerType)
    /* Convertimos los marcadores en un formato legible para el mapa*/
    const points = markers.map((data, id) => {
        if (!isNaN(data.longitud) && !isNaN(data.latitud)) {
            return ({
                type: "Feature",
                properties: { cluster: false, data: data },
                geometry: {
                    type: "Point",
                    coordinates: [
                        parseFloat(data.longitud),
                        parseFloat(data.latitud),
                    ],
                },
            })
        } else return {}
    });

    const renderCluster = (map) => {
        setTimeout(
            () => {
                const markers = L.markerClusterGroup({
                    maxClusterRadius: 100,
                    disableClusteringAtZoom: 18,
                    spiderfyOnMaxZoom: false,
                    showCoverageOnHover: false,
                    chunkedLoading: true
                })

                points.map((point) => {
                    let marker = L.marker([point.geometry.coordinates[1], point.geometry.coordinates[0]], { icon: iconMarker })
                    marker.data = point.properties.data
                    marker.addTo(markers);
                    return true;
                })


                markers.on('click', function (marker) {
                    showContentMarkerAside(marker);
                });

                markers.addTo(map.target);

                mapRef.current._layersMaxZoom = 18;
                setLoading(false);
            }, 500
        );
    }

    const showContentMarkerAside = async (marker) => {
        marker.sourceTarget.latlng = marker.latlng;
        if (showAside) { // Si ya estan mostrados los delitos, no hacer ninguna transicion
            setMarkerSelected(marker.sourceTarget.data);
            mapRef.current.flyTo(marker.latlng, 18)
        } else {
            // setShowAside(true);
            mapRef.current.flyTo(marker.latlng, 18)
            setMarkerSelected(marker.sourceTarget.data);
            setTransitionOn(true);
        }
    }

    return (
        <div>
            <div className={loading ? [styles.hidden] : styles.wrapper}>
                <div className={styles.mapContainer}>
                    {!loadingData ? <MapContainer
                        preferCanvas={true}
                        center={[19.432608, -99.133209]}
                        zoom={zoom}
                        ref={mapRef}
                        style={{ height: '100%', width: "100%" }}
                        whenReady={(map) => { renderCluster(map) }}
                    >
                        <TileLayer
                            url={mapboxUriTileLayer}
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        />
                    </MapContainer> : ""}
                </div>

                {
                    <div style={{ marginLeft: "24px" }}>
                        <div className={styles.aside}>
                            <Container >
                                <Box style={{ backgroundColor: "#0E8DD4", color: "white", padding: "18px", borderTopLeftRadius: "8px", borderTopRightRadius: "8px" }} >
                                    <Typography sx={{ fontSize: 18 }} color="white" >
                                        Reglas de Asociación  <br /> <strong>{markerSelected ? '"' + markerSelected.delito + '"' : ""}</strong>
                                    </Typography>
                                </Box>
                                <Box style={{ border: "1px solid #E7E7E7" }}>
                                    {markerType === "delitos_genero" ? <div className={styles.containerScroll}>
                                        <img src={Regla1} className={styles.regla} alt="regla1" />
                                        <img src={Regla2} className={styles.regla} alt="regla2" />
                                        <img src={Regla3} className={styles.regla} alt="regla3" />
                                        <img src={Regla4} className={styles.regla} alt="regla4" />
                                        <img src={Regla5} className={styles.regla} alt="regla5" />
                                        <img src={Regla6} className={styles.regla} alt="regla6" />
                                        <img src={Regla7} className={styles.regla} alt="regla7" />
                                        <img src={Regla8} className={styles.regla} alt="regla8" />
                                        <img src={Regla9} className={styles.regla} alt="regla9" />
                                        <img src={Regla10} className={styles.regla} alt="regla10" />
                                        <img src={Regla11} className={styles.regla} alt="regla11" />
                                        <img src={Regla12} className={styles.regla} alt="regla12" />
                                        <img src={Regla13} className={styles.regla} alt="regla13" />
                                    </div> : <div>
                                        <img src={Regla14} className={styles.regla} alt="regla14" />
                                    </div>
                                    }
                                </Box>
                            </Container>
                        </div>
                    </div>
                }
            </div >
            {
                (loading) && <div className={styles.circularProgress}>
                    <CircularProgress color="error" />
                </div>
            }
        </div>
    );
}

export default AsociationMap;
