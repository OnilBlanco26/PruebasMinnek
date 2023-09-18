import { useContext, useState } from 'react';
import { DogsContext } from '../context/DogsContext';

const DogsTable = () => {
  const { breeds, subBreeds } = useContext(DogsContext);
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState('name');

  const filterBreeds = (breeds, subBreeds, search) => {
    return breeds.filter(breed => {
      return (
        breed.toLowerCase().includes(search.toLowerCase()) ||
        (subBreeds[breed] &&
          subBreeds[breed].some(subBreed =>
            subBreed.toLowerCase().includes(search.toLowerCase())
          ))
      );
    });
  };

  const sortBreeds = (filteredBreeds, subBreeds, sortBy) => {
    return filteredBreeds.sort((a, b) => {
      if (sortBy === 'name') {
        return a.localeCompare(b);
      } else if (sortBy === 'subBreed') {
        return (subBreeds[a] ? subBreeds[a][0] : '').localeCompare(
          subBreeds[b] ? subBreeds[b][0] : ''
        );
      }
      return 0;
    });
  };

  const handleSortChange = e => {
    setSortBy(e.target.value);
  };

  const filteredBreeds = filterBreeds(breeds, subBreeds, search);
  const sortedBreeds = sortBreeds(filteredBreeds, subBreeds, sortBy);

  return (
    <div className='dogs-table--container'>
      <div className="filter-container">
        <input
          className="table-input"
          type="text"
          placeholder="Search by dog name or sub-breed"
          value={search}
          onChange={e => setSearch(e.target.value)}
        />

        <select
          className="table-select"
          value={sortBy}
          onChange={handleSortChange}
        >
          <option value="name">Sort by Name</option>
          <option value="subBreed">Sort by Subrace</option>
        </select>
      </div>
      <table className="dogs-table">
        <thead className="dogs-table--head">
          <tr>
            <th>Dogs</th>
            <th>Sub Breed</th>
          </tr>
        </thead>
        <tbody className="dogs-table--body">
          {sortedBreeds.map(breed => {
            return (
              <tr key={breed} className="dogs-table--body__tr">
                <td>{breed}</td>
                {subBreeds[breed] && subBreeds[breed].length > 0 ? (
                  <td>
                    {subBreeds[breed].map((subBreed, index) => (
                      <span key={subBreed}>
                        {subBreed}
                        {index !== subBreeds[breed].length - 1 ? ', ' : ''}
                      </span>
                    ))}
                  </td>
                ) : (
                  <p className="">No sub-races</p>
                )}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default DogsTable;
