import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { Draggable } from "gsap/Draggable";
import "../../CircularSlider.css";

gsap.registerPlugin(Draggable);

const CircularSlider = () => {
  const wheelRef = useRef(null);

  useEffect(() => {
    const wheelEl = wheelRef.current;

    const wheel = Draggable.create(wheelEl, {
      type: "rotation",
      throwProps: true,
      snap: (endValue) => Math.round(endValue / 90) * 90,
      onThrowComplete: dragActive,
    })[0];

    gsap.set("#wheel li:not(.active) .details > *", {
      opacity: 0,
      y: -10,
    });

    function dragActive() {
      const rot = wheel.rotation / 360;
      const decimal = rot % 1;
      const sliderLength = document.querySelectorAll("#wheel li").length;
      const tempIndex = Math.round(sliderLength * decimal);
      let index;

      if (rot < 0) index = Math.abs(tempIndex);
      else index = sliderLength - tempIndex;
      if (decimal === 0) index = 0;

      gsap.to("#wheel li.active .details > *", {
        opacity: 0,
        y: -10,
        duration: 0.6,
        stagger: 0.1,
      });

      document.querySelector("#wheel li.active")?.classList.remove("active");
      const newActiveLi = document.querySelectorAll("#wheel li")[index];
      if (newActiveLi) newActiveLi.classList.add("active");

      gsap.to("#wheel li.active .details > *", {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.1,
      });
    }

    function rotateDraggable(deg, callback) {
      const currentRotation = wheel.rotation;
      gsap.to(wheelEl, {
        rotation: currentRotation + deg,
        duration: 0.5,
        onComplete: callback,
      });
      wheel.rotation = currentRotation + deg;
    }

    const nextHandler = () =>
      rotateDraggable(
        360 / document.querySelectorAll("#wheel li").length,
        dragActive
      );
    const prevHandler = () =>
      rotateDraggable(
        -360 / document.querySelectorAll("#wheel li").length,
        dragActive
      );

    document.querySelector(".next")?.addEventListener("click", nextHandler);
    document.querySelector(".prev")?.addEventListener("click", prevHandler);
  }, []);

  const images = [
    "https://unsplash.it/1200/900",
    "https://unsplash.it/1200/901",
    "https://unsplash.it/1200/902",
    "https://unsplash.it/1200/903",
  ];

  return (
    <div className="site">
      <svg
        className="svg-mask"
        width="1200px"
        height="600px"
        viewBox="0 0 1200 600"
      >
        <defs>
          <clipPath id="quarterMask">
            <path
              d="M299.001,26.649L0,325.65c330.267,330.268,865.736,330.268,1196.004,0L897.003,26.649
              C731.868,191.784,464.136,191.784,299.001,26.649z"
            />
          </clipPath>
        </defs>
      </svg>

      <div className="header"></div>

      {/* Slider Wheel */}
      <div className="content">
        <ul className="featured-slider" id="wheel" ref={wheelRef}>
          {images.map((src, idx) => (
            <li key={idx} className={idx === 0 ? "active" : ""}>
              <div className="image">
                <img src={src} alt={`slide-${idx}`} />
              </div>
            </li>
          ))}
        </ul>

        {/* Fixed Title (doesn't move with rotation) */}
        <div className="fixed-title">
          <h1 className="moon-title">MOON ORIGINALS</h1>
        </div>
      </div>
    </div>
  );
};

export default CircularSlider;
