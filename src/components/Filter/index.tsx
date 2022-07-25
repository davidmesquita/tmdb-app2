import { useFiltersContext } from "../context/filterContext"
import './styles.scss'

export function Filters(){
  const {filters, currentFilter, setCurrentFilter} = useFiltersContext()
  return(
    <div className="filter-container">
      {filters.map((filter) =>(
        <button key={filter.title}
        className={`${"options"} ${currentFilter === filter && "active"}`}
        onClick={()=>setCurrentFilter(filter)}>
          {filter.title}
        </button>
      ))}
    </div>
  )

}



