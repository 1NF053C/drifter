import { Place } from "@prisma/client";

export function urls(place: Place) {
    const urlPattern = /https?:\/\/[^\s/$.?#].[^\s]*/g;
    return place.rawText.match(urlPattern) || [];
}
