const db = require('../models/db')
const { response, request } = require('express');
const CountryModel = require('../models/country');


const getCountries= async(req = request, res = response) =>{
    const {limit=10, skip=0} = req.query;
    const countries = await CountryModel.find().limit(Number(limit)).skip(Number(skip))
    res.json({ limit, skip, countries})
}


const  getCountry= async (req = request, res = response) => {
    const id = req.params.id
    const country = await CountryModel.find({ _id: id });
    if (country.length) {
        res.json(country);
    } else {
        res.json({ message: `El pais ${id} no existe` })
    }

}

const addCountry = async(req, res) => {

    const { name, population, capital} = req.body;
   
    const country = new CountryModel({ name, population, capital})
    await country.save();

    res.json(
        country
    )

}
const deleteCountry = async(req=request, res=response) => {
    const id = req.params.id;
    const country = await CountryModel.findByIdAndDelete(id);

    res.json(country);
}


const editCountry = async(req=request, res=response) => {
    const id = req.params.id;
 
    const { _id, ...countryBody} = req.body;
    const countryU = await CountryModel.findByIdAndUpdate(id, countryBody);
   
    res.json(countryU);
}


module.exports = { getCountries, getCountry, addCountry, deleteCountry, editCountry }