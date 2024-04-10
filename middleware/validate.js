/* global module */

const validator = require('../helpers/validate');

// Function to validate data
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

const saveOils = (req, res, next) => {
  const validationRule = {
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

const saveData = (req, res, next) => {
// Define common validation rules for all save functions
const commonValidationRules = {
  Id: 'required|string',
  Category: 'required|string',
  IsClearance: 'required|boolean',
  IsNew: 'required|boolean',
  Url: 'required|string',
  Reviews: 'required|object',
  NameWithoutBrand: 'required|string',
  Name: 'required|string',
  IsFamousBrand: 'required|boolean',
  Images: 'required|object',
  SizesAvailable: 'required|object',
  Colors: 'required|array',
  DescriptionHtmlSimple: 'required|string',
  SuggestedRetailPrice: 'required|number',
  Brand: 'required|object',
  ListPrice: 'required|number',
  FinalPrice: 'required|number'
};
  validateData(req, res, next, commonValidationRules);
};


module.exports = {
  saveData,
  saveOils
};
