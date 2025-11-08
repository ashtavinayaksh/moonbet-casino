import React from "react";
import "./CircularWheel.css";

const CircularWheel = () => {
  const images = [
    "/images/honeypot-2.png",
    "/images/segment1.png",
    "/images/blackjack.png",
    "/images/Bacarrat.png",
    "/images/67.png",
    "/images/MINES2.png",
    "/images/dice-2.png",
    "/images/blackjack2.png",
    "/images/bacarrat2.png",
    "/images/672.png",
    "/images/MINES.png",
    "/images/dice.png",
  ];

  const segmentLabels = [
    "67",
    "BACARRAT",
    "BLACKJACK",
    "HONEYPOT",
    "DICES",
    "MINES",
    "67",
    "BACARRAT",
    "BLACKJACK",
    "HONEYPOT",
    "DICES",
    "MINES",
  ];

  return (
    <div className="relative w-full min-h-screen flex items-center justify-center bg-black">
      <div className="svg-wrapper rotating-wheel">
        {/* OUTER IMAGE SEGMENT WHEEL */}
        <svg
          width="894"
          height="894"
          viewBox="0 0 1094 1094"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
        >
          <defs>
            <linearGradient
              id="paint0_linear_8212_718"
              x1="547.087"
              y1="96.7229"
              x2="547.087"
              y2="329"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#DC1FFF" />
              <stop offset="1" stopColor="white" />
            </linearGradient>

            {/* Define 12 image patterns */}
            {images.map((img, i) => (
              <pattern
                key={i}
                id={`pattern${i}_8212_718`}
                patternContentUnits="objectBoundingBox"
                width="1"
                height="1"
              >
                <image
                  href={img}
                  width="1"
                  height="1"
                  preserveAspectRatio="xMidYMid slice"
                />
              </pattern>
            ))}
          </defs>

          {/* 12 outer paths with image fills */}
          {[
            "M491.798 763.456C509.278 767.879 527.581 770.229 546.432 770.229C565.995 770.229 584.969 767.698 603.045 762.946L660.248 976.207C583.581 996.478 506.264 995.402 434.619 976.629L491.798 763.456Z",
            "M436 117.188C512.282 97.3799 589.155 98.6704 660.393 117.462L603.032 331.316C585.183 326.691 566.466 324.229 547.175 324.229C528.597 324.229 510.551 326.512 493.3 330.812L436 117.188Z",
            "M664.483 118.766C737.651 138.954 804.68 177.652 858.747 230.924L701.894 387.694C675.761 362.11 643.367 342.922 607.23 332.657L664.483 118.766Z",
            "M862.293 234.458C914.187 286.755 953.741 352.685 974.728 428.651L760.442 486.009C750.167 449.861 731.021 417.459 705.513 391.319L862.293 234.458Z",
            "M976.034 433.484C996.214 509.803 995.241 586.768 976.713 658.139L762.498 600.68C766.701 583.556 768.933 565.654 768.933 547.23C768.933 527.789 766.448 508.929 761.784 490.951L976.034 433.484Z",
            "M975.427 662.977C955.459 736.475 916.829 803.847 863.514 858.203L706.996 701.604C732.416 675.053 751.344 642.211 761.221 605.64L975.427 662.977Z",
            "M859.989 861.758C807.578 914.001 741.393 953.819 665.081 974.901L607.981 761.586C644.518 751.067 677.2 731.419 703.413 705.263L859.989 861.758Z",
            "M390.513 706.317C417.017 732.413 450.012 751.907 486.849 762.143L429.784 975.334C356.103 955.137 288.618 916.175 234.286 862.464L390.513 706.317Z",
            "M331.786 606.168C341.837 643.023 361.086 676.072 386.906 702.683L230.746 858.923C178.668 806.264 139.078 739.843 118.301 663.312L331.786 606.168Z",
            "M331.216 490.42C326.463 508.557 323.932 527.597 323.932 547.229C323.932 565.845 326.208 583.927 330.496 601.213L117.016 658.474C97.1177 581.845 98.5079 504.618 117.546 433.108L331.216 490.42Z",
            "M388.4 390.25C362.492 416.447 343.024 449.052 332.572 485.482L118.861 428.278C139.278 354.928 178.309 287.787 231.976 233.745L388.4 390.25Z",
            "M487.602 332.108C451.169 342.093 418.463 361.127 392.042 386.65L235.523 230.213C288.068 178.482 354.235 139.157 430.419 118.473L487.602 332.108Z",
          ].map((d, i) => (
            <path key={i} d={d} fill={`url(#pattern${i}_8212_718)`} />
          ))}
        </svg>

        {/* INNER RING */}
        <svg
          className="svg2"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 604 606"
          fill="none"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M0 303C0.000125125 135.657 135.21 0 302 0C468.79 0.000107924 604 135.658 604 303C604 470.342 468.79 606 302 606C135.21 606 0 470.342 0 303ZM301.5 79.9999C178.617 79.9999 78.9997 179.841 78.9997 303C78.9999 426.16 178.617 526 301.5 526C424.383 526 524 426.159 524 303C524 179.84 424.383 80 301.5 79.9999Z"
            fill="#A7A7A7"
            fillOpacity="0.5"
          />
        </svg>

        {/* CENTER CONTENT */}
        <div className="center-content">
          <div className="center-title">MOON</div>
          <div className="center-title">ORIGINALS</div>
        </div>

        {/* SEGMENT LABELS & ICONS */}
        {segmentLabels.map((label, index) => (
          <div
            key={index}
            className="segment-container"
            style={{
              transform: `translate(-50%, -50%) rotate(${index * 30}deg)`,
            }}
          >
            <div style={{ transform: "translateY(-210px)" }}>
              <div className="segment-number">
                <span
                  style={{
                    display: "inline-block",
                    transform: `rotate(-${index * 30}deg)`,
                  }}
                >
                  {label}
                </span>
              </div>
            </div>
            <div style={{ transform: "translateY(-200px)" }}>
              <div className="segment-icon">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 36 17"
                  fill="none"
                >
                  <path
                    d="M16.7089 9.80341C15.1512 15.3384 8.03561 17.4109 3.82898 12.9776C-2.6707 6.12942 6.65953 -3.46522 13.9082 1.98328C17.6856 4.82106 22.105 16.2803 28.3247 11.7605C33.8228 7.76457 28.0995 0.18353 22.5255 3.41418C21.4294 4.04974 20.592 5.14425 19.5942 5.89154C20.1964 0.606435 26.6786 -1.77721 31.0333 1.49429C39.7066 8.00967 29.5515 19.326 22.0465 13.3945C18.2617 10.4017 14.6522 0.349328 8.39891 3.52472C2.54124 6.49946 6.28627 14.6392 12.5184 12.5379C14.1396 11.9912 15.2806 10.6624 16.7089 9.80341Z"
                    fill="#6a6a6a"
                  />
                </svg>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CircularWheel;
