import { DefaultMantineColor, MantineColorsTuple } from "@mantine/core";
import en from "./../languages/en.json";

// Lemon Squeezy
// =====================================================================================================================
declare global {
  interface Window {
    createLemonSqueezy: () => void;
    LemonSqueezy: {
      Setup: (options: {
        eventHandler: (event: { event: string }) => void;
      }) => void;
      /**
       * Refreshes `lemonsqueezy-button` listeners on the page.
       */
      Refresh: () => void;

      Url: {
        /**
         * Opens a given Lemon Squeezy URL, typically these are Checkout or Payment Details Update overlays.
         * @param url - The URL to open.
         */
        Open: (url: string) => void;

        /**
         * Closes the current opened Lemon Squeezy overlay checkout window.
         */
        Close: () => void;
      };
      Affiliate: {
        /**
         * Retrieve the affiliate tracking ID
         */
        GetID: () => string;

        /**
         * Append the affiliate tracking parameter to the given URL
         * @param url - The URL to append the affiliate tracking parameter to.
         */
        Build: (url: string) => string;
      };
    };
  }
}
// End Lemon Squeezy
// =====================================================================================================================

// Mantine
// =====================================================================================================================
type ExtendedCustomColors = "faastsaas" | DefaultMantineColor;

declare module "@mantine/core" {
  export interface MantineThemeColorsOverride {
    colors: Record<ExtendedCustomColors, MantineColorsTuple>;
  }
}
// End Mantine
// =====================================================================================================================

// next-intl
// =====================================================================================================================
export type Messages = typeof en;

declare global {
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  interface IntlMessages extends Messages {}
}
// End next-intl
// =====================================================================================================================

// Docs
// =====================================================================================================================
export interface TDoc {
  code: string;
  frontmatter: {
    title: string;
    order: number;
    asPage?: boolean;
  };
  path: string;
  isParent?: boolean;
  isChildren?: boolean;
}
// End Docs
// =====================================================================================================================

// Credentials
// =====================================================================================================================
export type TCredentialStatusName = "connected" | "not_connected" | "error";

export interface TCredentialStatus<T = object> {
  name: TCredentialStatusName;
  data?: T;
}
// End Credentials
// =====================================================================================================================
