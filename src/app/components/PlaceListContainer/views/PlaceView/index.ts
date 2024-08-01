import { Place } from "@prisma/client";
import { objectives } from "./objectives";
import { summary } from "./summary";
import { urls } from "./urls";
import { name } from "./name";
import { textMatchPreview } from "./textMatchPreview";

export interface PlaceView extends Omit<Place, 'id'> {
    name: string,
    urls: string[],
    summary: string,
    textMatchPreview: string,
    objectives: string[]
}

export async function toPlaceViews(places: Place[]) {
    return await Promise.all(places.map(createPlaceView))
}

export async function createPlaceView(place: Place): Promise<PlaceView> {
    return {
        ...place,
        name: name(place),
        urls: urls(place),
        summary: summary(place),
        objectives: objectives(place),
        textMatchPreview: textMatchPreview(place),
    }
}
