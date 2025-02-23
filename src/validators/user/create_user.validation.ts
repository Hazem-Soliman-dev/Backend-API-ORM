import { check } from "express-validator";

export const create_user_validation = () => {
  return [
    check("name")
      .isString()
      .notEmpty()
      .withMessage("Name is required")
      .isLength({ min: 3, max: 255 })
      .withMessage("Name must be between 3 and 255 characters"),
    check("email")
      .isEmail()
      .notEmpty()
      .withMessage("Email is required")
      .isLength({ min: 8, max: 255 })
      .withMessage("Email must be valid and between 8 and 255 characters"),
    check("password")
      .isString()
      .notEmpty()
      .withMessage("Password is required")
      .isLength({ min: 8, max: 255 })
      .withMessage("Password must be between 8 and 255 characters"),
    check("avatar").custom((value, { req }) => {
      if (!req.file) return true; // Allow no file
      const allowedTypes = ["image/jpeg", "image/png", "image/gif"];
      if (!allowedTypes.includes(req.file.mimetype)) {
        throw new Error("Invalid file type");
      }
      return true;
    }),
  ];
};
