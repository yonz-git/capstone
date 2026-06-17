import GlobalStyle from "../styles";
import { Jost } from "next/font/google";

// 1. Initialize Jost cleanly using a clear variable name
const jost = Jost({
  subsets: ["latin"],
  variable: "--font-jost",
});

export default function App({ Component, pageProps }) {
  return (
    /* 2. ✨ The variable is safely injected into this main wrapper tag */
    <main className={jost.variable}>
      <GlobalStyle />
      <Component {...pageProps} />
    </main>
  );
}
