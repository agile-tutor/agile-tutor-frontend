import React from 'react'
import SearchResult from './SearchResult';

function SearchResultList({ results }) {


    return (
        <div className='result-list' >
            {results.map((result, id) =>
                <SearchResult key={id} result={result} />
            )}
        </div>
    )
}

export default SearchResultList