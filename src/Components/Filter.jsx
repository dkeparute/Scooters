import { useState } from "react";


function Filter({ sort, code, setFilterBy, setSearchBy, reset }) {

    // SORT ------------------------------------------
    const [sortValue, setSortValue] = useState('');

    const selectSort = e => {
        setSortValue(e.target.value);
        sort(e.target.value);
    }

    // Fillter
    const [filterValue, setFilterValue] = useState('');

    const selectFilter = e => {
        setFilterValue(e.target.value);
        setFilterBy(e.target.value)
    }

    // Search
    const [searchValue, setSearchValue] = useState('');
    const handleSearchValue = e => {
        setSearchValue(e.target.value);
        setSearchBy(e.target.value);
    }

    // RESET
    const resetHandler = () => {
        reset();
        setFilterValue('');
        setSearchValue('');
        setSortValue('');
        sort('');
    }


    return (
        <div className='general-filter'>
            <div className='each-filter'>
                {/* SORT------------------------------------------------ */}
                <span>Sort by: </span>
                <select onChange={selectSort} value={sortValue} >
                    <option value="">Select </option>
                    <option value="totalKm_asc">Total kilometers ASC </option>
                    <option value="totalKm_desc">Total kilometers DESC </option>
                    <option value="useDate_asc">Use date ASC </option>
                    <option value="useDate_desc">Use date DESC </option>
                </select>
            </div>
            <div className='each-filter'>
                {/* DISTINCT */}
                <span>Select distinct: </span>
                <select onChange={selectFilter} value={filterValue}>
                    <option value="">Select </option>
                    {code.map(t => <option key={t.registration_code} value={t.registration_code}>{t.registration_code}</option>)}
                </select>
            </div>
            <div className='each-filter'>
                {/* SEARCH */}
                <span>Search by: </span>
                <input onChange={handleSearchValue} value={searchValue} placeholder="search for reg.code" onKeyPress={(event) => {
                    if (!/['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z', 0, 1, 2, 3, 4, 5, 6, 7, 8, 9]/.test(event.key)) { event.preventDefault(); }
                }} />
            </div>
            <button onClick={resetHandler}>Reset</button>
        </div>

    );
}
export default Filter;