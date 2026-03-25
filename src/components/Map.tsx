import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for default marker icon issues in React-Leaflet
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

const DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

L.Marker.prototype.options.icon = DefaultIcon;

const Map = () => {
  // Coordinates for Market Street area in Emalahleni
  const position: [number, number] = [-25.8730, 29.2250];

  return (
    <div className="w-full h-[400px] rounded-2xl overflow-hidden border border-[var(--border-color)] shadow-2xl relative z-10">
      <MapContainer 
        center={position} 
        zoom={15} 
        scrollWheelZoom={false} 
        className="w-full h-full"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
        />
        <Marker position={position}>
          <Popup>
            <div className="font-rajdhani text-center uppercase">
              <strong className="text-indigo">ELOMK Projects HQ</strong><br />
              84310 Market Street<br />
              Emalahleni 1035
            </div>
          </Popup>
        </Marker>
      </MapContainer>
      
      {/* Overlay to match site theme */}
      <div className="absolute inset-0 pointer-events-none border-4 border-[var(--bg-secondary)]/20 rounded-2xl z-[1000]" />
    </div>
  );
};

export default Map;
