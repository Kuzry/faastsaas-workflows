import { NextIntlClientProvider, useMessages } from "next-intl";
import { FrontLayout, FrontLayoutContainer } from "@/components/Layout";

export default function Home() {
  const messages = useMessages();

  return (
    <NextIntlClientProvider
      messages={{
        front_layout: messages["front_layout"],
      }}
    >
      <FrontLayout>
        <FrontLayoutContainer>
          <h1>Home</h1>
          <p>
            Donec viverra purus non turpis eleifend, eu scelerisque odio
            finibus. Morbi a ipsum et tortor molestie consectetur. Duis dictum
            metus ut risus porta varius. Ut nec neque risus. Curabitur volutpat
            orci sit amet nisi laoreet blandit. Phasellus et est at velit
            consectetur lacinia. Donec consectetur nunc a leo interdum, nec
            posuere nunc pulvinar. In hac habitasse platea dictumst. Sed et
            massa vel risus aliquet luctus. Donec porttitor nisi nulla, id
            vestibulum lectus condimentum at. Sed ut malesuada leo. Vestibulum
            ante ipsum primis in faucibus orci luctus et ultrices posuere
            cubilia curae; Morbi vel mauris aliquam, ornare ex et, pretium
            metus. Aliquam commodo metus neque, eget ullamcorper turpis
            malesuada in. Mauris non fermentum lorem. Nunc a erat sagittis,
            faucibus augue sed, placerat risus.
          </p>
        </FrontLayoutContainer>
      </FrontLayout>
    </NextIntlClientProvider>
  );
}
