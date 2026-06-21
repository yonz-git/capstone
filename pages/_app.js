import useSWR, { SWRConfig } from "swr";
import { useRouter } from "next/router";
import { useEffect } from "react";
import NavBar from "@/components/NavBar";
import GlobalStyle from "../styles";
import { Jost } from "next/font/google";

const jost = Jost({
  subsets: ["latin"],
  variable: "--font-jost",
});

export default function App({ Component, pageProps }) {
  const router = useRouter();

  const { data: userProfile, mutate } = useSWR("userProfile", () => {
    if (typeof window !== "undefined") {
      return JSON.parse(localStorage.getItem("userProfile"));
    }
    return null;
  });

  useEffect(() => {
    mutate();
  }, [router.pathname, mutate]);

  return (
    <div className={jost.variable}>
      <main>
        <GlobalStyle />
        <SWRConfig
          value={{
            fetcher: (url) => fetch(url).then((response) => response.json()),
          }}
        >
          <Component {...pageProps} />
        </SWRConfig>
      </main>

      {userProfile && <NavBar />}
    </div>
  );
}
