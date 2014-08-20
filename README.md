# granularity

Timebuckets for dates.

Group date/timestamps/other date objects into timebuckets that you can traverse.

Really helpful for storing and querying dates from data bases.

## Usage:

### var bucket = Granularity(duration, ?origin)

 Creates a timebucket.

**Args:**

 *  `duration` - (Optional, Default=1ms). The width of each timebucket (ms). 3600000 means 1 hour.
  0 (Zero) means all time passed. If duration is negative, it'll start from the previous Timebucket.
 *  `origin` - (Optional, Date|timestamp|iso date, default=now). The first timebucket. Any date string that `Date`
  object can read is acceptable here.

**Return value:**

The return value is an extended Date object, which will respond to all methods that are associated with Date,
along with several additional methods.

#### Example:

```js
console.log('\nCreate a bucket for the next 24hr');
var next24 = Granularity(1000 * 3600 * 24);

console.log('\nCreate a bucket for the last 30 days')
var last30Days = Granularity(0 - 1000 * 3600 * 24 * 30); // Note the duration is negative

console.log('\nCreate a bucket for all time possible');
var allTime = Granularity(0);

console.log('\nEvery Two Hour Bucket');
var everyTwoHourBucket = Granularity(7200000, '2014-08-19T00:00:00.000Z'); // Origins at today

console.log('\nEvery hour on the half-hour')
var everyHourOnTheHalf = Granularity(3600000, '2014-08-07T00:30:00Z') // Origins at 2014-08-07T00:30:00Z
```

### bucket.start()

Returns the Date() of the bucket itself.

#### Example

```js
console.log('\nCreate a bucket for the last 30 days')
var last30Days = Granularity(0 - 1000 * 3600 * 24 * 30); // Note the duration is negative
console.log(last30Days.start().toISOString()) // Should be 30 days ago
```

### bucket.end()

Returns a Date() that indicates when the bucket should end. Basically it's the next bucket minus 1 ms.

#### Example

```js
console.log('\nCreate a bucket for the last 30 days')
var last30Days = Granularity(0 - 1000 * 3600 * 24 * 30); // Note the duration is negative
console.log(last30Days.start().toISOString()) // Should be 30 days ago
console.log(last30Days.end().toISOString()) // Should be now - 1 ms
```
### bucket.skip(?interval=1) || bucket.next(?interval=1)

Skips `interval` timebuckets forward, or backwards (in case `interval` is negative).

#### Example

```js
console.log('\nSkip to the next Timebucket');
// 2014-08-20T02:00:00.000Z
console.log(everyTwoHourBucket.skip().toISOString());
console.log(everyTwoHourBucket.next().toISOString());

console.log('\nSkip to the Timebucket after the next one');
// 2014-08-20T04:00:00.000Z
console.log(everyTwoHourBucket.skip(2).toISOString());
console.log(everyTwoHourBucket.next(2).toISOString());
```

### bucket.previous(?interval=1)

Same as `bucket.skip`, just as negative value, or in other words: `bucket.skip(-1)===bucket.previous(1)`.

#### Example

```js
console.log('\nSkip to the previous Timebucket');
// 2014-08-19T22:00:00.000Z
console.log(everyTwoHourBucket.skip(-1).toISOString());
console.log(everyTwoHourBucket.previous().toISOString());

console.log('\nSkip to the Timebucket before the previous one');
// 2014-08-19T20:00:00.000Z
console.log(everyTwoHourBucket.skip(-2).toISOString());
console.log(everyTwoHourBucket.previous(2).toISOString());
```

### bucket.floor(?date=now)

Create a new Timebucket that contains `date`.

`date` - Whether Date object or any type of string that is readable by Date object. Default is now.

#### Example

