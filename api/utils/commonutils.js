module.exports.isDateIn = function(startDate, endDate, checkDate){
    var startTimeStamp = Date.parse(startDate);
    var endTimeStamp = Date.parse(endDate);
    var checkTimeStamp = Date.parse(checkDate);
    if(isNaN(startTimeStamp) || isNaN(endTimeStamp) || isNaN(checkTimeStamp)) {
        console.error('Invalid date')
        return false;
    }
    else {
        return (new Date(checkDate) >= new Date(startDate) && new Date(checkDate) <= new Date(endDate))
    }
}