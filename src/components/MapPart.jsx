import ReactMapGl from "react-map-gl"
import { useState, useEffect, useMemo } from 'react';
import { Source, Layer, Marker } from 'react-map-gl';

import "mapbox-gl/dist/mapbox-gl.css"
import { Container } from "react-bootstrap";

import Pin from './Pin';

import CITIES from './cities.json';
import romaEagle from '../imgPub/romaEagle.jpg';



function MapPart() {
    const [popupInfo, setPopupInfo] = useState(null);

    const [viewport, setViewport] = useState(
        {
            latitude: 41.9027835,
            longitude: 12.4963655,
            zoom: 2
        }
    )

    const layerStyle = {
        'id': 'country-boundaries',
        'source-layer': 'country_boundaries',
        'type': 'fill',
        'paint': {
            'fill-color': '#d2361e',
            'fill-opacity': 0.4,
        },
    };

    const [filter, setFilter] = useState([
        "in",
        "iso_3166_1_alpha_3",
        'NLD',
        'ITA'
    ]);


    useEffect(() => {
        setFilter([
            "in",
            "iso_3166_1_alpha_3",
            'ITA',
            'FRA',
            'ESP',
            'PRT',
            'HRV',
            'SVN',
            'BEL',
            'GBR',
            'BIH',
            'CHE',
            'AUT'
        ]);
    }, []);

    const pins = useMemo(
        () =>
            CITIES.map((city, index) => (
                <Marker
                    key={`marker-${index}`}
                    draggable="True"
                    longitude={city.longitude}
                    latitude={city.latitude}
                    offsetTop={-20}
                    onClick={e => {
                        e = console.log("hi")
                    }}
                >
                    <Pin />
                </Marker>
            )),
        []
    );

    return (
        <>
            <Container className="map">

                <ReactMapGl
                    {...viewport}
                    mapboxAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
                    onViewportChange={viewport => {
                        setViewport(viewport);
                    }}
                    width="100%"
                    height="100%"
                    zoom="3.6"
                    style={{ width: 1200, height: 720 }}
                    mapStyle="mapbox://styles/csarmientobaca/clhhvfzs601go01pg4v972sox"
                >
                    <Source
                        id="countries"
                        type="vector"
                        url="mapbox://mapbox.country-boundaries-v1"
                    >
                        <Layer {...layerStyle} filter={filter} />
                    </Source>

                    {pins}
                </ReactMapGl>

            </Container >
        </>
    );
}

export default MapPart;