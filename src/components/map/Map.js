import './Map.css'
import { Wrapper, Status } from "@googlemaps/react-wrapper";
import React, { useRef, useState, useEffect, useContext } from 'react';
import { AppContext } from '../../contexts/AppContext';

const PlacesMap = ({ center, zoom, children }) => {
    const mapRef = useRef(null)
    const [map, setMap] = useState()
    useEffect(() => {
        setMap(new window.google.maps.Map(mapRef.current, {
            center,
            zoom,
        }));
    }, []);
    return <>
        <div ref={mapRef} id='map' />
        {React.Children.map(children, (child) => {
            if (React.isValidElement(child)) {
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
    const appCtx = useContext(AppContext)
    console.log(appCtx)
    return <Wrapper apiKey='AIzaSyDydUU6hIApyvbtL91GpVB53_C91O-PFaU'>
        <PlacesMap center={{ lat: 40.9, lng: 28.5 }} zoom={9}>
            {
                appCtx.places.map((place, i) => {
                    return <Marker position={{ lat: place.latitude, lng: place.longitude }} key={i} />
                })
            }
        </PlacesMap>
    </Wrapper>
}

export default Map