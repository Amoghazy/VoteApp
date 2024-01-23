import Joi from "joi";

export const userSchema = Joi.object({
  username: Joi.string().min(3).max(30).required(),

  password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")).required(),

  // repeat_password: Joi.ref("password"),

  email: Joi.string().email().required(),
});
