import "mapbox-gl/dist/mapbox-gl.css";
import "react-map-gl-geocoder/dist/mapbox-gl-geocoder.css";
import { useEffect,useState, useRef, useCallback } from "react";
import MapGL, { NavigationControl } from "react-map-gl";
import Geocoder from "react-map-gl-geocoder";
import { useContext } from "react";
import { LoadingContext } from "../context/loadingContext";

const MAPBOX_TOKEN =
  "pk.eyJ1IjoicGluYWNrIiwiYSI6ImNsaTQ0cTRyYjA2OGkzcXBodHBwNXVtNjkifQ.QVI0-fNiKsyDp6XSp80alQ";

const Mapbox = () => {
  


  

  const { viewport, setViewport } = useContext(LoadingContext);
  // const [viewport, setViewport] = useState({
  //   latitude: 37.7577,
  //   longitude: -122.4376,
  //   zoom: 8
  // });
  const mapRef = useRef();
  const handleViewportChange = useCallback((newViewport) => {
    setViewport(newViewport);
    // console.log("NEW VIEWPORT", newViewport);
  }, []);

  // if you are happy with Geocoder default settings, you can just use handleViewportChange directly
  const handleGeocoderViewportChange = useCallback(
    (newViewport) => {
      console.log('HERE')
      const geocoderDefaultOverrides = { transitionDuration: 1000 };
      console.log("AFTER THE OVERIDES AND TRANSITION")
      return handleViewportChange({
        ...newViewport,
        ...geocoderDefaultOverrides,
      });
    },
    [handleViewportChange]
  );

  return (
    <div style={{ height: "100vh" }}>
      <MapGL
        ref={mapRef}
        {...viewport}
        width='100%'
        height='100%'
        onViewportChange={handleViewportChange}
        mapboxApiAccessToken={MAPBOX_TOKEN}
        // marker={true}
      >
     
        <Geocoder
          value={"value"}
          mapRef={mapRef}
          onViewportChange={handleGeocoderViewportChange}
          mapboxApiAccessToken={MAPBOX_TOKEN}
          position='top-right'
          marker={true}
        />
      </MapGL>
    </div>
  );
};

// import {useState} from 'react';
// import Map, {Marker} from 'react-map-gl';
// import mapboxgl from 'mapbox-gl';
// import 'mapbox-gl/dist/mapbox-gl.css';

// const MAPBOX_TOKEN = 'pk.eyJ1IjoicGluYWNrIiwiYSI6ImNsaTQ0cTRyYjA2OGkzcXBodHBwNXVtNjkifQ.QVI0-fNiKsyDp6XSp80alQ'; // Set your mapbox token here

// const Mapbox = () => {

//   const [viewState, setViewState] = useState({
//     latitude: 37.8,
//     longitude: -122.4,
//     zoom: 14
//   });

//   return (
//     <Map
//       mapLib={mapboxgl}
//       {...viewState}
//       onMove={evt => setViewState(evt.viewState)}
//       style={{width: 800, height: 600}}
//       mapStyle="mapbox://styles/mapbox/streets-v9"
//       mapboxAccessToken={MAPBOX_TOKEN}
//     >
//       <Marker longitude={-122.4} latitude={37.8} color="red" />
//     </Map>
//   )
// }

export default Mapbox;
