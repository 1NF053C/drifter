import { NextApiRequest, NextApiResponse } from 'next'
import { callSearchText } from './_googlemaps_places';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    switch (req.method) {
        case 'GET':
            const { keyword, lng, lat, radius } = req.query;
            if (!keyword || !lng || !lat || !radius) throw '/api/places expects params <keyword> <lng> <lat> <radius>';

            const opts: SearchPlacesOptions = {
                keyword: String(keyword),
                lng: Number(lng),
                lat: Number(lat),
                radius: Number(radius)
            }

            return searchPlaces(req, res, opts);
        default:
            return res.status(405).end(`Method ${req.method} Not Allowed`)
    }
}

interface SearchPlacesOptions {
    keyword: string,
    lng: number,
    lat: number,
    radius: number
}

async function searchPlaces(_req: NextApiRequest, res: NextApiResponse, opts: SearchPlacesOptions) {
    const results = await callSearchText(opts.keyword, opts.lat, opts.lng, opts.radius)
    res.status(200).json(results)
}
