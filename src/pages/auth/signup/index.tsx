/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/anchor-is-valid */
import api from "api";
import ArrowIcon from "components/common/Icons/ArrowIcon";
import CircleCheckIcon from "components/common/Icons/CircleCheckIcon";
import TextInput from "components/common/TextInput";
import Header from "components/Header";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { parseJWT } from "utils/api";
import companies from "api/companies";
import { sanitizeEmail, validateEmail } from "utils/format";
import useStore from "hooks/useStore";
import OTPSection from "components/auth/OTPSection";
import { gaEvent } from "lib/gtag";
import HeadWrapper from "components/common/Head";

export default function SignUpPage(): JSX.Element {
  const router = useRouter();
  const { store } = useStore();
  const [section, setSection] = useState<"sign-up" | "otp">("sign-up");
  const [email, setEmail] = useState("");
  const [plan, setPlan] = useState("small");
  const [, setCorrectOTP] = useState<null | string>(null);
  const changeSection = () => {
    if (section === "otp") setSection("sign-up");
    else setSection("otp");
  };

  useEffect(() => {
    if (router.query.plan !== undefined) {
      if (router.query.plan === "small") {
        setPlan("small");
      }
      if (router.query.plan === "medium") {
        setPlan("medium");
      }
    }
  }, [router]);

  useEffect(() => {
    if (store.accessToken) {
      if (store.isManager) void router.push("/dashboard");
      else void router.push("/user/insights");
    }
  }, [store.accessToken]);

  /**
   * Handle sign up payment
   * @param accessToken
   */
  const handleSignUpSuccess = async (accessToken: string) => {
    const payload = parseJWT(accessToken);
    const companyId = payload.data.access[0].companyId
      ? payload.data.access[0].companyId
      : "";
    void gaEvent("sign_up");
    const link = await companies.stripe.getSessionUrl(accessToken, companyId);
    if (link?.status === 200) {
      window.location.href = link.data.url;
    } else {
      alert("Error");
    }
  };

  return (
    <>
      <HeadWrapper />
      <div id="signup" className="flex w-full h-full">
        <Header />
        <div className="left-section xl:max-w-xl h-full flex-1 bg-slate-100 flex flex-col items-center pt-52"></div>
        <div className="right-section flex-1 flex flex-col h-full pt-52 px-28">
          {section === "otp" ? (
            <OTPSection
              onFail={() => {
                alert("Wrong code");
              }}
              email={email}
              changeSection={changeSection}
              onSuccess={handleSignUpSuccess}
            />
          ) : (
            <SignUpSection
              plan={plan}
              email={email}
              setEmail={setEmail}
              setCorrectOTP={setCorrectOTP}
              changeSection={changeSection}
            />
          )}
        </div>
      </div>
    </>
  );
}

const SignUpSection = ({
  changeSection,
  setCorrectOTP,
  email,
  setEmail,
  plan,
}: {
  changeSection: () => void;
  setCorrectOTP: React.Dispatch<React.SetStateAction<string | null>>;
  email: string;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
  plan: string;
}) => {
  const [name, setName] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [errors, setErrors] = useState<string[]>([]);

  const validateFields = () => {
    const checkErrors: string[] = [];
    if (!name.length) checkErrors.push("name");
    if (!companyName.length) checkErrors.push("companyName");
    if (!email.length) checkErrors.push("email");
    if (!validateEmail(email)) checkErrors.push("emailInvalid");
    setErrors(checkErrors);

    return checkErrors.length === 0;
  };

  /** Handle sign up */
  const handleSignUp = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validateFields()) {
      if (email === "" || name === "" || companyName === "") {
        alert("Field cannot be empty");

        return;
      }

      api.auth
        .signUp({
          email,
          name,
          companyName,
          stripeProductId: plan,
          stripePricingName: plan,
        })
        .then((res) => setCorrectOTP(String(res?.data.otp)))
        .catch(console.log);
      changeSection();
    }
  };

  return (
    <>
      <h1 className="text-5xl font-bold pt-serif">Let&apos;s Start!</h1>
      <p className="text-slate-600 mt-2 max-w-md">
        You are one step closer to improve your employee retention, workplace
        wellbeing and inclusion competencies.
      </p>

      <form className="pt-4 my-t" onSubmit={handleSignUp}>
        <TextInput
          className="mb-4"
          label="Your Name"
          error={errors.includes("name")}
          helpText={errors.includes("name") && "Name is required"}
          onChange={(e) => setName(e.currentTarget.value)}
          value={name}
        />
        <TextInput
          className="mb-4"
          label="Work Email"
          error={errors.includes("email") || errors.includes("emailInvalid")}
          helpText={
            (errors.includes("email") && "Email is required") ||
            (errors.includes("emailInvalid") && "Email is invalid")
          }
          onChange={(e) => setEmail(sanitizeEmail(e.currentTarget.value))}
          value={email}
        />
        <TextInput
          className="mb-4"
          label="Company Name"
          error={errors.includes("companyName")}
          helpText={
            errors.includes("companyName") && "Company name is required"
          }
          onChange={(e) => setCompanyName(e.currentTarget.value)}
          value={companyName}
        />
        <button
          disabled={name.length === 0}
          type="submit"
          className="bg-teal-500 disabled:bg-slate-300 disabled:cursor-not-allowed text-white text-base py-2 px-4 mt-8 flex items-center"
        >
          Email Verification{" "}
          <ArrowIcon
            size={24}
            color="white"
            className="ml-2 rotate-180 transform"
          />
        </button>
      </form>
    </>
  );
};
