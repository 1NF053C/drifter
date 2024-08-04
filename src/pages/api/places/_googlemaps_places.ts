import axios from "axios";

require('dotenv').config({ path: '.env.local' });

export async function callSearchText(keyword: string, lat: number, lng: number, radius: number) {
    const PLACES_API_URL = 'https://places.googleapis.com/v1/places:searchText';

    const postData = {
        textQuery: keyword,
        maxResultCount: 10,
        locationBias: {
        //locationRestriction: {
            circle: {
                center: {
                    latitude: lat,
                    longitude: lng
                },
                radius
            }
        }
    };

    const headers = {
        'Content-Type': 'application/json',
        'X-Goog-Api-Key': process.env.GOOGLE_MAPS_API_KEY,
        'X-Goog-FieldMask': '*'
    };

    try {
        console.log(PLACES_API_URL, JSON.stringify(postData), headers)
        const response = await axios.post(PLACES_API_URL, postData, { headers });
        return response.data.places;
    } catch (error: any) {
        console.error('Error calling Google Maps API:', error.response.data);
        throw error;
    }
}
