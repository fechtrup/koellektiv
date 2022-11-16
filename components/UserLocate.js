import { useMap } from "react-leaflet";
import Locate from "leaflet.locatecontrol";
import "leaflet.locatecontrol/dist/L.Control.Locate.min.css";
import * as L from "leaflet";



const UserLocate = () => {
  const map = useMap();

  var lc = L.control
    .locate({
      position: "topleft",
      flyTo: true,
      strings: {
        title: "Show me where I am, yo!",
      },
    })
    .addTo(map);
  return null;
};

export default UserLocate;