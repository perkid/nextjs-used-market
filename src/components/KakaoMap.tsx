import { Map, MapMarker } from 'react-kakao-maps-sdk';

interface KakaoMapProps {
  setCustomValue?: (id: string, value: number) => void;
  latitude: number;
  longitude: number;
  detailPage?: boolean;
}
const KakaoMap = ({ setCustomValue, latitude, longitude, detailPage = false }: KakaoMapProps) => {
  const handleClick = (mouseEvent: kakao.maps.event.MouseEvent) => {
    if (detailPage) return;
    setCustomValue!('latitude', mouseEvent.latLng.getLat());
    setCustomValue!('longitude', mouseEvent.latLng.getLng());
  }
  return (
    <Map
      center={{ lat: latitude, lng: longitude }}
      style={{ width: "100%", height: "360px" }}
      onClick={(_, mouseEvent) => handleClick(mouseEvent)}
    >
      <MapMarker position={{ lat: latitude, lng: longitude }} />
    </Map>
  )
}

export default KakaoMap