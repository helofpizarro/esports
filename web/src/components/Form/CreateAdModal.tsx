import {useState, useEffect, FormEvent} from 'react'
import * as Dialog from '@radix-ui/react-dialog'
import Input from './Input'
import { GameController, Check } from 'phosphor-react'
import * as Checkbox from '@radix-ui/react-checkbox'
import * as ToggleGroup from '@radix-ui/react-toggle-group'
import axios from 'axios'

interface Game {
    id: string
    title: string
    bannerURL: string
    _count: {
      ads: number
    }
  }

export default function CreateAdModal() {
    const [game, setGame] = useState<Game[]>([])
    const [weekDays, setWeekDays] = useState<string[]>([])
    const [useVoiceChannel, setUseVoiceChannel] = useState(false)
    
    useEffect(() => {
      axios('http//localhost:3333/games')
      .then(response => {
          setGame(response.data)
      })
    }, [])
    
    async function handleCreateAd(event: FormEvent) {
        event.preventDefault()

        const formData = new FormData(event.target as HTMLFormElement)
        const data = Object.fromEntries(formData)

        if(!data.name){
            return
        }

      try {
       await axios.post(`http://localhost:3333/games/${data.game}/ads`, {
            'name': data.name,
            'yearsPlaying': Number(data.yearsPlaying),
            'discord': data.discord,
            'weekDays': weekDays.map(Number),
            'hourStart': data.hourStart,
            'hourEnd': data.hourEnd, 
            'useVoiceChannel': useVoiceChannel
        })
         alert('Anuncio criado com sucesso')   
      } catch (err) {
        alert('Erro ao criar um anuncio')
      }

    }    

    return (    
        <Dialog.Portal>
        <Dialog.Overlay className='bg-black/60 inset-0 fixed'/>
        <Dialog.Content className='fixed bg-[#2A2634] py-8 px-10 text-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg w-[480px] shadow-black/25'>
          <Dialog.Title className='text-3xl font-black'>Publique um anuncio</Dialog.Title>

 
             <form onSubmit={handleCreateAd} className='mt-8 flex flex-col gap-4'>
      
              <div className='flex flex-col gap-2'>
                <label htmlFor='game' className='font-semibold'>Qual o game?</label>
                <select 
                id='game' 
                name='game'    
                placeholder='Selecione o game que deseja jogar'
                className='bg-zinc-900 py-3 px-4 rounded text-sm placeholder:text-zinc-500 appearance-none'
                >
                 <option disabled defaultValue='' value=''>Seleciona o game que deseja jogar</option> 
                 {game.map(game => {
                    return (
                        <option value={game.id} key={game.id}>{game.title}</option>
                    )
                 })}          
                </select>
              </div>

               <div className='flex flex-col gap-2'>
                 <label htmlFor=''>Seu nome</label> 
                 <Input name='game' id='game' placeholder='Como te chamam dentro do game'/>
                    
                </div> 
                
              <div className='grid grid-cols-2 gap-6'>
                <div className='flex flex-col gap-2'>
                  <label htmlFor='yearsPlaying'>Joga há quantos anos?</label>
                  <Input name='game' id='game' type='number' placeholder='Tudo bem ser zero'/>  
                </div>
                <div className='flex flex-col gap-2'>
                  <label htmlFor='discord'>Qual o seu discord?</label>
                  <Input name='text' id='text' placeholder='Usuário#0000'/>
                </div>
              </div>

                <div className='flex gap-6'>
                  <div className='flex flex-col gap-2'>
                    <label htmlFor='weekDays'>Quando costuma jogar?</label>
                  
                        <ToggleGroup.Root type='multiple' onValueChange={setWeekDays} className='grid grid-cols-4 gap-2'>
                            <ToggleGroup.Item
                            value='0' 
                            className='w-8 h-8 rounded bg-zinc-900' 
                            
                            title='Segunda'>  
                                S
                            </ToggleGroup.Item>
                            <ToggleGroup.Item
                            value='1'
                            className={`w-8 h-8 rounded  ${weekDays.includes('0') ? 'bg-violet-500' : 'bg-zinc-900'}`}
                            title='Terça'>
                                T
                            </ToggleGroup.Item>
                            <ToggleGroup.Item 
                            value='2'
                            className={`w-8 h-8 rounded  ${weekDays.includes('2') ? 'bg-violet-500' : 'bg-zinc-900'}`}
                            title='Quarta'>
                                Q
                            </ToggleGroup.Item>
                            <ToggleGroup.Item
                            value='2'
                            className={`w-8 h-8 rounded  ${weekDays.includes('3') ? 'bg-violet-500' : 'bg-zinc-900'}`}
                            title='Quinta'>
                                Q
                            </ToggleGroup.Item>
                            <ToggleGroup.Item 
                            value='3'
                            className={`w-8 h-8 rounded  ${weekDays.includes('4') ? 'bg-violet-500' : 'bg-zinc-900'}`} 
                            title='Sexta'>
                                S
                            </ToggleGroup.Item>
                            <ToggleGroup.Item 
                            value='4'
                            className={`w-8 h-8 rounded  ${weekDays.includes('5') ? 'bg-violet-500' : 'bg-zinc-900'}`}
                            title='Sabado'>
                                S
                            </ToggleGroup.Item>
                            <ToggleGroup.Item 
                            value='5'
                            className={`w-8 h-8 rounded  ${weekDays.includes('6') ? 'bg-violet-500' : 'bg-zinc-900'}`}
                            title='Domingo'>
                                D
                            </ToggleGroup.Item>

                        </ToggleGroup.Root>
                  </div>

                  <div className='flex flex-col flex-1 gap-2'>
                    <label htmlFor='hourStart'>Qual horário do dia?</label>
                    <div className='grid grid-cols-2 gap-2'>
                      <Input type='time' name='hourStart' id='hourStart' placeholder='De'/>
                      <Input type='time' name='hourEnd'  id='hourEnd' placeholder='Até'/>
                    </div>
                  </div>

                </div>
             

                <label className='mt-2 flex items-center gap-2 text-sm'>
                  <Checkbox.Root 
                  checked={useVoiceChannel}
                    className='w-6 h-6 rounded bg-zinc-900'
                    onCheckedChange={(checked) => {
                        if(checked === true){
                            setUseVoiceChannel(true)
                        } else {
                            setUseVoiceChannel(false)
                        }
                    }}    
                    >
                    <Checkbox.Indicator>
                       <Check className='w-4 h-4 p-1 text-emerald-400'/> 
                    </Checkbox.Indicator>
                  </Checkbox.Root>
                  Costumo me conectar ao chat de voz
                </label>

                <footer className='mt-4 flex justify-end gap-4'>
                  <Dialog.Close 
                  type='button' 
                  className='bg-zinc-500 px-5 h-12 rounded-md font-semibold'>
                    Cancelar
                  </Dialog.Close>
                  <button
                    className='bg-violet-500 px-5 h-12 rounded-md font-semibold flex items-center gap-3 '
                     type='submit'>
                    <GameController size={24}/>
                    Encontrar duo

                  </button>
                </footer>

              </form> 
        
        </Dialog.Content>  

      </Dialog.Portal> 
    )
}