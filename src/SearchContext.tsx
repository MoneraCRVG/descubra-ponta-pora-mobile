import React, { createContext, useContext, useEffect, useState } from 'react';
import { PontoTuristico } from './datatypes';
import { getPontosTuristicos } from './api';

type SearchContextType = {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  filteredPontos: PontoTuristico[];
};

const SearchContext = createContext<SearchContextType | undefined>(undefined);

export const SearchProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [pontosTuristicos, setPontosTuristicos] = useState<PontoTuristico[]>([]);
  const [filteredPontos, setFilteredPontos] = useState<PontoTuristico[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getPontosTuristicos();
      setPontosTuristicos(data);
      setFilteredPontos(data);
    };

    fetchData();
  }, []);

  useEffect(() => {
    const query = searchQuery.toLowerCase();
    const filtered = pontosTuristicos.filter(
      (item) =>
        item.nome.toLowerCase().includes(query) ||
        item.descricao.toLowerCase().includes(query)
    );
    setFilteredPontos(filtered);
  }, [searchQuery, pontosTuristicos]);

  return (
    <SearchContext.Provider value={{ searchQuery, setSearchQuery, filteredPontos }}>
      {children}
    </SearchContext.Provider>
  );
};

export const useSearch = (): SearchContextType => {
  const context = useContext(SearchContext);
  if (!context) {
    throw new Error('useSearch must be used within a SearchProvider');
  }
  return context;
};
