/**
* Bracket.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {

    toJSON: function() {
      var data = _.omit(this, 
        "service", 
        "createdAt", 
        "updatedAt", 
        "id")

      return data
    }

  },

  

};

