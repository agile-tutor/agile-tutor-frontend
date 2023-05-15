import React from 'react'

function SearchResult({ result }) {
    return (
        <div className='search-result' onClick={(e) => alert("click on "+result.name+e)}>{result.surname+" "+result.name}</div>
    )
}

export default SearchResult 