import './styles.scss'
import searchicon from '../../assets/icons/searchicon.svg'

type SearchProps={
  text: string
  value: string
  onChange:(text:string)=>void
}
const delay = (ms: number ) => new Promise(
  resolve => setTimeout(resolve, ms)
)


export function InputTxt({text, onChange}:SearchProps) {
  const handleChange = async (event:string) => {
  
    await delay (2500)
    onChange(event.target.value)
  }
  return (

    <div id='form' className='inputContainer'>
      <img src={searchicon}>
      </img>
      <input type="search" value={text}  id='search'
        placeholder='Search Movies or TV Shows' 
        onChange={handleChange}
        >
      </input>
    </div >

  )
}

