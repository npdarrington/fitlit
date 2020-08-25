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
    returnfluidOuncesForSpecificDay(userId,date){
    let singleUserData = this.HydrationData.filter(user => { 
            return user.userID === userId
        })
    return singleUserData.find(user => {  user.date === date})

}
}
module.exports = Hydration