import { NextRequest, NextResponse } from "next/server";
import { EmailOtpType } from "@supabase/auth-js";
import { createSupabaseServerClient } from "@/utils/supabase/server";
import { authLinks } from "@/utils/auth";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const token_hash = request.nextUrl.searchParams.get("token_hash") ?? "";
  const type = request.nextUrl.searchParams.get("type") as EmailOtpType;
  const next = request.nextUrl.searchParams.get("next") ?? "/";

  const redirectTo = request.nextUrl.clone();
  redirectTo.pathname = next;
  redirectTo.searchParams.delete("token_hash");
  redirectTo.searchParams.delete("type");
  redirectTo.searchParams.delete("next");

  try {
    if (token_hash && type) {
      const supabase = createSupabaseServerClient();
      const verifyOtpResponse = await supabase.auth.verifyOtp({
        type,
        token_hash,
      });

      if (verifyOtpResponse.error) {
        throw new Error(verifyOtpResponse.error.message);
      }
    }
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
    redirectTo.pathname = authLinks.error;
    redirectTo.searchParams.append("error", (error as Error).message);
  }

  return NextResponse.redirect(redirectTo);
}
