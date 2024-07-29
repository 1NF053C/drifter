"use client";

import useSWR from "swr";
import { MapboxPublicConfigService } from '@/app/components/MapboxMapContainer/hooks/helpers/ApiClientFactory'

export function useMapboxPublicConfig() {
    const mapboxPublicConfigService = new MapboxPublicConfigService();
    return useSWR('mbConfigCacheKey', async () => await mapboxPublicConfigService.findAll(), { refreshInterval: 5000 });
}
