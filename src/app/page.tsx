import { CityStateUpdater } from "./components/CityStateUpdater"
import { MapboxMapContainer } from "./components/MapboxMapContainer"

export default function Home() {
    return (
        <>
            <CityStateUpdater />
            <MapboxMapContainer />
        </>
    )
}

export const metadata = {
    openGraph: {
        title: '0 | Home',
        description: 'Misc javascript',
        url: 'https://compassionandhardwork.com',
        siteName: 'Compassion and Hardwork',
        images: [
            {
                url: 'https://compassionandhardwork.com/favicon.ico',
                width: 200,
                height: 200,
            },
        ],
        locale: 'en_US',
        type: 'website',
    },
}
