"use client";

import { MapboxMap } from '../../../../../mapbox-map/components/MapboxMap'; //"@1nf053c/mapbox-map";
import { useMapboxPublicConfig } from "./hooks/useMapboxPublicConfig";
import { useShoeStore } from './hooks/useShoeStore';

export function MapboxMapContainer() {
    const { data: configs, error: configsError, isLoading: configsLoading } = useMapboxPublicConfig();
    const { data: shoeStores, error: shoeStoresError, isLoading: shoeStoresLoading } = useShoeStore();

    if (configsError) return <div>mapbox config load error</div>;
    if (configsLoading) return <div>mapbox config loading...</div>;
    if (!configs || configs.length === 0 || !configs[0]) return <div>no mapbox config</div>;

    if (shoeStoresError) return <div>shoe stores load error: {JSON.stringify(shoeStoresError)}</div>;
    if (shoeStoresLoading) return <div>shoe stores loading...</div>;
    if (!shoeStores || shoeStores.length === 0) return <div>no shoe stores</div>;

    const renderKey = JSON.stringify(configs[0]);
    return (
        <div style={{ height: 400, width: '100%' }}>
            <MapboxMap
                key={renderKey}
                config={configs[0]}
                runningExperience={{
                    shoeStores: shoeStores
                }}
            />
        </div>
    )
}
