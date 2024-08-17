import { NextRequest, NextResponse } from "next/server";
import { createSupabaseServerClient } from "@/utils/supabase/server";
import { authLinks } from "@/utils/auth";
import { revalidatePath } from "next/cache";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const redirectTo = request.nextUrl.clone();

  try {
    const supabase = createSupabaseServerClient();
    await supabase.auth.signOut();
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
  }

  redirectTo.pathname = authLinks.sign_in;

  revalidatePath("/", "layout");

  return NextResponse.redirect(redirectTo);
}
