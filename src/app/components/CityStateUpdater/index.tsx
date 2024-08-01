"use client";

import './index.css';
import { useRef, useState } from 'react';

import { useCityStateSearch } from './hooks/useCityStateSearch';
import { useCityStateUpdater } from './hooks/useCityStateUpdater';

import { useFrameSVGAssembler, FrameSVGCorners } from '@arwes/react';
import { useFocusOnLoad } from './hooks/useFocusOnLoad';

export function CityStateUpdater() {

    const [text, setText] = useState('');             // visible input text is both typed text and selected option text
    const [searchText, setSearchText] = useState(''); // trigger search if user types input text but don't trigger search if user selects option
    const results = useCityStateSearch(searchText);
    const [selectedOption, setSelectedOption] = useState(''); // trigger city state update if user selects option
    useCityStateUpdater(selectedOption);

    const ref = useFocusOnLoad();   // focus on input element when component loads

    function handleChange(e: any) {
        setText(e.target.value);
        setSearchText(e.target.value);
    }

    function handleKeydown(e: any) {
        if (e.key === 'Enter') {
            const opt = `${results[0].city}, ${results[0].state}`;
            setSelectedOption(opt);
            setText(opt);
        }
    }

    function handleSelectionChange(e: any) {
        setSelectedOption(e.target.value);
        setText(e.target.value); // set input text but don't trigger another search
    }

    return (
        <>
            <div className='search'>
                <Glowinput />
                <input
                    className='search search__input'
                    ref={ref}
                    placeholder="City, State"
                    onChange={handleChange}
                    onKeyDown={handleKeydown}
                    value={text}
                />
            </div>
            <select
                className="search search__select"
                value={selectedOption}
                onChange={handleSelectionChange}
                onClick={handleSelectionChange}
            >
                {
                    results.map(r => {
                        const opt = `${r.city}, ${r.state}`;
                        return <option key={opt} value={opt}>{opt}</option>
                    })
                }
            </select>

        </>
    )
}

const Glowinput = () => {
    const frameRef = useRef<SVGSVGElement | null>(null);
    useFrameSVGAssembler(frameRef);
    return (
        <div className="glowinput">
            <FrameSVGCorners
                elementRef={frameRef}
                style={{
                    // @ts-expect-error css variables
                    '--arwes-frames-bg-color': 'hsl(60, 75%, 10%)',
                    '--arwes-frames-bg-filter': 'drop-shadow(0 0 2px hsl(60, 75%, 10%))',
                    '--arwes-frames-line-color': 'hsl(60, 75%, 50%)',
                    '--arwes-frames-line-filter': 'drop-shadow(0 0 2px hsl(60, 75%, 50%))'
                }}
                padding={4}
            />
        </div>
    )
}
