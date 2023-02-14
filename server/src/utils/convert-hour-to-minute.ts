

export function convertHourToMinute(hourString: string){
    const [hour, minute] = hourString.split(':').map(Number)

    const minuteAmount = (hour * 60) + minute

    return minuteAmount
}