import { Place } from "@prisma/client";

export function name(place: Place) {
    const newName = place.name.split('_').map((word: string) => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
    return newName.slice(0, newName.indexOf('.'));
}
