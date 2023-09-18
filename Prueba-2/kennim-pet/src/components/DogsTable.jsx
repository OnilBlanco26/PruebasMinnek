import axios from 'axios';
import { useEffect, useState } from 'react';

const DogsTable = () => {
  const [breeds, setBreeds] = useState([]);
  const [subBreeds, setSubBreeds] = useState({});
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState('name');

  useEffect(() => {
    axios
      .get('https://dog.ceo/api/breeds/list/all')
      .then(res => {
        const breedList = Object.keys(res.data.message);
        setBreeds(breedList);
      })
      .catch(err => console.log(err));
  }, []);

  useEffect(() => {
    const breedsData = {};

    const fetchSubBreeds = async breed => {
      try {
        const res = await axios.get(`https://dog.ceo/api/breed/${breed}/list`);
        const subBreedList = res.data.message;
        if (subBreedList.length > 0) {
          breedsData[breed] = subBreedList;
          setSubBreeds(prevSubBreeds => ({
            ...prevSubBreeds,
            [breed]: breedsData[breed],
          }));
        }
      } catch (err) {
        console.log(err);
      }
    };

    breeds.forEach(breed => {
      fetchSubBreeds(breed);
    });
  }, [breeds]);

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

  const handleSortChange = (e) => {
    setSortBy(e.target.value);
  };


  const filteredBreeds = filterBreeds(breeds, subBreeds, search);
  const sortedBreeds = sortBreeds(filteredBreeds, subBreeds, sortBy);

  return (
    <>
    <div className='filter-container'>
      <input
        className="table-input"
        type="text"
        placeholder="Buscar por nombre de perro o subraza"
        value={search}
        onChange={e => setSearch(e.target.value)}
      />

      <select value={sortBy} onChange={handleSortChange}>
        <option value="name">Ordenar por Nombre</option>
        <option value="subBreed">Ordenar por Subraza</option>
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
                  <p className="">No hay subrazas</p>
                )}
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
};

export default DogsTable;
