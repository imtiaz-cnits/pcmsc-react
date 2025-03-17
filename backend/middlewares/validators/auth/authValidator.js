// 🔗 External imports
const { check } = require("express-validator");

// 🛠️ User Signup Validation Logic

const signupValidator = [
  check("name")
    .notEmpty()
    .withMessage("Name is required")
    .isString()
    .withMessage("Name should be a String")
    .trim()
    .isLength({ min: 4 })
    .withMessage("Name must be at least 4 characters long")
    .isLength({ max: 31 })
    .withMessage("Name must not exceed 31 characters")
    .matches(/^[a-zA-Z\s]+$/)
    .withMessage("Name should only contain alphabets and spaces"),

  check("username")
    .notEmpty()
    .withMessage("Username is required")
    .isString()
    .trim()
    .isLength({ min: 6, max: 30 })
    .withMessage(
      "Sorry, your username must be between 6 and 30 characters long.",
    )
    .matches(
      /^(?![0-9]+$)[a-zA-Z0-9_](?:[a-zA-Z0-9_]*(?:\.[a-zA-Z0-9_]+)?){0,28}$/,
    ) // Only letters, numbers, and periods are allowed
    .withMessage(
      "Sorry,only letters(a-z), numbers(0-9), and periods(.)are allowed.",
    )
    .not()
    .contains(" ")
    .withMessage("Username should not contain spaces.")
    .custom((value) => {
      if (
        value.startsWith(".") ||
        value.endsWith(".") ||
        value.includes("..")
      ) {
        throw new Error(
          "Username cannot start or end with a period, and cannot contain consecutive periods.",
        );
      }

      if (value.length >= 8 && !/[a-zA-Z]/.test(value)) {
        throw new Error(
          "Sorry, username with 8 or more characters must include at least one alphabetical character (a-z).",
        );
      }

      return true;
    }),

  check("email")
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Invalid email format")
    .normalizeEmail(),

  check("mobile")
    .notEmpty()
    .withMessage("Phone Number is required")
    .matches(/^(?:\+88)?(013|014|015|016|017|018|019)\d{8}$/)
    .withMessage("Invalid Phone number"),

  check("password")
    .notEmpty()
    .withMessage("Password is required.")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
    )
    .withMessage(
      "Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one digit, and one special character (@, $, !, %, *, ?, &).",
    )
    .custom((value) => {
      const weakpasswordRegex = /^(?=[a-zA-Z0-9]*$).{6,}$/;
      if (weakpasswordRegex.test(value)) {
        throw new Error("Password is too weak. Try using a mix of characters.");
      }
      return true;
    }),

  check("avatar").optional().isURL().withMessage("Invalid image URL format"),

  check("status")
    .optional()
    .isIn(["active", "inactive"])
    .withMessage("Status must be either active or inactive"),

  check("role")
    .optional()
    .isIn(["user", "admin"])
    .withMessage("Role must be either user or admin"),

  check("OTP").optional().isString().withMessage("OTP should be a string"),
];

const loginValidator = [
  check("userIdentifier")
    .notEmpty()
    .withMessage("Enter an email or phone number")
    .trim(),

  check("password").notEmpty().withMessage("Enter a password"),
];

// 🚀 Export Model for External Usage
module.exports = { signupValidator, loginValidator };
