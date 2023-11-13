import Head from "next/head";
import "tailwindcss/tailwind.css";
import "../styles/globals.css";
// imports swiper sliders
import { AgeGateProvider } from "@/context/ageGateContext";
import { ThemeProvider } from "@material-tailwind/react";
import "swiper/swiper-bundle.css";
import { QueryClient, QueryClientProvider } from "react-query";
import { Hydrate } from "react-query/hydration";
import { SessionProvider } from "next-auth/react";
import { ProductsProvider } from "@/context/productsContext";
import { CartProvider } from "@/context/cartContext";
import { FloatingWhatsApp } from "react-floating-whatsapp";
import { SidebarProvider } from "@/context/sidebarContext";

const queryClient = new QueryClient();

export default function MyApp({
  Component,
  pageProps: { session, ...pageProps },
}) {
  return (
    <>
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="true"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Bungee&family=Economica:wght@400;700&display=swap"
          rel="stylesheet"
          crossOrigin="anonymous"
        />
      </Head>
      <SessionProvider session={session}>
        <QueryClientProvider client={queryClient}>
          <Hydrate state={pageProps.dehydratedState}>
            <ThemeProvider>
              <AgeGateProvider>
                <ProductsProvider>
                  <CartProvider>
                    <FloatingWhatsApp
                      phoneNumber="+9710555207215
                      "
                      accountName="Name is here"
                      allowEsc
                      allowClickAway
                      notification
                      notificationSound
                    />
                    <SidebarProvider>
                      <Component {...pageProps} />
                    </SidebarProvider>
                  </CartProvider>
                </ProductsProvider>
              </AgeGateProvider>
            </ThemeProvider>
          </Hydrate>
        </QueryClientProvider>
      </SessionProvider>
    </>
  );
}
