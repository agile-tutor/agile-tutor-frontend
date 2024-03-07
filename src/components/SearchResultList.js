import React from 'react'
import SearchResult from './SearchResult';
import PropTypes from 'prop-types';

function SearchResultList({ results }) {


    return (
        <div className='result-list' >
            {results.map((result, id) =>
                <SearchResult key={id} result={result} />
            )}
        </div>
    )
}

SearchResultList.propTypes = {
    result: PropTypes.array.isRequired,
  };

export default SearchResultList