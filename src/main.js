import "./index.scss";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { MorphSVGPlugin } from "gsap/MorphSVGPlugin";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { SplitText } from "gsap/SplitText";
import { CustomEase } from "gsap/CustomEase";
import { CustomBounce } from "gsap/CustomBounce";
import { CustomWiggle } from "gsap/CustomWiggle";
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin";
import GSDevTools from "gsap/GSDevTools";

// Make GSAP available globally for video export
window.gsap = gsap;

gsap.registerPlugin(
  ScrollTrigger, 
  ScrollSmoother, 
  SplitText, 
  MorphSVGPlugin, 
  ScrollToPlugin, 
  CustomBounce, 
  CustomEase, 
  CustomWiggle, 
  DrawSVGPlugin,
  GSDevTools
);

document.addEventListener("DOMContentLoaded", function () {
  console.log("Logo animation initialized");

  function loadSVGs(svgs) {
    const fetchPromises = svgs.map((svg) => fetch(svg.url).then((response) => response.text()));

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
    MorphSVGPlugin.convertToPath("circle, rect, ellipse, line, polygon, polyline");
   
    // Create the main animation timeline
    const mainTimeline = gsap.timeline({
      // repeat: -1,
      // repeatDelay: 3,
      defaults: {
        ease: "power2.inOut",
      },
      onComplete: () => console.log("Animation complete")
    });

    // Make timeline globally accessible for video export
    window.tl = mainTimeline;

    // Create GSDevTools for debugging (use mainTimeline, not undefined tlOpen)
    GSDevTools.create({timeline: mainTimeline});


    gsap.set('#paper', {
      autoAlpha: 0,
      transformOrigin: 'center bottom'
    })
    // Chain all animation steps to the main timeline
    mainTimeline
      .from('#text > *', {autoAlpha: 0, stagger: 0.1})
      .from('#arrow', {y: '+=10', repeat: 2, yoyo: true, autoAlpha: 0})
      .to('#arrow', {autoAlpha: 0})
      .to('#button', {autoAlpha: 0, scale: 0, transformOrigin: 'center center'}, '<')
      .to('#text > *', {autoAlpha: 0, stagger: 0.1}, '<')
      .to('#closed', {
        duration: 2,
        transformOrigin: 'center top',
        fill: '#f5f5f5',
        scaleY: -1,
        ease:'linear'
      })
      .from('#pattern-top', {
        duration: 1.5,
        transformOrigin: 'center bottom',
        scaleY: 0,
        ease:'linear'
      }, '-=1')
      .add('show-paper', '-=1')
      .to(['#pattern-top', '#closed', '#shadows-inner', '#pattern-bottom', '#accents', '#body', '#bottom-shadow'], {
        duration: 2.54,
      }, 'show-paper')


      .fromTo('#envelope-half', {x: '-=1500', duration: 5}, {x: -1050}, 'show-asasdfinal')


      .from('#shadows-inner', {autoAlpha: 0, y: '+=2'}, 0.1);
  }

  // Load SVGs
  loadSVGs([{url: 'logo.svg', container: '.logo'}]);
});
