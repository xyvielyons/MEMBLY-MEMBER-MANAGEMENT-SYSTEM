import { z,object,string } from "zod"
 
const getEmailSchema = ()=>(
  string({required_error:"Email is required"}).min(1,"Email is required").email("Invalid email")
)
const getNameSchema = () => (
  string({required_error:"Name is required"}).min(1,"Name is required").max(50,"Name must be less than 50 characters")
)
const getPasswordSchema = (type:"password" | "confirmPassword" | "newPassword" | "currentPassword") => (
  string ({required_error:`${type} is required`})
  .min(8,`${type} must be atleast 8 characters`)
  .max(32,`${type} can not exceed 32 characters`)
)
export const signUpSchema = z.object({
  name:getNameSchema(),
  email:getEmailSchema(),
  password:getPasswordSchema("password"),
  confirmPassword:getPasswordSchema("confirmPassword")

}).refine((data)=>data.password === data.confirmPassword,{
  message:"passwords dont match",
  //pinpoints where the error should be shown
  path:["confirmPassword"]
})

export const signInSchema = z.object({
  email:getEmailSchema(),
  password:getPasswordSchema("password")
})

export const forgotPasswordSchema = z.object({
  email:getEmailSchema()
})
export const resetPasswordSchema = z.object({
  newPassword:getPasswordSchema("password"),
  confirmPassword:getPasswordSchema("confirmPassword")
}).refine((data)=>data.confirmPassword === data.newPassword,{
  message:"passwords dont match",
  path:["confirmPassword"]
})
export const changePasswordSchema = z.object({
  currentPassword:getPasswordSchema("currentPassword"),
  newPassword:getPasswordSchema("newPassword")
})

export const ChangeNameSchema = z.object({
  name:getNameSchema()
})
export const ChangeEmailSchema = z.object({
  email:getEmailSchema()
})
export const ImageUploaderSchema = z.object({
  url:z.string()
})