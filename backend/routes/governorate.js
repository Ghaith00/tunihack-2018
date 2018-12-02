const express = require('express');
const router = express.Router();
const path = require('path');

const data = require(path.join(__dirname, '../../db/_sample-data'))


// GET municipality by governorate by name
router.get('/:g_name/municipalities/:m_name', function(req, res, next) {
  let data = getMunicipalitiesByGovernorateByName(decodeURIComponent(req.params.g_name), decodeURIComponent(req.params.m_name))
  res.json(data)
});

// GET municipalities by governorate
router.get('/:g_name/municipalities', function(req, res, next) {
  let data = getMunicipalitiesByGovernorate(decodeURIComponent(req.params.g_name))
  res.json(data)
});

// GET governorate by name
router.get('/:g_name', function(req, res, next) {
  let data = getGovernorateByName(decodeURIComponent(req.params.g_name))
  res.json(data)
});

// GET all governorates
router.get('/', function(req, res, next) {
  res.json(data);
});


function getMunicipalitiesByGovernorateByName(g_name, m_name) {
  const gov = getGovernorateByName(g_name)
  for (let mun of gov.municipalities) {
    if (mun.name === m_name) {
      return mun
    }
  }
}

function getMunicipalitiesByGovernorate(g_name) {
  const gov = getGovernorateByName(g_name)
  return gov.municipalities
}

function getGovernorateByName(g_name) {
  for (let elt of data) {
    if (elt.name === g_name) {
      return elt
    }
  }
}


module.exports = router;
