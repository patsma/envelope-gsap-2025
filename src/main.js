import "./index.scss";
import { gsap } from "gsap";
import { CustomEase } from "gsap/CustomEase";
import { CustomBounce } from "gsap/CustomBounce";
import { CustomWiggle } from "gsap/CustomWiggle";
import { RoughEase, ExpoScaleEase, SlowMo } from "gsap/EasePack";
import { Draggable } from "gsap/Draggable";
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin";
import { EaselPlugin } from "gsap/EaselPlugin";
import { Flip } from "gsap/Flip";
import { GSDevTools } from "gsap/GSDevTools";
import { InertiaPlugin } from "gsap/InertiaPlugin";
import { MotionPathHelper } from "gsap/MotionPathHelper";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import { MorphSVGPlugin } from "gsap/MorphSVGPlugin";
import { Observer } from "gsap/Observer";
import { Physics2DPlugin } from "gsap/Physics2DPlugin";
import { PhysicsPropsPlugin } from "gsap/PhysicsPropsPlugin";
import { PixiPlugin } from "gsap/PixiPlugin";
import { ScrambleTextPlugin } from "gsap/ScrambleTextPlugin";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { SplitText } from "gsap/SplitText";
import { TextPlugin } from "gsap/TextPlugin";

window.gsap = gsap;

gsap.registerPlugin(
  Draggable,
  DrawSVGPlugin,
  EaselPlugin,
  Flip,
  GSDevTools,
  InertiaPlugin,
  MotionPathHelper,
  MotionPathPlugin,
  MorphSVGPlugin,
  Observer,
  Physics2DPlugin,
  PhysicsPropsPlugin,
  PixiPlugin,
  ScrambleTextPlugin,
  ScrollTrigger,
  ScrollSmoother,
  ScrollToPlugin,
  SplitText,
  TextPlugin,
  RoughEase,
  ExpoScaleEase,
  SlowMo,
  CustomEase,
  CustomBounce,
  CustomWiggle
);

// Make GSAP available globally for video export

document.addEventListener("DOMContentLoaded", function () {
  console.log("Logo animation initialized");

  function loadSVGs(svgs) {
    const fetchPromises = svgs.map((svg) =>
      fetch(svg.url).then((response) => response.text())
    );

    Promise.all(fetchPromises)
      .then((responses) => {
        responses.forEach((svgContent, index) => {
          document.querySelector(svgs[index].container).innerHTML = svgContent;
        });
        initializeGSAPAnimations();
      })
      .catch(console.error);
  }

  function initializeGSAPAnimations() {
    console.log("Initializing GSAP animations");

    // Convert SVG elements to paths first
    MorphSVGPlugin.convertToPath(
      "circle, rect, ellipse, line, polygon, polyline"
    );

    // Create the main animation timeline
    const mainTimeline = gsap.timeline({
      // repeat: -1,
      // repeatDelay: 3,
      defaults: {
        ease: "power2.inOut",
      },
      onComplete: () => console.log("Animation complete"),
    });

    // Make timeline globally accessible for video export
    window.tl = mainTimeline;

    // Create GSDevTools for debugging (use mainTimeline, not undefined tlOpen)
    GSDevTools.create({ timeline: mainTimeline });

    // Chain all animation steps to the main timeline
    mainTimeline
      .from("#text > *", { autoAlpha: 0, stagger: 0.1 })
      .from("#arrow", { y: "+=10", repeat: 2, yoyo: true, autoAlpha: 0 })
      .to("#arrow", { autoAlpha: 0 })
      .to(
        "#button",
        { autoAlpha: 0, scale: 0, transformOrigin: "center center" },
        "<"
      )
      .to("#text > *", { autoAlpha: 0, stagger: 0.1 }, "<")
      .to("#closed", {
        duration: 2,
        transformOrigin: "center top",
        fill: "#f5f5f5",
        scaleY: -1,
        ease: "linear",
      })
      .from(
        "#pattern-top",
        {
          duration: 1.5,
          transformOrigin: "center bottom",
          scaleY: 0,
          ease: "linear",
        },
        "-=1"
      )
      .from(
        "#paper",
        {
          duration: 2,
          scaleY: 0,
          transformOrigin: "center bottom",
        },
        "-=2.5"
      )
      .to("#paper-mask", { y: "+=500", duration: 2.5 })
      .to(
        [
          "#pattern-top",
          "#closed",
          "#shadows-inner",
          "#pattern-bottom",
          "#accents",
          "#body",
          "#bottom-shadow",
        ],
        {
          y: "+=500",
          duration: 2.6,
        },
        "<"
      )

      .from("#paper-mask-full", { autoAlpha: 0, duration: 0.01 }, "-=1")
      .from("#shadows-inner", { autoAlpha: 0, y: "+=2" }, 0.1);
  }

  // Load SVGs
  loadSVGs([{ url: "logo.svg", container: ".logo" }]);
});