```js
console.log('\nEvery Two Hour Bucket');
var everyTwoHourBucket = Granularity(7200000, today.toISOString()); // Origins at today
console.log(everyTwoHourBucket.floor('2014-08-08T12:35:00Z').toISOString()) // 2014-08-08T12:00:00.000Z
console.log(everyTwoHourBucket.floor('2014-08-08T13:35:00Z').toISOString()) // 2014-08-08T12:00:00.000Z
console.log(everyTwoHourBucket.floor('2014-08-08T14:35:00Z').toISOString()) // 2014-08-08T14:00:00.000Z

console.log('\nEvery hour on the half-hour')
var everyHourOnTheHalf = Granularity(3600000, '2014-08-07T00:30:00Z') // Origins at 2014-08-07T00:30:00Z

console.log(everyHourOnTheHalf.floor('2014-08-08T12:35:00Z').toISOString()) // 2014-08-08T12:30:00.000Z
console.log(everyHourOnTheHalf.floor('2014-08-08T13:15:00Z').toISOString()) // 2014-08-08T12:30:00.000Z
console.log(everyHourOnTheHalf.floor('2014-08-08T14:35:00Z').toISOString()) // 2014-08-08T14:30:00.000Z
```

### bucket.ceil(?date=now)

Similar to `bucket.floor`, with one difference. It creates a Timebucket after `bucket.floor`.
An alternative way of achieving this, would be: `bucket.floor(date).next()`

#### Example

```js
console.log('\nFloor and Ceil');

console.log(everyTwoHourBucket.floor('2014-08-08T13:35:00Z').toISOString()) // 2014-08-08T12:00:00.000Z
console.log(everyTwoHourBucket.ceil('2014-08-08T13:35:00Z').toISOString()) // 2014-08-08T14:00:00.000Z
```

### bucket.serialize()

Serializes the timebucket into a string.

#### Example

```js
console.log('\nSerialize a Timebucket');
// 7200000~0
console.log(everyTwoHourBucket.serialize());
```

### bucket.unserialize(str)

Unserializes a Timebucket string, by using the origin of the current Timebucket.

#### Example

```js
console.log('\nUnserialize a Timebucket that origins form another Timebucket');
// 2014-08-19T00:00:00.000Z
console.log(everyTwoHourBucket.unserialize('7200000~0').start().toISOString());
```

### Granularity.unserialize(str, ?origin=now)

Unserializes a Timebucket string, by using an origin of your choice.

`origin` - (Default=now). Whether Date object or any Date string that is acceptable by Date object.

#### Example

```js
console.log('\nUnserialize a Timebucket that origins at the current date');
// 2014-08-20T00:00:00.000Z
console.log(Granularity.unserialize('7200000~0').start().toISOString());

console.log('\nUnserialize a Timebucket that origins at 0 epoch time');
// 1970-01-01T00:00:00.000Z
console.log(Granularity.unserialize('7200000~0', 0).start().toISOString());
```

### Granularity.today()

Creates a daily Timebucket, that starts from today.

#### Example

```js
console.log('Today:')
var today = Granularity.today();
console.log(today.toISOString());
```

## Complete Example

