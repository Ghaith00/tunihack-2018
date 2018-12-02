const express = require('express');
const router = express.Router();
const path = require('path');

// const data = require(path.join(__dirname, '../../db/_sample-data'))


// GET municipality projects by governorate by name
router.get('/governorates/:g_name/municipalities/:m_name', function(req, res, next) {
  let data = getMunicipalitiesByGovernorateByName(decodeURIComponent(req.params.g_name), decodeURIComponent(req.params.m_name))
  res.json(data)
});


function getMunicipalitiesByGovernorateByName(g_name, m_name) {
  const gov = getGovernorateByName(g_name)
  for (let mun of gov.municipalities) {
    if (mun.name === m_name) {
      return mun
    }
  }
}

function getGovernorateByName(g_name) {
  const data = require(path.join(__dirname, `../../db/projects/${g_name}.json`))
  // console.log(data)
  return data;
}

module.exports = router;
