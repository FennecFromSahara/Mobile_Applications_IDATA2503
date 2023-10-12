import { createContext, useState } from 'react';

export const FiltersContext = createContext({
  ids: [],
  addFilter: (id) => {},
  removeFilter: (id) => {},
});

export default function FiltersContextProvider({ children }) {
  const [filterIds, setFilterIds] = useState([]);

  function addFilter(id) {
    setFilterIds((currentFilterIds) => [...currentFilterIds, id]);
  }

  function removeFilter(id) {
    setFilterIds((currentFilterIds) =>
      currentFilterIds.filter((currentId) => currentId !== id)
    );
  }

  const value = {
    ids: filterIds,
    addFilter: addFilter,
    removeFilter: removeFilter,
  };

  return (
    <FiltersContext.Provider value={value}>{children}</FiltersContext.Provider>
  );
}
