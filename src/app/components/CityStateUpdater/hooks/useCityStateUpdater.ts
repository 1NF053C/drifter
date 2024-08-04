import { useEffect } from "react";
import axios from 'axios';
import { getHostPort } from "../../MapboxMapContainer/hooks/helpers/getHostPort";

import { MapboxPublicConfigService } from '@/app/components/MapboxMapContainer/hooks/helpers/ApiClientFactory'

export function useCityStateUpdater(selectedOption: string) {
    const mapboxPublicConfigService = new MapboxPublicConfigService()
    useEffect(() => {
        const putData = async () => {
            if(selectedOption.length === 0) return;
            try {
                // todo: review OWASP
                const response = await axios.get(`${getHostPort()}/api/coordinates-from-city?cityState=${encodeURIComponent(selectedOption)}`);
                const configs = await mapboxPublicConfigService.findAll();
                const config = configs[0];
                config.startLat = response.data.lat;
                config.startLng = response.data.lng;
                await mapboxPublicConfigService.update(config.id, config)
            } catch (error) {
                console.error('Error making POST request:', error);
            }
        };
        putData().then().catch(err => console.log(err));
    }, [selectedOption])
}
