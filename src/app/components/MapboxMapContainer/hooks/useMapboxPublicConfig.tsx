"use client";

import useSWR from "swr";
import { MapboxPublicConfigService } from '@/app/components/MapboxMapContainer/hooks/helpers/ApiClientFactory'

export function useMapboxPublicConfig() {
    const mapboxPublicConfigService = new MapboxPublicConfigService();
    return useSWR('mbConfigCacheKey', async () => mapboxPublicConfigService.findAll(), { refreshInterval: 20000 });
}
