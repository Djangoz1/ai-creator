import { FormProvider } from "context/form";
import "../styles/global.css";

import { MyFooter } from "components/layout/MyFooter";
import { NightMode } from "components/btn/NightMode";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600&display=swap"
          rel="stylesheet"
        />

        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Lato:wght@900&display=swap"
          rel="stylesheet"
        ></link>

        <link
          href="https://fonts.googleapis.com/css2?family=Exo:wght@200;500;700;800&display=swap"
          rel="stylesheet"
        ></link>
      </head>

      <body className=" w-screen     overflow-x-hidden  box-border  snap-proximity flex flex-col-reverse  ">
        <FormProvider>
          <MyFooter />
          <main className=" w-screen h-screen snap-start    items-center justify-center box-border flex flex-col z-1 relative">
            {children}
            <div style={{ zIndex: 100 }} className="fixed top-8 right-8">
              <NightMode />
            </div>
          </main>
        </FormProvider>
      </body>
    </html>
  );
}
