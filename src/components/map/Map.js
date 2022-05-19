import './Map.css'
import { Wrapper, Status } from "@googlemaps/react-wrapper";
import React, { useRef, useState, useEffect } from 'react';

const PlacesMap = ({ center, zoom, children }) => {
    const mapRef = useRef(null)
    const [map, setMap] = useState()
    useEffect(() => {
        setMap(new window.google.maps.Map(mapRef.current, {
            center,
            zoom,
        }));
    }, []);
    // return (<div ref={mapRef} id="map" />)
    return <>
        <div ref={mapRef} id='map' />
        {React.Children.map(children, (child) => {
            if (React.isValidElement(child)) {
                // set the map prop on the child component
                return React.cloneElement(child, { map });
            }
        })}
    </>
}

const Marker = (options) => {
    const [marker, setMarker] = useState();

    useEffect(() => {
        if (!marker) {
            setMarker(new window.google.maps.Marker());
        }

        // remove marker from map on unmount
        return () => {
            if (marker) {
                marker.setMap(null);
            }
        };
    }, [marker]);
    useEffect(() => {
        if (marker) {
            marker.setOptions(options);
        }
    }, [marker, options]);
    return null;
};

const Map = () => {
    return <Wrapper apiKey='AIzaSyDydUU6hIApyvbtL91GpVB53_C91O-PFaU'>
        <PlacesMap center={{ lat: 40.9, lng: 28.5 }} zoom={9}>
            <Marker position={{ lat: 40.9, lng: 28.5 }} title="Hello World!" />
        </PlacesMap>
    </Wrapper>
}

export default Map