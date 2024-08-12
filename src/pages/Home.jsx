import React, { useEffect, useRef, useState } from 'react';

import { MapContainer, TileLayer } from 'react-leaflet';
import { MAPBOX_KEY } from "./../config/constants";

import styles from "./../styles/Home.module.css";
import { Alert, CircularProgress } from '@mui/material';
// import dataCSV from "./../data/Delitos_Genero_Preproceso.json";

import { iconMarker } from '../components/cluster/MarkerIcon';

import * as L from 'leaflet';
import 'leaflet.markercluster';
import axios from "axios";

require("leaflet.markercluster/dist/MarkerCluster.css");
require("leaflet.markercluster/dist/MarkerCluster.Default.css");

const mapboxUriTileLayer = "https://api.mapbox.com/styles/v1/medinavilla/cl6v5mk8w000t14mtzhgb5kbd/tiles/256/{z}/{x}/{y}@2x?access_token=" + MAPBOX_KEY;

const Home = () => {
    const mapRef = useRef(null);
    const [zoom] = useState(11);

    const [showAside] = useState(false);
    const [markers, setMarkers] = useState([]);
    const [markerSelected, setMarkerSelected] = useState();
    const [transitionOn, setTransitionOn] = useState(false);

    const [loading, setLoading] = useState(true);
    const [loadingData, setLoadingData] = useState(true);

    /* Obrenemos los delitos de genero de nuestra API*/
    useEffect(() => {
        async function fetchData() {
            axios.get("http://localhost:8081/delitos_genero").then((response) => {
                if (response.data) {
                    setMarkers(response.data)
                    setLoadingData(false)
                }

            }).catch((error) => {
                alert(error.message);
                setLoadingData(false)
            })
        }
        fetchData();
    }, [])


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
        if (mapRef.current) {
            setTimeout(() => {
                mapRef.current.invalidateSize();
            }, 200);
        }
    }, [mapRef])

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
        <div className={styles.wrapper}>
            <div className={styles.mapContainer}>
                {!loadingData? <MapContainer
                    preferCanvas={true}
                    id="mymap"
                    center={[19.432608, -99.133209]}
                    zoom={zoom}
                    ref={mapRef}
                    style={{ height: '100%', width: "100%" }}
                    whenReady={(map) => {
                        renderCluster(map);
                    }}
                >
                    <TileLayer
                        url={mapboxUriTileLayer}
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    />
                </MapContainer> : ""}
                {
                    (loading) && <div className={styles.circularProgress}>
                        <CircularProgress color="error" />
                    </div>
                }
            </div>
            <div className={[showAside ? styles.animated : "", styles.aside]}
                onTransitionEnd={() => {
                    setTransitionOn(false);
                    // mapRef.current.flyTo(markerSelected.latlng, 18)
                }
                }>
                {
                    markerSelected && <div>
                        <div className={styles.container}>
                            <Alert severity="error" icon={false}>
                                <h3>Delito: <strong>{markerSelected.delito}</strong> </h3>
                                Edad: <strong>{markerSelected.edad}</strong><br /><br />
                                Hora del delito: <strong>{markerSelected.horaHecho}</strong><br /><br />
                                Fecha del delito: <strong>{markerSelected.fechaHecho} </strong><br />
                            </Alert>
                        </div>
                    </div>
                }
            </div>
        </div >
    )
}

export default Home;
