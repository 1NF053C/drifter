"use client";

import './index.css';
import { useState } from 'react';
import { useCityStateSearch } from './hooks/useCityStateSearch';
import { useCityStateUpdater } from './hooks/useCityStateUpdater';

export function CityStateUpdater() {
    const [searchText, setSearchText] = useState(''); // searchText is typed text, but not selected option text
    const [text, setText] = useState(''); // text is both typed text and selected option text
    const [selectedOption, setSelectedOption] = useState('');

    const results = useCityStateSearch(searchText);
    useCityStateUpdater(selectedOption);

    function handleChange(e: any) {
        setText(e.target.value);
        setSearchText(e.target.value);
    }

    function handleSelectionChange(e: any) {
        setSelectedOption(e.target.value);
        setText(e.target.value); // set input text but don't trigger another search
    }

    return (
        <>
            <div className='search'>
                <input
                    placeholder="Enter City, State..."
                    onChange={handleChange}
                    className='search search__input'
                    value={text}
                />
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
            </div>
        </>
    )
}
