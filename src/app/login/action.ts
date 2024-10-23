"use server";

import { signIn, signOut } from "@/auth";
import { AuthError } from "next-auth";
import { cookies } from "next/headers";
import { z } from "zod";

export async function authenticate(
  _prevState: string | undefined,
  formData: FormData
) {
  try {
    const codigoEmpresa = formData.get("codigoEmpresa")?.toString() || "";
    const codigoUsuario = formData.get("codigoUsuario")?.toString() || "";
    const clave = formData.get("clave")?.toString() || "";

    /*     const parsedCredentials = z
          .object({
            codigoEmpresa: z.string().min(1).max(20),
            codigoUsuario: z.string().min(1).max(20),
            clave: z.string().min(1),
          })
          .safeParse({
            codigoEmpresa,
            codigoUsuario,
            clave,
          });
    
        if (!parsedCredentials.success) {
          return "Los valores son invalidos";
        } */

    /*     const login = (await loginUsuario(
          codigoEmpresa,
          codigoUsuario,
          clave
        )) as ResponseAPI;
     */
    /*     const cookieStore = cookies();
        cookieStore.set("codigoUsuario", codigoUsuario);
        cookieStore.set("session", login.data.datos); */

    //formData.set("token", login.data.datos);
    console.log("login", formData.get("email"));
    await signIn("credentials", formData);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return "Los valores son invalidos";
        case "CallbackRouteError":
          return error?.cause?.err?.message || "Error al realizar login";
        default:
          return "Error al realizar login";
      }
    }
    throw error;
  }
}

export async function signOutAction() {
  "use server";
  await signOut();
}

