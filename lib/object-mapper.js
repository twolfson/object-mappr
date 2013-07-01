// Set up ObjectMapper constructor
function ObjectMapper(options) {
  // Save options for later
  // TODO: Move to connect style where we will have multiple middlewares for value resolution
  // TODO: Then, the flatten etc options will be pre-made middlewares
  this.options = options;
}
ObjectMapper.prototype = {
  map: function (input) {
    return input;
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