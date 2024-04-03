/* global module */

const validator = require('../helpers/validate');

const validateData = (req, res, next, validationRule) => {
  validator(req.body, validationRule, {}, (err, status) => {
    if (!status) {
      res.status(412).send({
        success: false,
        message: 'Validation failed',
        data: err
      });
    } else {
      next();
    }
  });
};


const saveOils = ( req, res, next ) => {
  const validationRule ={
    name: 'required|string',
    brand: 'required|string',
    type: 'required|string',
    description: 'required|string',
    size: 'required|string',
    price: 'required|string',
    ingredients: 'required|string',
    item_number: 'required|string',
    image: 'required|string'
  };
  validateData(req, res, next, validationRule);
};

module.exports = {
  saveOils
};
