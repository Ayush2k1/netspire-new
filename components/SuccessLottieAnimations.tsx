"use client";
import React, { lazy, useEffect, useState } from "react";

const Lottie = lazy(() => import("react-lottie-player"));
import confetti from "../public/images/lottie/confetti-lottie.json";
import { setTimeout } from "timers";

const SuccessLottieAnimation = () => {
  const [animationData, setAnimationData] = useState<object | null>();

  useEffect(() => {
    import("../public/images/lottie/confetti-lottie.json").then(
      setAnimationData,
    );
  }, []);

  setTimeout(() => {
    setAnimationData(null);
  }, 3000);

  if (!animationData) return <div></div>;
  if (confetti) {
    return (
      <div className="max-w-screen overflow-hidden h-screen absolute top-0 left-1/2 -translate-x-1/2 z-[1000]">
        <Lottie
          loop={false}
          animationData={animationData}
          play
          style={{ width: "800px", height: "800px" }}
        />
      </div>
    );
  }
};

export default SuccessLottieAnimation;
