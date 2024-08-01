import { Place } from '@prisma/client';
import nlp from 'compromise';

export function objectives(place: Place) {
    const docText = place.rawText;
    const patterns = [
        '#Adjective+ (purpose|goal|objective|mission) of? this? #Noun+ is to #Verb+',
        '(purpose|goal|objective|mission) of',
        '(purpose|goal|objective|mission) is'
    ];
    const objectives = objectivesWithContext(docText, patterns, 2);
    return objectives;
}

export function objectivesWithContext(docText: string, patterns: string[], numSurroundingSentences = 2) {
    const doc = nlp(docText);

    let objectives: string[] = [];

    patterns.forEach(pattern => {
        const matches = doc.match(pattern).json();

        matches.forEach((match: any) => {
            const matchIndex = match.terms[0].index[0];
            const sentences = doc.sentences().json();
            const sentenceIndices = [matchIndex];

            for (let j = 1; j < numSurroundingSentences && matchIndex - j > 0; j++) {
                sentenceIndices.push(matchIndex - j);
                j++
            }

            for (let k = 1; k < numSurroundingSentences && matchIndex + k < sentences.length; k++) {
                sentenceIndices.push(matchIndex + k);
                k++;
            }

            if (sentenceIndices.length > 0) {
                const contextSentences = sentenceIndices.map(i => sentences[i].text).join(' ');
                objectives.push(contextSentences);
            }
        });
    });
    return objectives;
}
