import { check, body } from "express-validator";

export const update_user_validation = () => {
  return [
    body().custom((body) => {
      const updates = ["name", "email", "password"];
      const hasAtLeastOneField = updates.some((field) => body[field]);
      if (!hasAtLeastOneField) {
        throw new Error(
          "At least one field (name, email, or password) must be provided"
        );
      }
      return true;
    }),

    check("name")
      .optional()
      .isString()
      .notEmpty()
      .withMessage("Name is required")
      .isLength({ min: 3, max: 255 })
      .withMessage("Name must be between 3 and 255 characters"),

    check("email")
      .optional()
      .isString()
      .notEmpty()
      .withMessage("Email is required")
      .isEmail()
      .withMessage("Email must be valid"),

    check("password")
      .optional()
      .isString()
      .notEmpty()
      .withMessage("Password is required")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters long"),
  ];
};
