import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { useEffect, useState } from "react";
import osm from "../utils/osm-providers";
import L from "leaflet";
import Pin from "../public/images/pin.png";
import PendingPin from "../public/images/pendingPin.png";
import Form from "../components/Form";
import { useDisclosure } from "@chakra-ui/react";
import { useSupabaseClient } from "@supabase/auth-helpers-react";

const markerIcon = new L.Icon({
  iconUrl: Pin.src,
  iconSize: [35, 45],
  iconAnchor: [17, 46],
  popupAnchor: [0, -46],
});

const pendingIcon = new L.Icon({
  iconUrl: PendingPin.src,
  iconSize: [35, 45],
  iconAnchor: [17, 46],
  popupAnchor: [0, -46],
});

export default function Map() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [center] = useState({ lat: 50.937531, lng: 6.9602786 });
  const [pins, setPins] = useState([]);
  const ZOOM_LEVEL = 14;
  const supabaseClient = useSupabaseClient();

  useEffect(() => {
    supabaseClient
      .from("pins")
      .select("*")
      .then((result) => {
        if (result.data) {
          setPins(result.data);
        }
      });
  }, [supabaseClient]);

  return (
    <>
      <Form
        isOpen={isOpen}
        onOpen={onOpen}
        onCancel={() => {
          setPins((oldPins) => {
            return oldPins.filter((pin) => {
              return !pin.isPending;
            });
          });
          onClose();
        }}
        onSave={() => {
          setPins((oldPins) => {
            return oldPins.map((pin) => {
              pin.isPending = false;
              return pin;
            });
          });
          onClose();
        }}
      />

      <MapContainer
        center={center}
        zoom={ZOOM_LEVEL}
        ref={(ref) => {
          if (!ref) {
            return;
          }
          ref.on("click", (event) => {
            const lat = event.latlng.lat;
            const lng = event.latlng.lng;
            const pin = {
              name: "Trinkgenossen",
              plakate: true,
              flyer: true,
              lat,
              lng,
              isPending: true,
            };
            onOpen();
            setPins((oldPins) => {
              return [...oldPins, pin];
            });
          });
        }}
      >
        <TileLayer
          url={osm.maptiler.url}
          attribution={osm.maptiler.attribution}
          on
        />

        {pins.map((pin, idx) => (
          <Marker
            position={[pin.lat, pin.lng]}
            icon={pin.isPending ? pendingIcon : markerIcon}
            key={idx}
          >
            <Popup>
              <b>{pin.name}</b>
              <br />
              <br />
              <b>Plakate: {String(pin.plakate)}</b>
              <br />
              <b>Flyer: {String(pin.flyer)}</b>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </>
  );
}
