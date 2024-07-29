import { useEffect, useState } from "react";
import { CityStatePair, cityStatePairs } from './city-state-pairs';
import Fuse from "fuse.js";

export function useCityStateSearch(searchText: string) {
    const [results, setResults] = useState<CityStatePair[]>([]);
    useEffect(() => {
        const fuse = new Fuse(cityStatePairs, {
            keys: ['city', 'state'],
            includeScore: true,
            threshold: 1,
            distance: 0
        });
        const fuseResults = fuse.search(searchText);
        setResults(fuseResults.map(r => r.item).slice(0, 6));
    }, [searchText]);

    return results;
}