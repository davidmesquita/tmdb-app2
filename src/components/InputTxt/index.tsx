import './styles.scss'
import searchicon from '../../assets/icons/searchicon.svg'
export function InputTxt() {
  return (

    <div id='form' className='inputContainer'>
      <img src={searchicon}>
      </img>
      <input type="search"  id='search'
        placeholder='Search Movies or TV Shows'
        >
      </input>
    </div >

  )
}

