import "./index.scss";
import { gsap } from "gsap";
import { MorphSVGPlugin } from "gsap/MorphSVGPlugin";
import { GSDevTools } from "gsap/GSDevTools";

gsap.registerPlugin(MorphSVGPlugin, GSDevTools);

window.gsap = gsap;

/**
 * Envelope Animation Application
 * Loads SVG content and creates a complex envelope opening animation using GSAP
 */

/**
 * Configuration
 */
const CONFIG = {
  svgAssets: [{ url: "envelope.svg", container: ".envelope" }],
  animation: {
    defaultEase: "power2.inOut",
    debug: true,
  },
};

/**
 * Load SVG assets into their respective containers
 * @param {Array} assets - Array of {url, container} objects
 * @returns {Promise<void>}
 */
async function loadSVGAssets(assets) {
  try {
    const fetchPromises = assets.map((asset) =>
      fetch(asset.url).then((response) => response.text())
    );

    const svgContents = await Promise.all(fetchPromises);

    svgContents.forEach((content, index) => {
      const container = document.querySelector(assets[index].container);
      if (container) {
        container.innerHTML = content;
      }
    });

    initializeAnimation();
  } catch (error) {
    console.error("Failed to load SVG assets:", error);
  }
}

/**
 * Create and configure the main envelope animation timeline
 * @returns {gsap.core.Timeline}
 */
function createAnimationTimeline() {
  const timeline = gsap.timeline({
    defaults: {
      ease: CONFIG.animation.defaultEase,
    },
    onComplete: () => console.log("Envelope animation completed"),
  });

  // Make timeline globally accessible
  window.tl = timeline;

  // Enable debugging tools if configured
  if (CONFIG.animation.debug) {
    GSDevTools.create({ timeline });
  }

  return timeline;
}

/**
 * Configure animation sequence for envelope opening
 * @param {gsap.core.Timeline} timeline - Main animation timeline
 */
function setupEnvelopeAnimation(timeline) {
  timeline
    // Initial text reveal
    .from("#text > *", { autoAlpha: 0, stagger: 0.1 })

    // Arrow bounce animation
    .from("#arrow", { y: "+=10", repeat: 2, yoyo: true, autoAlpha: 0 })

    // Hide interactive elements
    .to("#arrow", { autoAlpha: 0 })
    .to(
      "#button",
      {
        autoAlpha: 0,
        scale: 0,
        transformOrigin: "center center",
      },
      "<"
    )
    .to("#text > *", { autoAlpha: 0, stagger: 0.1 }, "<")

    // Envelope opening sequence
    .to("#closed", {
      duration: 2,
      transformOrigin: "center top",
      fill: "#f5f5f5",
      scaleY: -1,
      ease: "linear",
    })

    // Pattern and paper emergence
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

    // Paper sliding animation
    .to("#paper-mask", { y: "+=500", duration: 2.5 })

    // Envelope elements movement
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

    // Final reveal and shadow effects
    .from("#paper-mask-full", { autoAlpha: 0, duration: 0.01 }, "-=1")
    .from("#shadows-inner", { autoAlpha: 0, y: "+=2" }, 0.1);
}

/**
 * Initialize the GSAP animation system
 */
function initializeAnimation() {
  console.log("Initializing envelope animation");

  // Convert SVG shapes to paths for morphing capabilities
  MorphSVGPlugin.convertToPath(
    "circle, rect, ellipse, line, polygon, polyline"
  );

  // Create and configure animation timeline
  const mainTimeline = createAnimationTimeline();

  // Setup envelope animation sequence
  setupEnvelopeAnimation(mainTimeline);
}

/**
 * Application initialization
 */
document.addEventListener("DOMContentLoaded", () => {
  console.log("Envelope animation application initialized");
  loadSVGAssets(CONFIG.svgAssets);
});
