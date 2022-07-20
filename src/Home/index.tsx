import '../styles/global.scss'
import './styles.scss'
import { InputTxt } from '../components/InputTxt'

export function Home(){
  return(
    <div className='container'>
      <section className='pageContainer'>
        <h1 className='title'>
          MaileHereko
        </h1>
        <p className='description'>
          List of movies and TV Shows, <span>I, Pramod Poudel</span> have
          watched till date. Explore what I have watched and also feel free to
          make a suggestion. 😉
        </p>
        <div className="inputTxt">
          <InputTxt/>
        </div>
      </section>
      <div className='tabFilter'>
      </div>
      <section>
        <header className="category">
          <strong>All</strong>
          <span>(0)</span>
        </header>


      </section>
    </div>
  )

}