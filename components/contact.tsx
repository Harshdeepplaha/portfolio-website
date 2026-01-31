"use client";

import React, { useState } from "react";
import SectionHeading from "./section-heading";
import { motion } from "framer-motion";
import { useSectionInView } from "@/lib/hooks";
import { sendEmail } from "@/actions/sendEmail";
import SubmitBtn from "./submit-btn";
import toast from "react-hot-toast";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export default function Contact() {
  const { ref } = useSectionInView("Contact");
  const [emailFocused, setEmailFocused] = useState(false);
  const [emailValue, setEmailValue] = useState("");
  const [messageFocused, setMessageFocused] = useState(false);
  const [messageValue, setMessageValue] = useState("");
  const [emailError, setEmailError] = useState("");
  const [messageError, setMessageError] = useState("");

  return (
    <motion.section
      id="contact"
      ref={ref}
      className="mb-20 sm:mb-28 w-[min(100%,38rem)] text-center"
      initial={{
        opacity: 0,
      }}
      whileInView={{
        opacity: 1,
      }}
      transition={{
        duration: 1,
      }}
      viewport={{
        once: true,
      }}
    >
      <SectionHeading>Contact me</SectionHeading>

      {/* <p className="text-gray-700 -mt-6 dark:text-white/80">
        Please contact me directly at{" "}
        <a className="underline" href="mailto:example@gmail.com">
          example@gmail.com
        </a>{" "}
        or through this form.
      </p> */}

      <TooltipProvider>
        <form
          className="mt-10 flex flex-col"
          noValidate
          onSubmit={async (e) => {
            e.preventDefault();
            
            // Reset errors
            setEmailError("");
            setMessageError("");
            
            // Validate email
            if (!emailValue) {
              setEmailError("Please fill out this field.");
              return;
            }
            
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(emailValue)) {
              setEmailError("Please enter a valid email address.");
              return;
            }
            
            // Validate message
            if (!messageValue) {
              setMessageError("Please fill out this field.");
              return;
            }
            
            // Create form data and submit
            const formData = new FormData();
            formData.append("senderEmail", emailValue);
            formData.append("message", messageValue);
            
            const { data, error } = await sendEmail(formData);

            if (error) {
              toast.error(error);
              return;
            }

            toast.success("Email sent successfully!");
            setEmailValue("");
            setMessageValue("");
          }}
        >
          <div className="relative">
            <Tooltip open={!!emailError}>
              <TooltipTrigger asChild>
                <div className="w-full">
                  <Input
                    className={cn(
                      "h-14 pt-6 pb-2 rounded-2xl bg-white/90 dark:bg-zinc-900/95",
                      emailError && "border-red-500 focus-visible:ring-red-500"
                    )}
                    name="senderEmail"
                    type="email"
                    maxLength={500}
                    value={emailValue}
                    onChange={(e) => {
                      setEmailValue(e.target.value);
                      if (emailError) setEmailError("");
                    }}
                    onFocus={() => setEmailFocused(true)}
                    onBlur={() => setEmailFocused(false)}
                    placeholder=""
                  />
                </div>
              </TooltipTrigger>
              {emailError && (
                <TooltipContent side="top" className="bg-red-500 text-white border-red-600">
                  <p>{emailError}</p>
                </TooltipContent>
              )}
            </Tooltip>
            <label
              className={cn(
                "absolute left-3 transition-all duration-200 pointer-events-none",
                emailFocused || emailValue
                  ? "top-2 text-xs text-muted-foreground"
                  : "top-4 text-base text-muted-foreground"
              )}
            >
              Email
            </label>
          </div>
          <div className="relative my-3">
            <Tooltip open={!!messageError}>
              <TooltipTrigger asChild>
                <div className="w-full">
                  <Textarea
                    className={cn(
                      "h-52 pt-6 pb-2 rounded-2xl bg-white/90 dark:bg-zinc-900/95",
                      messageError && "border-red-500 focus-visible:ring-red-500"
                    )}
                    name="message"
                    maxLength={5000}
                    value={messageValue}
                    onChange={(e) => {
                      setMessageValue(e.target.value);
                      if (messageError) setMessageError("");
                    }}
                    onFocus={() => setMessageFocused(true)}
                    onBlur={() => setMessageFocused(false)}
                    placeholder=""
                  />
                </div>
              </TooltipTrigger>
              {messageError && (
                <TooltipContent side="top" className="bg-red-500 text-white border-red-600">
                  <p>{messageError}</p>
                </TooltipContent>
              )}
            </Tooltip>
            <label
              className={cn(
                "absolute left-3 top-3 transition-all duration-200 pointer-events-none",
                messageFocused || messageValue
                  ? "top-2 text-xs text-muted-foreground"
                  : "text-base text-muted-foreground"
              )}
            >
              Message
            </label>
          </div>
          <SubmitBtn />
        </form>
      </TooltipProvider>
    </motion.section>
  );
}
