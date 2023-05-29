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
                ['get', 'iso_3166_1_alpha_3'], // Replace 'iso_3166_1_alpha_2' with the country code property in your data
                'IT', '#ff0000', // Italy colored red
                '#ffffff' // Default color for countries not matched above (white)
            ],
            'fill-opacity': 0.8,
        },
    };

    const mapClickHandler = (event) => {
        const features = event.target.queryRenderedFeatures(event.point, {
            layers: ['countries'] // replace with your layer id
        });

        if (features && features.length > 0) {
            const country = features[0];

            if (country.properties.iso_3166_1_alpha_2 === 'IT') {
                alert('You clicked Italy!');
            }
        }
    };
    return (
        <>
            <Container className="map">

                <ReactMapGl
                    {...viewport}
                    onClick={mapClickHandler} // handle map click
                    mapboxAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
                    onViewportChange={viewport => {
                        setViewport(viewport);
                    }}
                    scrollZoom={{ speed: 0.5 }} // allow scroll zooming
                    interactive={true} // ensure the map is interactive
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