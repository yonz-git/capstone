import useSWR, { SWRConfig } from "swr";
import { useRouter } from "next/router";
import { useEffect } from "react";
import NavBar from "@/components/NavBar";
import GlobalStyle from "../styles";
import { Jost } from "next/font/google";
import styled from "styled-components";
import Galaxy from "@/components/ui-elements/Galaxy";

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
  z-index: 0;
  // background: radial-gradient(circle, #1b1b20, #050405);

  background:
    radial-gradient(
      circle at -4% -3%,
      rgb(122 120 79 / 29%) -20%,
      #1f1e294a 45% 45%
    ),
    radial-gradient(
      circle at 120% -25%,
      rgb(105 133 146 / 24%) 20%,
      #21242c5e 34%
    ),
    linear-gradient(to bottom, #161829 -20%, #0d0c0f -80%, #000000 5%);
  // background:
  //   radial-gradient(
  //     circle at 10% 70%,
  //     rgba(79, 85, 105, 0.25) 0%,
  //     transparent 45%
  //   ),
  //   radial-gradient(
  //     circle at 90% 15%,
  //     rgba(49, 152, 217, 0.2) 0%,
  //     transparent 40%
  //   ),
  //   linear-gradient(to bottom, #16161b 0%, #0a080b 40%, #0c0c10 100%);

  pointer-events: none; /* Allows users to click through the animation canvas cleanly */
`;
