import { useEffect, useRef } from "react";

interface CustomMarkerProps {
  position: { lat: number; lng: number };
  label: string;
  map: google.maps.Map | null;
  gmpDraggable?: boolean;
  onDragEnd?: (position: google.maps.LatLngLiteral) => void;
  onDblClick?: () => void;
}

const CustomMarker: React.FC<CustomMarkerProps> = ({
  position,
  label,
  map,
  gmpDraggable = false,
  onDragEnd,
  onDblClick,
}) => {
  const markerRef = useRef<google.maps.marker.AdvancedMarkerElement | null>(
    null
  );

  useEffect(() => {
    if (map && !markerRef.current) {
      const content = document.createElement("div");
      content.textContent = label;

      markerRef.current = new google.maps.marker.AdvancedMarkerElement({
        position,
        map,
        gmpDraggable,
        content,
      });

      markerRef.current.addListener("dragend", () => {
        if (onDragEnd && markerRef.current) {
            const position = (markerRef.current?.position as google.maps.LatLng).toJSON();
          if (position) onDragEnd(position);
        }
      });

      markerRef.current.addListener("dblclick", () => {
        if (onDblClick) onDblClick();
      });
    }

    if (markerRef.current) {
      markerRef.current.position = position;
    }
  }, [map, position, label, gmpDraggable, onDragEnd, onDblClick]);

  return null;
};

export default CustomMarker;
