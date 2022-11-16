import { useMap } from "react-leaflet";
import Locate from "leaflet.locatecontrol";
import "leaflet.locatecontrol/dist/L.Control.Locate.min.css";
import * as L from "leaflet";
import { useEffect } from "react";

const UserLocate = () => {
  const map = useMap();

  useEffect(() => {
    var lc = L.control
      .locate({
        position: "topleft",
        flyTo: true,
        strings: {
          title: "Show me where I am, yo!",
        },
      })
      .addTo(map);
    return () => {
      lc.remove();
    };
  }, []);

  return null;
};

export default UserLocate;
