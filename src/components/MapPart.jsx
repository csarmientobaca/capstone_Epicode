import ReactMapGl from "react-map-gl"
import { useState } from 'react';
import { Source, Layer } from 'react-map-gl';

import "mapbox-gl/dist/mapbox-gl.css"
import { Container } from "react-bootstrap";

function MapPart() {

    const [viewport, setViewport] = useState(
        {
            latitude: 41.9027835,
            longitude: 12.4963655,
            zoom: 3
        }
    )
    const layerStyle = {
        id: 'countries',
        type: 'fill',
        paint: {
            'fill-color': [
                'match',
                ['get', 'iso_3166_1_alpha_2'], // Replace 'iso_3166_1_alpha_2' with the country code property in your data
                'AL', '#ff0000', // Albania colored red
                'AT', '#ff0000', // Austria colored red
                'BE', '#ff0000', // Belgium colored red
                // Add more country codes and colors for other European countries
                '#ffffff' // Default color for countries not matched above (white)
            ],
            'fill-opacity': 0.8,
        },
    };


    return (
        <>
            <Container>

                <ReactMapGl
                    {...viewport}
                    mapboxAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
                    onViewportChange={viewport => {
                        setViewport(viewport);
                    }}
                    width="100%"
                    height="100%"
                    style={{ width: 1200, height: 720 }}
                    mapStyle="mapbox://styles/csarmientobaca/clhhvfzs601go01pg4v972sox"
                >
                    <Source
                        id="countries"
                        type="vector"
                        url="mapbox://mapbox.country-boundaries-v1"
                    >
                        <Layer {...layerStyle} />
                    </Source>
                </ReactMapGl>

            </Container>
        </>
    );
}

export default MapPart;
