"use client";

import useSWR from "swr";
import { PlaceService } from '@/app/components/MapboxMapContainer/hooks/helpers/ApiClientFactory'
import { toPlaceViews } from "../views/PlaceView";

export function usePlace() {
    const placeService = new PlaceService();
    const getAndTransformPlace = async () => {
        const places = await placeService.findAll();
        return await toPlaceViews(places);
    }
    return useSWR('plConfigCacheKey', getAndTransformPlace, { refreshInterval: 200 });
}
