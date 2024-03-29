function Err(arg) {
  var return_err = function() {
    return Err(arg);
  };

  return {
    map: return_err,
    chain: return_err,
    altchain: function(fn) {
      return fn(arg);
    },
    ap: return_err,
    cata: function(ok_path, err_path) {
      return err_path(arg);
    },

    catchmap: function(fn) {
      return Err(fn(arg));
    },
    bimap: function(fn_ok, fn_err) {
      return Err(fn_err(arg));
    },
    swap: function() {
      return Ok(arg);
    },

    is_ok: false,
    is_err: true
  };
}

function Ok(value) {
  return {
    map: function(fn) {
      return Ok(fn(value));
    },
    chain: function(fn) {
      return fn(value);
    },
    altchain: function() {
      return Ok(value);
    },
    ap: function(functor) {
      return functor.map(function _ap(fn) {
        return fn(value);
      });
    },
    cata: function(ok_path, err_path) {
      return ok_path(value);
    },

    catchmap: function() {
      return Ok(value);
    },
    bimap: function(fn_ok, fn_err) {
      return Ok(fn_ok(value));
    },
    swap: function() {
      return Err(value);
    },

    is_ok: true,
    is_err: false
  };
}

function Result(value) {
  return Ok(value);
}

Result.of = Result;
Result.Ok = Ok;
Result.Err = Err;

export { Result, Err, Ok };
