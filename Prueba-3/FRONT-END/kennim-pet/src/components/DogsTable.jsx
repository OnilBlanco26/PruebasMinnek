import { useContext, useState } from 'react';
import { DogsContext } from '../context/DogsContext';
import { deleteDogAction } from '../redux/actions/dog';
import { useDispatch } from 'react-redux';

const DogsTable = () => {
  const { breeds, setBreeds } = useContext(DogsContext);
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState('name');

  const dispatch = useDispatch();

  const handleDelete = id => {
    dispatch(deleteDogAction(id));
    setBreeds(breeds => breeds.filter(breed => breed.id !== id));
  };

  const filterBreeds = (breeds, search) => {
    return breeds.filter(breed => {
      const breedName = breed.name.toLowerCase();
      const subBreedNames = breed.subBreeds.map(subBreed =>
        subBreed.name.toLowerCase()
      );
      const searchValue = search.toLowerCase();
      return (
        breedName.includes(searchValue) ||
        subBreedNames.some(subBreedName => subBreedName.includes(searchValue))
      );
    });
  };

  const sortBreeds = (filteredBreeds, sortBy) => {
    return filteredBreeds.sort((a, b) => {
      if (sortBy === 'name') {
        return a.name.localeCompare(b.name);
      } else if (sortBy === 'subBreed') {
        const aSubBreedNames = a.subBreeds.map(subBreed => subBreed.name);
        const bSubBreedNames = b.subBreeds.map(subBreed => subBreed.name);
        return aSubBreedNames.join().localeCompare(bSubBreedNames.join());
      }
    });
  };

  const handleSortChange = e => {
    setSortBy(e.target.value);
  };

  const filteredBreeds = filterBreeds(breeds, search);
  const sortedBreeds = sortBreeds(filteredBreeds, sortBy);

  return (
    <div className="dogs-table--container">
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
              <tr key={breed.id} className="dogs-table--body__tr">
                <td>{breed.name}</td>
                {breed.subBreeds.length > 0
                  ? breed.subBreeds.map((subBreed, index) => {
                      return (
                        <span className="subBreed-sp" key={subBreed.id}>
                          {subBreed.name}
                          {index < breed.subBreeds.length - 1 ? ', ' : null}
                        </span>
                      );
                    })
                  : null}
               
                  <button className='btn-del' onClick={() => handleDelete(breed.id)}>X</button>
                 
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default DogsTable;
