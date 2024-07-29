"use client";

import { useMapboxPublicConfig } from "./hooks/useMapboxPublicConfig";
import { MapboxMap } from "@1nf053c/mapbox-map";

export function MapboxMapContainer() {
    const { data, error, isLoading } = useMapboxPublicConfig();
    console.log('MapboxMapContainer render');

    if (error) return <div>mapbox config load error</div>;
    if (isLoading) return <div>mapbox config loading...</div>;
    if (!data || data.length === 0 || !data[0]) return <div>no mapbox config</div>;

    return (
        <div style={{ height: 400, width: '100%' }}>
            <MapboxMap
                publicKey={data[0].publicKey}
                startLng={data[0].startLng}
                startLat={data[0].startLat}
                zoomLevel={data[0].zoomLevel}
            />
        </div>
    )
}
