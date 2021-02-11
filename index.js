// Your code here
function createEmployeeRecord(arr) {
    return {
        firstName: arr[0],
        familyName: arr[1],
        title: arr[2],
        payPerHour: arr[3],
        timeInEvents: [],
        timeOutEvents: []
    }
}

function createEmployeeRecords(arr) {
    return arr.map(function(emp) {
        return createEmployeeRecord(emp)
    })
}

function createTimeInEvent(emp, timeStamp) {
    let [date, time] = timeStamp.split(' ')
        emp.timeInEvents.push({
            type: "TimeIn",
            hour: parseInt(time, 10),
            date  
        })
        return emp
}

function createTimeOutEvent(emp, timeStamp) {
    let [date, time] = timeStamp.split(' ')
        emp.timeOutEvents.push({
            type: "TimeOut",
            hour: parseInt(time, 10),
            date  
        })
        return emp
}

function hoursWorkedOnDate(emp, search) {
    let timeIn = emp.timeInEvents.find(function(e){
        return e.date === search
    })
    let timeOut = emp.timeOutEvents.find(function(e){
        return e.date === search
    })
    return (timeOut.hour - timeIn.hour) / 100
}

function wagesEarnedOnDate(emp, search) {
    let wages = hoursWorkedOnDate(emp, search) * emp.payPerHour
    return parseFloat(wages.toString())
}

function allWagesFor(emp) {
    let dates = emp.timeInEvents.map(function(e){
        return e.date
    })
    let wage = dates.reduce(function(memo, d){
        return memo + wagesEarnedOnDate(emp, d)
    }, 0)
    return wage
}

function findEmployeeByFirstName(arr, name) {
    return arr.find(function(records){
        return records.firstName === name
    })
}

function calculatePayroll(arr) {
    return arr.reduce(function(memo, records){
        return memo + allWagesFor(records)
    }, 0)
}