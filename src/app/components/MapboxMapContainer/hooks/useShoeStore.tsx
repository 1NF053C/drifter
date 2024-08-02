"use client";

import useSWR from "swr";
import { ShoeStoreService } from '@/app/components/MapboxMapContainer/hooks/helpers/ApiClientFactory'

export function useShoeStore() {
    const shoeStoreService = new ShoeStoreService();
    return useSWR('shoeStoreCacheKey', async () => await shoeStoreService.findAll(), { refreshInterval: 200 });
}
