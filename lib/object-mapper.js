// Set up ObjectMapper constructor
function ObjectMapper(options) {
  // Generate an array of middlewares
  // TODO: Allow for passing in of middlewares
  this.middlewares = middlewares;

  // Save options for later
  this.options = options;

  // If there is an alias, map, or flatten option, add their respective middlewares
  if (options.alias) { this.use(ObjectMapper.aliasMiddleware); }
  if (options.map) { this.use(ObjectMapper.mapMiddleware); }
  if (options.flatten) { this.use(ObjectMapper.flattenMiddleware); }
}
ObjectMapper.prototype = {
  // Helper fn to add new middlewares
  use: function (fn) {
    this.middlewares.push(fn);
  },
  map: function (input) {
    // Prepare our return value and save this for later
    var retObj = {},
        that = this;

    // Iterate over the input
    Object.getOwnPropertyNames(input).forEach(function lookupItem (key) {
      // Lookup the keys value
      var val = input[key];

      // If the value is an object
      if (
    });

    // Return the mapped result
    return retObj;
  }
};

// Set up sugar function
function objectMapper(input, options) {
  // Create a mapper
  var mapper = new ObjectMapper(options);

  // Map over and return our input
  return mapper.map(input);
}

// Expose constructor on sugar
objectMapper.ObjectMapper = ObjectMapper;

// Export our sugar function
module.exports = objectMapper;