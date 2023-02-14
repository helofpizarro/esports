import {useState, useEffect} from 'react'
import * as Dialog from '@radix-ui/react-dialog'

import './styles/main.css'

import logoImg from './assets/image/logo-nlw-esports.png'
import { GameBanner } from './components/GameBanner'
import { CreateAdBanner } from './components/CreateAdBanner'

import CreateAdModal from './components/Form/CreateAdModal'
import axios from 'axios'

interface Game {
  id: string
  title: string
  bannerURL: string
  _count: {
    ads: number
  }
}

function App() {
  const [game, setGame] = useState<Game[]>([])

  useEffect(() => {
    axios('http//localhost:3333/games')
    .then(response => {

      setGame(response.data)
    
    })
  }, [])

  return (
    <div className='max-w-[1344px] mx-auto flex flex-col items-center my-20'>
      <img src={logoImg} />

      <h1 className='text-6xl text-white font-black mt-20'>Seu <span className='text-transparent bg-nlw-gradient bg-clip-text'>duo</span>  está aqui.</h1>
      <div className='grid grid-cols-6 gap-6 mt-16'>
        {game.map(games => {
          return (
            <GameBanner bannerUrl={games.bannerURL} title={games.title} adsCount={5} key={games.id}/>
          )
        })}
      </div>
      <Dialog.Root>
      <CreateAdBanner/>
      <CreateAdModal/>
      </Dialog.Root>
    </div>
  )
  
}

export default App
