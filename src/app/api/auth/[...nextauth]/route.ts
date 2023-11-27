import NextAuth, {
    Account,
    AuthOptions,
    Profile,
    Session,
    User,
} from "next-auth";
import Credentials from "next-auth/providers/credentials";

import { AxiosError } from "axios";
import BaseConstant from "@/constants/BaseConstant";
import { JWT } from "next-auth/jwt";
import AuthApi from "@/app/(auth)/login/services/AuthApi";
import Cookies from "js-cookie";
// import AuthApi from "@/app/(auth)/auth/login/services/AuthApi";
// import { Account } from '@/types/next-auth';
export const authConfig: AuthOptions = {
    providers: [
        Credentials({
            id: "credentials",
            name: "Credentials",
            credentials: {
                email: {
                    label: "Email",
                    type: "text",
                },
                password: {
                    label: "Password",
                    type: "text",
                },
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) {
                    throw new Error("Email and password required");
                }
                try {
                    console.log({ credentials });
                    const res = await AuthApi.login({
                        email: credentials.email,
                        password: credentials.password,
                    });
                    if (res.success) {
                        console.log(res?.data?.access_token);
                        const user = {
                            id: res?.data?.access_token,
                            email: credentials.email,
                        };
                        return user;
                    } else {
                        throw new Error(res?.errors?.message || "Error");
                    }
                } catch (error) {
                    const err = error as AxiosError<any>;
                    console.log("error", JSON.stringify(error));
                    throw new Error(err?.message || "Error");
                }
            },
        }),
    ],
    pages: {
        signIn: "/auth/login",
    },
    // debug: process.env.NODE_ENV === "development",
    callbacks: {
        signIn: async ({ account, profile }: any) => {
            console.log("signIn", { account, profile });
            // if (account?.provider === 'google' && profile?.email_verified) {
            //   //if login with gg register iAgree

            //   const authService = new AuthServices();
            //   const res = await authService.register({
            //     name: profile?.name || '',
            //     email: profile?.email || '',
            //     password: account?.id_token || '',
            //   });
            // }
            return true;
        },
        jwt: async ({ token, user, account, profile }: any) => {
            if (account?.provider === "credentials") {
                console.log("jwt", { token, user, account, profile });
                if (user) {
                    return {
                        ...token,
                        jwt: user.id,
                    };
                }
            }
            return token;
        },
        session: async ({ session, token }: any) => {
            if (token) {
                session.jwt = token.jwt;
            }
            return session;
        },
    },
    secret: BaseConstant.AUTH_SECRET,
};
const handler = NextAuth(authConfig);
export { handler as GET, handler as POST };

// {
//   providers: [
//     Credentials({
//       id: 'credentials',
//       name: 'Credentials',
//       credentials: {
//         email: {
//           label: 'Email',
//           type: 'text',
//         },
//         password: {
//           label: 'Password',
//           type: 'password',
//         },
//       },
//       async authorize(credentials) {
//         if (!credentials?.email || !credentials?.password) {
//           throw new Error('Email and password required');
//         }
//         try {
//         //   const authService = new AuthServices();
//         //   const res = await authService.login(credentials);

//         //   const user = { id: res.accessToken, email: credentials.email };
//         // await new Promise(() => {
//         //     setTimeout(() => {}, 1000)
//         // })
//         console.log('login')
//         const user = {id: 'eyasdadad', email: 'a@gmail.com', profile: {a: 1, b: 2, c:3}}
//           return user;
//         } catch (error) {
//           const err = error as AxiosError<any>;
//           throw new Error(err?.response?.data?.message);
//         }
//       },
//     }),
//   ],
//   pages: {
//     // signIn: '/auth/login',
//   },
//   debug: process.env.NODE_ENV === 'development',
//   callbacks: {
//     async signIn({ account, profile }) {
//       console.log({account, profile})
//       // if (account?.provider === 'google' && profile?.email_verified) {
//       //   //if login with gg register iAgree

//       //   const authService = new AuthServices();
//       //   const res = await authService.register({
//       //     name: profile?.name || '',
//       //     email: profile?.email || '',
//       //     password: account?.id_token || '',
//       //   });
//       // }
//       return true;
//     },
//     jwt: async ({ token, user, account, profile }) => {
//       console.log({ token, user, account, profile })
//       if (account?.provider === 'credentials') {
//         if (user) {
//           return {
//             ...token,
//             jwt: user.id,
//           };
//         }
//       }
//       return token;
//     },
//     session: async ({ session, token }) => {
//       if (token) {
//         //@ts-ignore
//         session.jwt = token.jwt;
//       }
//       return session;
//     },
//   },
//   secret: BaseConstant.AUTH_SECRET,
// }
