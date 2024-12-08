function Search({ onSearchChange, searchData }) {
    // console.log('>>>check searchData', searchData);
    return (
        <>
            <input type="text" className="form-control w-50 rounded-pill" placeholder="Tìm kiếm" onChange={(e) => onSearchChange(e.target.value)} />
            <i className="ps-2 bi bi-search" style={{ fontSize: '1.5rem' }}></i>
        </>
    );
}

export default Search;