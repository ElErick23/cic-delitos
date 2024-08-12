import { Icon, Point } from 'leaflet';

const iconMarker= new Icon({
    iconUrl: require("./../../assets/marker-guinda.png"),
    iconRetinaUrl: require("./../../assets/marker-guinda.png"),
    iconAnchor: [10, 45], // point of the icon which will correspond to marker's location
    iconSize: new Point(17, 30),
});

export { iconMarker };