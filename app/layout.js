
 import {Outfit} from "next/font/google"
import "./globals.css";
import Header from "./_components/Header";
import { ScrollProvider } from "./_context/ScrollContext";
import Footer from "./_components/Footer";

 const outfit = Outfit({subsets:['latin']})
// import { Montserrat } from "next/font/google";
// const montserrat = Montserrat({ subsets: ["latin"], weight: ["400", "700"] });

// import { Poppins } from "next/font/google";
// const poppins = Poppins({ subsets: ["latin"], weight: ["400", "600", "700"] });


export const metadata = {
  title: "Awesome studio",
  description: "Capturing Moments, Creating Memories",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
       className={outfit.className}
      >
      <ScrollProvider>
       <Header />
       {children}
       <Footer />
      </ScrollProvider>
      </body>
    </html>
  );
}
