import React, { useEffect, useRef, useState } from 'react';
import { MapContainer, TileLayer, GeoJSON } from 'react-leaflet';
import styles from "./../styles/Home.module.css";
import { Alert, CircularProgress } from '@mui/material';
import { iconMarker } from '../components/cluster/MarkerIcon';
import * as L from 'leaflet';
import 'leaflet.markercluster';
import axios from "axios";
import cdmxBoundaryData from './../assets/cdmx.json';

require("leaflet.markercluster/dist/MarkerCluster.css");
require("leaflet.markercluster/dist/MarkerCluster.Default.css");

const Home = () => {
    const mapRef = useRef(null);
    const [zoom] = useState(10);
    const [showAside, setShowAside] = useState(false);
    const [markers, setMarkers] = useState([]);
    const [markerSelected, setMarkerSelected] = useState();
    const [transitionOn, setTransitionOn] = useState(false);
    const [loading, setLoading] = useState(true);
    const [loadingData, setLoadingData] = useState(true);

    useEffect(() => {
        async function fetchData() {
            try {
                const crimesResponse = await axios.get("http://localhost:8081/delitos_genero");
                if (crimesResponse.data) {
                    setMarkers(crimesResponse.data);
                }
                setLoadingData(false);
            } catch (error) {
                alert(error.message);
                setLoadingData(false);
            }
        }
        fetchData();
    }, []);

    const boundaryStyle = {
        fillColor: "#FFA500",
        fillOpacity: 0.1,
        color: "#FF8C00",
        weight: 2,
    };

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
    }, [transitionOn]);

    useEffect(() => {
        if (mapRef.current) {
            setTimeout(() => {
                mapRef.current.invalidateSize();
            }, 200);
        }
    }, [mapRef]);

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
        setTimeout(() => {
            const markers = L.markerClusterGroup({
                maxClusterRadius: 80,
                disableClusteringAtZoom: 16,
                spiderfyOnMaxZoom: true,
                showCoverageOnHover: false,
                chunkedLoading: true
            });

            points.forEach((point) => {
                if (point.geometry) {
                    let marker = L.marker([point.geometry.coordinates[1], point.geometry.coordinates[0]], { icon: iconMarker })
                    marker.data = point.properties.data
                    marker.addTo(markers);
                }
            });

            markers.on('click', function (marker) {
                showContentMarkerAside(marker);
            });

            markers.addTo(map.target);

            mapRef.current._layersMaxZoom = 18;
            setLoading(false);
        }, 500);
    }

    const showContentMarkerAside = async (marker) => {
        marker.sourceTarget.latlng = marker.latlng;
        setMarkerSelected(marker.sourceTarget.data);
        mapRef.current.flyTo(marker.latlng, 16)
        setShowAside(true);
        setTransitionOn(true);
    }

    return (
        <div className={styles.wrapper}>
            <div className={styles.mapContainer}>
                {!loadingData ? (
                    <MapContainer
                        preferCanvas={true}
                        id="mymap"
                        center={[19.3619, -99.1286]}
                        zoom={zoom}
                        ref={mapRef}
                        style={{ height: '100%', width: "100%" }}
                        whenReady={(map) => {
                            renderCluster(map);
                        }}
                    >
                        <TileLayer
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        />
                        <GeoJSON 
                            data={cdmxBoundaryData} 
                            style={boundaryStyle}
                        />
                    </MapContainer>
                ) : (
                    <CircularProgress />
                )}
            </div>
            <div className={[showAside ? styles.animated : "", styles.aside]}
                onTransitionEnd={() => {
                    setTransitionOn(false);
                }}
            >
                {markerSelected && (
                    <div>
                        <div className={styles.container}>
                            <Alert severity="error" icon={false}>
                                <h3>Delito: <strong>{markerSelected.Delito}</strong> </h3>
                                Edad: <strong>{markerSelected.Edad}</strong><br /><br />
                                Hora del delito: <strong>{markerSelected.HoraHecho}</strong><br /><br />
                                Fecha del delito: <strong>{markerSelected.FechaHecho} </strong><br />
                            </Alert>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Home;