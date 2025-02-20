import "../styles/globals.css";
import { Open_Sans } from "next/font/google";
import type { AppProps } from "next/app";

const open_sans = Open_Sans({
  subsets: ["latin"],
  display: "swap",
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <main className={open_sans.className}>
      <Component {...pageProps} />
    </main>
  );
}

export default MyApp;
