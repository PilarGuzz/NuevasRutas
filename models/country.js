const { Schema, model} = require('mongoose');

const CountrySchema = Schema({
    name: {
        type: String,
        required: [true, 'Name is mandatory'],
        unique: true
    },
    population: {
        type: String,
        required: [true, 'population is mandatory']
        
    },
    capital: {
        type: String,
        required: [true, 'capital is require']
    },
  

    
    
})

CountrySchema.methods.toJSON = function() {
    const { __v, _id, ...country} = this.toObject();
    country.uid = _id;
    return country;
}

module.exports = model( 'Country', CountrySchema )
