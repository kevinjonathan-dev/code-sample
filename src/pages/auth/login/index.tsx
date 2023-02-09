/* eslint-disable jsx-a11y/anchor-is-valid */
import api from "api";
import OTPSection from "components/auth/OTPSection";
import ArrowIcon from "components/common/Icons/ArrowIcon";
import TextInput from "components/common/TextInput";
import Header from "components/Header";
import useToast from "hooks/useToast";
import { gaEvent } from "lib/gtag";
import Head from "next/head";
import React, { useState } from "react";
import { sanitizeEmail, validateEmail } from "utils/format";
import HeadWrapper from "../../../components/common/Head";

export default function LoginPage(): JSX.Element {
  const [email, setEmail] = useState("");
  const [section, setSection] = useState<"sign-up" | "otp">("sign-up");
  const changeSection = () => {
    if (section === "otp") setSection("sign-up");
    else setSection("otp");
  };

  const { toast } = useToast();
  const [isSending, setIsSending] = useState(false);
  const isDevelopment = process.env.NODE_ENV === "development";

  /** Handle login */
  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSending(true);
    gaEvent("click::btnLoginEmail", { page: "login", section: "email" });
    api.auth
      .login({ email })
      .then((res) => {
        if (res.data) {
          changeSection();
          if (isDevelopment) {
            void navigator.clipboard.writeText(res.data.otp);
            toast.warning(
              `OTP ${res.data.otp} is copied to clipboard!`,
              "Dev Only"
            );
          }
        } else {
          // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
          toast.error((res as any).response!.data, "Error");
        }
      })
      .catch((error) => {
        toast.error(error.response);
      })
      .finally(() => setIsSending(false));
  };

  return (
    <div className=" w-full h-full">
      <Header />
      <div className="flex md:h-full">
        <div className="left-section xl:max-w-xl h-full flex-1 bg-slate-100 hidden md:flex flex-col items-center justify-center" />
        <div className="right-section flex-1 flex flex-col md:h-full mt-12 md:mt-0 px-4 md:pt-52 md:px-28">
          {section === "otp" ? (
            <OTPSection
              onSuccess={() => {
                setIsSending(true);
              }}
              onFail={(e) => console.log(JSON.stringify(e))}
              email={email}
              changeSection={changeSection}
            />
          ) : (
            <div id="login">
              <HeadWrapper />
              <h1 className="text-4xl md:text-5xl font-bold pt-serif max-w-sm leading-snug md:leading-normal">
                Hello there, Welcome!
              </h1>
              <p className="text-slate-600 mt-2 max-w-sm">
                We will send you a one time password so you can assess your
                dashboard.
              </p>
              <form onSubmit={handleLogin} className="pt-4 my-t">
                <TextInput
                  className="mb-4 w-full md:w-auto"
                  label="Email"
                  onChange={(e) =>
                    setEmail(sanitizeEmail(e.currentTarget.value))
                  }
                  value={email}
                />
                <button
                  id="login-otp-send"
                  disabled={isSending || !validateEmail(email)}
                  type="submit"
                  className="bg-teal-500 w-full md:w-auto disabled:bg-slate-300 disabled:cursor-not-allowed text-white text-base py-2 px-4 mt-8 flex justify-center items-center"
                >
                  Email Verification{" "}
                  <ArrowIcon
                    size={24}
                    color="white"
                    className="ml-2 rotate-180 transform"
                  />
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
