"use client";

import useSWR from "swr";
import { PlaceService } from '@/app/components/MapboxMapContainer/hooks/helpers/ApiClientFactory'

export function usePlace() {
    const placeService = new PlaceService();
    return useSWR('plConfigCacheKey', async () => await placeService.findAll(), { refreshInterval: 200 });
}
