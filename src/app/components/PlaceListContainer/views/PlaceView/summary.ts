import { Place } from '@prisma/client';
import nlp from 'compromise';

export function summary(place: Place) {
    const doc = nlp(place.rawText);

    // spin input
    const importantKeywords = ['outdoors', 'outdoor'];

    const summarySentences = doc.sentences().filter(sentence => {
        return importantKeywords.some(keyword => sentence.has(keyword));
    });
    return summarySentences.out('text');
}
