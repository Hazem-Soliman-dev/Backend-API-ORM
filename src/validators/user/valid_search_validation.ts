import { check, ValidationChain } from "express-validator";

export const valid_search_validation = (): ValidationChain[] => {
  return [
    check("name")
      .exists()
      .withMessage("Name parameter is required")
      .isString()
      .withMessage("Name must be a string")
      .notEmpty()
      .withMessage("Name cannot be empty")
      .isLength({ min: 3, max: 255 })
      .withMessage("Name must be between 3 and 255 characters"),
  ];
};