```js
var Granularity = require('granularity');

console.log('Today:')
var today = Granularity.today();
console.log(today.toISOString());

console.log('\nCreate a bucket for the next 24hr');
var next24 = Granularity(1000 * 3600 * 24);
console.log(next24.start().toISOString()); // Should be now
console.log(next24.end().toISOString()); // Should be tomorrow - 1 ms

console.log('\nCreate a bucket for the last 30 days')
var last30Days = Granularity(0 - 1000 * 3600 * 24 * 30); // Note the duration is negative
console.log(last30Days.start().toISOString()) // Should be 30 days ago
console.log(last30Days.end().toISOString()) // Should be now - 1 ms

console.log('\nCreate a bucket for the previous 30 day period');
console.log(last30Days.previous().start().toISOString()) // Should be 60 days ago
console.log(last30Days.previous().end().toISOString()) // Should be 30 days ago - 1 ms

console.log('\nCreate a bucket for all time possible');
var allTime = Granularity(0);
console.log(allTime.start().toISOString()) // Should be 0 in Epoch time
console.log(allTime.end().toISOString()) // Should now - 1 ms

console.log('\nEvery Two Hour Bucket');
var everyTwoHourBucket = Granularity(7200000, today.toISOString()); // Origins at today
console.log(everyTwoHourBucket.floor('2014-08-08T12:35:00Z').toISOString()) // 2014-08-08T12:00:00.000Z
console.log(everyTwoHourBucket.floor('2014-08-08T13:35:00Z').toISOString()) // 2014-08-08T12:00:00.000Z
console.log(everyTwoHourBucket.floor('2014-08-08T14:35:00Z').toISOString()) // 2014-08-08T14:00:00.000Z

console.log('\nEvery hour on the half-hour')
var everyHourOnTheHalf = Granularity(3600000, '2014-08-07T00:30:00Z') // Origins at 2014-08-07T00:30:00Z

console.log(everyHourOnTheHalf.floor('2014-08-08T12:35:00Z').toISOString()) // 2014-08-08T12:30:00.000Z
console.log(everyHourOnTheHalf.floor('2014-08-08T13:15:00Z').toISOString()) // 2014-08-08T12:30:00.000Z
console.log(everyHourOnTheHalf.floor('2014-08-08T14:35:00Z').toISOString()) // 2014-08-08T14:30:00.000Z

console.log('\nFloor and Ceil');

console.log(everyTwoHourBucket.floor('2014-08-08T13:35:00Z').toISOString()) // 2014-08-08T12:00:00.000Z
console.log(everyTwoHourBucket.ceil('2014-08-08T13:35:00Z').toISOString()) // 2014-08-08T14:00:00.000Z

console.log('\nStart of the Timebucket');
// Let's recreate the every to hour bucket for a fixed date
everyTwoHourBucket = Granularity(1000 * 3600 * 2, '2014-08-19T00:00:00.000Z');
// 2014-08-20T00:00:00.000Z
console.log(everyTwoHourBucket.start().toISOString());

console.log('\nEnd of the Timebucket');
// 2014-08-20T01:59:59.999Z
console.log(everyTwoHourBucket.end().toISOString());

console.log('\nSkip to the next Timebucket');
// 2014-08-20T02:00:00.000Z
console.log(everyTwoHourBucket.skip().toISOString());
console.log(everyTwoHourBucket.next().toISOString());

console.log('\nSkip to the Timebucket after the next one');
// 2014-08-20T04:00:00.000Z
console.log(everyTwoHourBucket.skip(2).toISOString());
console.log(everyTwoHourBucket.next(2).toISOString());

console.log('\nSkip to the previous Timebucket');
// 2014-08-19T22:00:00.000Z
console.log(everyTwoHourBucket.skip(-1).toISOString());
console.log(everyTwoHourBucket.previous().toISOString());

console.log('\nSkip to the Timebucket before the previous one');
// 2014-08-19T20:00:00.000Z
console.log(everyTwoHourBucket.skip(-2).toISOString());
console.log(everyTwoHourBucket.previous(2).toISOString());

console.log('\nMS diff between two dates');
// -3600
console.log(everyTwoHourBucket.diff(new Date(), new Date().getTime()+3600));
console.log(Granularity.diff(new Date(), new Date().getTime()+3600));

console.log('\nSerialize a Timebucket');
// 7200000~0
console.log(everyTwoHourBucket.serialize());

console.log('\nUnserialize a Timebucket that origins at the current date');
// 2014-08-20T00:00:00.000Z
console.log(Granularity.unserialize('7200000~0').start().toISOString());

console.log('\nUnserialize a Timebucket that origins at 0 epoch time');
// 1970-01-01T00:00:00.000Z
console.log(Granularity.unserialize('7200000~0', 0).start().toISOString());

console.log('\nUnserialize a Timebucket that origins form another Timebucket');
// 2014-08-19T00:00:00.000Z
console.log(everyTwoHourBucket.unserialize('7200000~0').start().toISOString());
```

## install

With [npm](https://npmjs.org) do:

```
npm install granularity
```

## license

MIT