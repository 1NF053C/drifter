"use client";

import { usePlace } from "./hooks/usePlace";
import { PlaceList } from "./PlaceList";

export function PlaceListContainer() {
    const { data, error, isLoading } = usePlace();

    if (error) return <div>place list load error</div>;
    if (isLoading) return <div>place list loading...</div>;
    if (!data || data.length === 0) return <div>no place list</div>;

    const renderKey = JSON.stringify(data);
    return (
        <div style={{ height: 400, width: '100%' }}>
            <PlaceList
                key={renderKey}
                data={data}
            />
        </div>
    )
}
