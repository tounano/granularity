
module.exports = function (duration, origin) {
  if (!origin)
    origin = new Date(0);
  else if (!(origin instanceof Date))
    origin = new Date(origin)

  function Granularity(date) { return ensureDate(_floor)(date); }
  Granularity.floor = ensureDate(_floor);
  Granularity.ceil = ensureDate(_ceil);

  return Granularity;

  function delta(left, right) { return left.getTime()-right.getTime() }

  function ensureDate(fn) {
    return function(date) {
      if (!(date instanceof Date))
        date = new Date(date);

      return fn(date);
    }
  }

  function _floor(date) { return new Date(origin.getTime() + duration * Math.floor(delta(date, origin)/duration)); }
  function _ceil(date) { return new Date(origin.getTime() + duration * Math.ceil(delta(date, origin)/duration)); }
}