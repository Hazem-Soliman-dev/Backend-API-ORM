import { check } from "express-validator";

export const valid_id = () => {
  return check("id")
    .trim()
    .notEmpty()
    .withMessage("ID is required")
    .matches(/^\d+$/)
    .withMessage("ID must be a valid number")
    .custom((value) => {
      const num = parseInt(value);
      if (num < 1) {
        return Promise.reject("ID must be greater than 0");
      }
      return true;
    });
};
