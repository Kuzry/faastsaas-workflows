export const authLinks = {
  sign_in: "/sign-in",
  sign_up: "/sign-up",
  sign_up_confirm: "/confirm",
  reset_password: "/reset-password",
  update_password: "/update-password",
  error: "/error",
  logout: "/logout",
  dashboard: "/dashboard",
  privacy_policy: "/privacy-policy",
  terms_of_service: "/terms-of-service",
} as const;

export const protectedRoutes: {
  href: string;
  comparison?: "exact" | "starts-with";
}[] = [
  {
    href: "/billing",
  },
  {
    href: "/dashboard",
  },
  {
    href: "/settings",
  },
];

export const notProtectedRoutes: string[] = [
  "/",
  authLinks.sign_in,
  authLinks.sign_up,
  authLinks.sign_up_confirm,
  authLinks.reset_password,
  authLinks.error,
  authLinks.privacy_policy,
  authLinks.terms_of_service,
];
