import CustomLoader from "@/components/customLoader";
import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Poppins } from "next/font/google";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { RecoilRoot } from "recoil";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { Scrollbars } from "react-custom-scrollbars";

import { Scrollbar } from "react-scrollbars-custom";
import { askConfirmationPopUp } from "@/helper/helper";
const poppins = Poppins({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-poppins",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});
export default function App({ Component, pageProps }: AppProps) {
  const [isClient, setIsClient] = useState(false);
  const [hasToken, setHasToken] = useState(false);
  const router = useRouter();

  const showDialogue = async () => {
    const { isConfirmed } = await askConfirmationPopUp(
      "Not Signed In",
      "To view the page you must first login",
      "warning",
      "login"
    );
    if (isConfirmed) {
      router.push("login");
    }
  };

  const protectedRoutes = [
    "/mybookings",
    "/booking/pickdate",
    "/booking/eventType",
    "/booking/extras",
    "/booking/decoration",
    "/booking/selectTheme",
  ];
  const authenticationRoutes = ["/login", "/signup"];

  useEffect(() => {
    console.log('use1')
    setIsClient(true);
  }, []);
  useEffect(() => {
    if (protectedRoutes.includes(router.route)) {
      const token = localStorage.getItem("Bearer");

      if (token === null || token === "" || token === undefined) {
        setHasToken(false);
        router.back();
        showDialogue();
      } else {
        setHasToken(true);
      }
    }
  }, [router]);

  // useEffect(() => {
  //   if (!allowedRoutes.includes(router.route)) {
  //     const token = localStorage.getItem("Bearer");
  //     console.log("getting token from _app.tsx ", token);

  //     if (token === null || token === "" || token === undefined) {
  //       setHasToken(false);
  //       router.replace("/login");
  //     } else {
  //       setHasToken(true);
  //       checkTokenExpiry();
  //     }
  //   }
  // }, [router]);

  const theme = createTheme({
    typography: {
      allVariants: {
        fontFamily: `var(--font-poppins)`,
        textTransform: "none",
        fontSize: 16,
      },
    },
  });

  return isClient ? (
    <RecoilRoot>
      <ThemeProvider theme={theme}>
        <main className={`${poppins.variable} font-sans`}>
          <Scrollbars style={{ width: "100%", height: "100vh" }}>
          {authenticationRoutes.includes(router.route) ? null : <Navbar />}
          {/* <Loading /> */}
          {protectedRoutes.includes(router.route) ? (
            hasToken && <Component {...pageProps} suppressHydrationWarning />
          ) : (
            <Component {...pageProps} suppressHydrationWarning />
          )}
          {authenticationRoutes.includes(router.route) ? null : <Footer />}
          </Scrollbars>
        </main>
      </ThemeProvider>
    </RecoilRoot>
  ) : null;
}

// const Loading = () => {
//   const router = useRouter();
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     const handleStart = (url: any) => {
//       console.log('route', url, '-', router.asPath)
//       if (url !== router.asPath) {
//         setLoading(true);
//       }
//     };

//     const handleComplete = (url: any) => {
//       console.log('route', url, '-', router.asPath)
//       if (url === router.asPath) {
//         setLoading(false);
//       }
//     };

//     router.events.on("routeChangeStart", handleStart);
//     router.events.on("routeChangeComplete", handleComplete);
//     router.events.on("routeChangeError", handleComplete);

//     return () => {
//       router.events.on("routeChangeStart", handleStart);
//       router.events.on("routeChangeComplete", handleComplete);
//       router.events.on("routeChangeError", handleComplete);
//     };
//   });

//   return (
//     <>
//       <CustomLoader loading={loading} />
//     </>
//   );
// };
