module.exports = Granularity;

function Granularity(duration, origin) {
  if (typeof origin == 'undefined')
    return Granularity(duration, new Date());

  if (duration === 0)
    return Granularity(new Date(origin).getTime(), 0)
  else if (!duration)
    return Granularity(1, origin);
  else if (duration < 0)
    return Granularity(Math.abs(duration), new Date(origin).getTime() + duration);

  return extend(new Date(origin),{
    _duration: duration,
    start: function () {return new Date(this);},
    end: function () {return new Date(this.getTime() + duration -1)},
    skip: function (interval) {
      interval = interval || 1;
      return new Granularity(this._duration, this.getTime() + interval * this._duration)
    },
    next: function (interval) {return this.skip(interval)},
    previous: function (interval) {interval = interval || 1; return this.skip(0-interval)},
    diff: Granularity.diff,
    _math: function (fn, date) {
      date = typeof date !== 'undefined' && new Date(date) || new Date();
      return Granularity(this._duration, this.getTime() + this._duration * fn(this.diff(date, this)/this._duration));
    },
    floor: function (date) {return this._math(Math.floor, date)},
    ceil: function (date) {return this._math(Math.ceil, date)},
    serialize: function () {return this._duration + '~' + this.getTime() % this._duration},
    unserialize: function (str) { return Granularity.unserialize(str, this)}
  })
}

Granularity.unserialize = function (str, origin) {
  var args = str.split('~');
  return Granularity(parseInt(args[0]), parseInt(args[1])).floor(origin);
};
Granularity.diff = function (left, right) {return (new Date(left).getTime() - new Date(right).getTime());};
Granularity.today = function () {return (Granularity(1000*3600*24, 0).floor());}


function extend(left, right) {
  for (var key in right) {
    left[key] = right[key]
  }

  return left;
}