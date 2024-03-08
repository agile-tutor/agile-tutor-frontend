import React from 'react'
import SearchResult from './SearchResult';
import PropTypes from 'prop-types';

function SearchResultList({ results }) {


    return (
        <div className='result-list' >
            {results.map((result) =>
                <SearchResult key={result.id} result={result} />
            )}
        </div>
    )
}

SearchResultList.propTypes = {
    results: PropTypes.array.isRequired,
  };

export default SearchResultList