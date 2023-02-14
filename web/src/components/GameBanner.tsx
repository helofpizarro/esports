interface GameBannerProps {
  bannerUrl: string
  title: string
  adsCount: number
}


export function GameBanner(props: GameBannerProps) {
    return (
        <a href='' className='relative rounded-lg overflow-hidden'>
          <img src={props.bannerUrl}/>
          <div className='w-full pt-16 mb-4 px-4 bg-game-gradient absolute'>
            <strong className='font-bold text-white block'>{props.title}</strong>
            <span className='text-zinc-300 text-sm block'>{props.adsCount} anuncios</span>
          </div>
        </a> 
    )
}