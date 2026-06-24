import useSWR, { SWRConfig } from "swr";
import { useRouter } from "next/router";
import { useEffect } from "react";
import NavBar from "@/components/NavBar";
import GlobalStyle from "../styles";
import { Jost } from "next/font/google";
import Aurora from "@/components/Aurora";
import styled from "styled-components";
import Galaxy from "@/components/Galaxy";

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

        <BackgroundWrapper>
          <Galaxy />
        </BackgroundWrapper>
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

const BackgroundWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 0; /* Keeps it strictly behind your text/cards */
  pointer-events: none; /* Allows users to click through the animation canvas cleanly */
`;
