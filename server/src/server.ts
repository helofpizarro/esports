import express from 'express'
import cors from 'cors'
import {PrismaClient} from '@prisma/client'
import { convertHourToMinute } from './utils/convert-hour-to-minute'
import { convertHourToString } from './utils/convert-hour-to-string'

const app = express()
 
app.use(express.json)
app.use(cors())

const prisma = new PrismaClient({
    log: [ 'query']
})

app.get('/games', async (request, response) =>{
    const games = await prisma.game.findMany({
        include: {
            _count: {
               select: {
                    ads: true
               }     
            }
        }
    }) 

    return response.json(games)    
})


app.get('/ads', (request, response) =>{
    return response.status(201).json([])    
})

app.get('/games/:id/ads',async (request, response) => {
    const gameId = request.params.id
    const body = request.body



    const ad = await prisma.ad.create({
        data: {
            gameId,
            name: body.name,
            yearsPalying: body.yearsPalying,
            discord: body.discord,
            weekDays: body.weekDays.join(','),
            hourStart: convertHourToMinute(body.hourStart),
            hourEnd: convertHourToMinute(body.hourEnd),
            useVoiceChannel: body.useVoiceChannel
        }
    })

    return response.status(201).json(ad)    
})

app.get('/games/:id/ads', async (request, response) =>{
      const gameId = request.params.id
      
      const ads = await prisma.ad.findMany({
        select: {
           id: true,
           name: true,
           weekDays: true,
           useVoiceChannel: true,
           yearsPalying: true,
           hourStart: true,
           hourEnd: true, 
        },
        where: {
            gameId, 
        },
        orderBy: {
            createdAt: 'desc'
        }
    })      
    return response.json(ads.map(ad => {
        return {
            ...ad,
            weekDays: ad.weekDays.split(','),
            hourStart: convertHourToString(ad.hourStart),
            hourEnd: convertHourToString(ad.hourEnd),
        }
    }))
})

app.get('/ads/:id/discord', async (request, response) =>{
        const adId = request.params.id
        
        const ad = await prisma.ad.findUniqueOrThrow({
            select: {
                discord: true,
            },
            where: {
                id: adId
            }
        })

    return response.json({
        discord: ad.discord
    })    
})

app.listen(3333)