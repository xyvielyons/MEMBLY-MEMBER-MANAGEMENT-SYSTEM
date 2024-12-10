import { z,object,string } from "zod"
 
const getEmailSchema = ()=>(
  string({required_error:"Email is required"}).min(1,"Email is required").email("Invalid email")
)
const getNameSchema = () => (
  string({required_error:"Name is required"}).min(1,"Name is required").max(50,"Name must be less than 50 characters")
)
const getPasswordSchema = (type:"password" | "confirmPassword") => (
  string ({required_error:`${type} is required`})
  .min(8,`${type} must be atleast 8 characters`)
  .max(32,`${type} can not exceed 32 characters`)
)
export const signInSchema = z.object({
  name:getNameSchema(),
  email:getEmailSchema(),
  password:getPasswordSchema("password"),
  confirmPassword:getPasswordSchema("confirmPassword")

}).refine((data)=>data.password === data.confirmPassword,{
  message:"passwords dont match",
  //pinpoints where the error should be shown
  path:["confirmPassword"]
})