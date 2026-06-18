import GlobalStyle from "../styles";
import { Jost } from "next/font/google";
import { SWRConfig } from "swr";

const jost = Jost({
  subsets: ["latin"],
  variable: "--font-jost",
});

export default function App({ Component, pageProps }) {
  return (
    <main className={jost.variable}>
      <GlobalStyle />

      <SWRConfig
        value={{
          fetcher: (url) => fetch(url).then((response) => response.json()),
        }}
      >
        <Component {...pageProps} />
      </SWRConfig>
    </main>
  );
}
