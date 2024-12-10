import { betterAuth,BetterAuthOptions } from "better-auth";
import {prismaAdapter} from 'better-auth/adapters/prisma'
import prisma from "./lib/prisma";
import { sendEmail } from "./actions/SendEmail";
import {openAPI} from "better-auth/plugins"

export const auth = betterAuth({
    database:prismaAdapter(prisma,{ 
        provider:"mongodb"
    }),
    socialProviders:{
        github:{
            clientId:process.env.GITHUB_CLIENT_ID as string,
            clientSecret:process.env.GITHUB_CLIENT_SECRET as string
        },
        google:{
            clientId:process.env.GOOGLE_CLIENT_ID as string,
            clientSecret:process.env.GOOGLE_CLIENT_SECRET as string
        }
    },
    plugins:[openAPI()], //api/auth/reference
    emailAndPassword: { 
        enabled: true,
        //we can enable email verification by setting this to true
        requireEmailVerification:true,
        //we define how we send the password reset link
        sendResetPassword: async ({user, url, token}, request) => {
            await sendEmail({
                to: user.email,
                subject: "Reset your password",
                text: `Click the link to reset your password: ${url}`,
            });
        }
    },
    emailVerification:{
        //email verification to be sent on signup
        sendOnSignUp:true,
        //when the user is verified access is granted outomatically
        autoSignInAfterVerification:true,
        sendVerificationEmail:async({user,token})=>{
            //this is the verification url that will be sent upon sign up
            //it will contain the token
            //it will contain the callback url if the email is verified
                const verificationUrl = `${process.env.BETTER_AUTH_URL}/api/auth/verify-email?token=${token}&callbackURL=${process.env.EMAIL_VERIFICATION_CALLBACK_URL}`;
                await sendEmail({
                    to:user.email,
                    subject:"Verify your email address",
                    text:`Click the link to verify your email:${verificationUrl}`
                })
    
        }
    } 
}satisfies BetterAuthOptions)
export type Session = typeof auth.$Infer.Session;