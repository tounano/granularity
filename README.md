# granularity

Timebuckets for dates.

Group date/timestamps/other date objects into timebuckets.

## Usage:

### var bucket = Granularity(duration, ?origin)

 Creates a timebucket.

 **Args:**

 *  `duration` - The width of the timebucket (ms). 3600000 means 1 hour.
 *  `origin` - (Date|timestamp|iso date). A mask for the time bucket. Accepts Date object or any other string that is
  accepted by Date(). Default is `new Date(0)`;

### bucket(date) || bucket.floor(date)

Returns a new Date object that represents the timebucket. The time bucket is floored.

`date` should be whether a Date object, or any string that is acceptable by Date's constructor.

### bucket.ceil(date)

Same as above, just ceils the timebucket.

## Example

```js

var Granularity = require('granularity');

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
```

## install

With [npm](https://npmjs.org) do:

```
npm install granularity
```

## license

MIT