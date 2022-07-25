import {createContext, ReactNode, useContext, useState} from 'react'

type FitlersContextData={
  filters: {
    title: string
  }[]
  currentFilter: Filter
  setCurrentFilter:(filter:Filter)=> void
}
export type Filter = {
  title: string
}
const FilterContext = createContext<FitlersContextData>(
  {} as FitlersContextData
)
export const FilterProvider = ({children}: {children: ReactNode})=>{
  const [filters] = useState<Filter[]>([
    {title: 'All'},
    {title: 'Movies'},
    {title: 'Tv Shows'}
  ])
  const [currentFilter, setCurrentFilter] = useState<Filter>(filters[0])
  return(
    <FilterContext.Provider
    value={{filters, currentFilter, setCurrentFilter}}>
      {children}

    </FilterContext.Provider>
  )
}
export const useFiltersContext = () => useContext(FilterContext);