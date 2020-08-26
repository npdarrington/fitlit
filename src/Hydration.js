class Hydration {
    constructor(HydrationData){
        this.HydrationData = HydrationData
    }
    returnAverergeUserFluidOuncesConsumedAllTime(UserId){
        let singleUserData = this.HydrationData.filter(user => { 
            return user.userID === UserId})
        let totalOuncesDrank = singleUserData.reduce((startingValue,user)=>{
                return  startingValue += user.numOunces
        },0)
        return totalOuncesDrank / singleUserData.length
    }
    returnFluidOuncesForSpecificDay(userId,date){
    let singleUserData = this.HydrationData.filter(user => { 
            return user.userID === userId
        })
    return singleUserData.find(user => {
        return user.date === date}).numOunces

}

returnUserWeeklyFluidConsumption(UserId,startDate){
    let singleUserData = this.HydrationData.filter(user => { 
        return user.userID === UserId
    })
   var startDateObject =  singleUserData.find(user => user.date === startDate )
   let indexOfstartDateObject = singleUserData.indexOf(startDateObject)
   var UsernumOunces = singleUserData.map(user =>{
       var dataAndNumOfOuncesDrank = {}
       dataAndNumOfOuncesDrank.date  = user.date 
       dataAndNumOfOuncesDrank.numOunces =  user.numOunces
             return dataAndNumOfOuncesDrank
   })

   return UsernumOunces.splice(indexOfstartDateObject,7)

}
}

module.exports = Hydration