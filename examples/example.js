
var Granularity = require('../');

var everyTwoHourBucket = Granularity(7200000);

console.log('Every Two Hour Bucket');

console.log(everyTwoHourBucket('2014-08-08T12:35:00Z').toISOString())
console.log(everyTwoHourBucket('2014-08-08T13:35:00Z').toISOString())
console.log(everyTwoHourBucket('2014-08-08T14:35:00Z').toISOString())

var everyHourOnTheHalf = Granularity(3600000, '2014-08-07T00:30:00Z')

console.log('\nEvery hour on the half-hour')

console.log(everyHourOnTheHalf('2014-08-08T12:35:00Z').toISOString())
console.log(everyHourOnTheHalf('2014-08-08T13:15:00Z').toISOString())
console.log(everyHourOnTheHalf('2014-08-08T14:35:00Z').toISOString())

console.log('\nFloor and Ceil');

console.log(everyTwoHourBucket.floor('2014-08-08T13:35:00Z').toISOString())
console.log(everyTwoHourBucket.ceil('2014-08-08T13:35:00Z').toISOString())