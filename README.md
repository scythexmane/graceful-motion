# Graceful Motion

PASTORA IS THE PRIMARY MOTION AND INTERACTION REFERENCE.

Reference:

https://www.framer.com/marketplace/templates/pastora/

Live visual reference:

https://pastora.framer.wiki/

The Minoj website should reproduce the same LEVEL OF POLISH, FLUIDITY and INTERACTION QUALITY demonstrated by Pastora.

Do not create generic animations.

Study the reference carefully and reproduce its interaction philosophy:

- smooth section entrances

- elegant scroll reveals

- subtle image movement

- carefully timed text reveals

- smooth navigation transitions

- polished hover states

- smooth mobile menu opening/closing

- smooth sticky navigation behavior where appropriate

- controlled image scaling

- subtle opacity transitions

- seamless state changes

- sophisticated page transitions

- consistent animation timing

- consistent easing curves

- natural sequencing between elements

The animation system must feel like one coherent system.

Do not animate every element independently.

Animations should have hierarchy.

Major visual elements can have stronger movement.

Secondary elements should have subtle movement.

Small UI elements should have minimal transitions.

Use animation to create FLOW, not spectacle.

==================================================

MOTION QUALITY

==================================================

The most important requirement is perceived smoothness.

Avoid:

- abrupt transitions

- linear-looking animations

- excessive bounce

- excessive spring effects

- random delays

- excessive parallax

- unnecessary 3D

- particles

- glowing effects

- flashy effects

- text scrambling

- animation on every single element

Use refined easing and sequencing.

Prefer:

- transform

- opacity

- clip-path

- scale

- controlled blur where appropriate

- Motion / Framer Motion

- CSS transitions

Animation should feel expensive and intentional.

==================================================

SCROLL EXPERIENCE

==================================================

Scrolling must feel like a continuous visual experience.

Sections should not simply appear one after another.

Use carefully coordinated reveal behavior.

When entering the viewport:

1. establish the section

2. reveal primary visual

3. reveal headline

4. reveal supporting content

5. reveal interaction/CTA

Do not make all elements appear simultaneously.

Use subtle stagger only where it improves hierarchy.

The page should feel fluid from top to bottom.

==================================================

IMAGE MOTION

==================================================

Images should have subtle movement.

Examples:

- controlled scale on hover

- slow reveal masks

- clip-path reveals

- subtle position movement during scroll

- smooth image transitions

Do not overanimate food or interior photography.

Photography must remain elegant.

==================================================

TYPOGRAPHY MOTION

==================================================

Large headlines may use subtle entrance animations inspired by the reference.

Use:

- opacity

- translate

- clip reveal

- masked reveal

Avoid:

- typing effects

- glitch effects

- scrambling

- exaggerated letter animations

Typography should remain elegant.

==================================================

NAVIGATION MOTION

==================================================

Navigation must feel polished.

Implement:

- smooth appearance

- active state transition

- mobile menu slide/fade

- smooth overlay

- subtle hover transitions

- smooth sticky behavior if used

The navigation should never jump abruptly.

==================================================

RESERVATION

==================================================

Reservation is the primary CTA.

Use a refined transition into the reservation experience.

Do NOT make reservation look like a generic SaaS form.

The interaction should feel like part of the restaurant website.

==================================================

MENU

==================================================

Menu is intentionally simple.

NO food images.

NO Order buttons.

NO ecommerce cards.

Use elegant typography, spacing and subtle separators.

Category switching should be smooth.

Menu items can fade/slide subtly when category changes.

==================================================

MOBILE

==================================================

Mobile must preserve the same fluidity.

Do not simply disable all animations.

Instead:

- reduce movement distance

- reduce animation duration where necessary

- simplify complex transitions

- preserve image reveals

- preserve navigation transitions

- preserve typography hierarchy

Respect prefers-reduced-motion.

==================================================

FINAL MOTION QA

==================================================

After implementation, inspect the website as a continuous scrolling experience.

Do not only inspect individual sections.

Evaluate:

- Does scrolling feel smooth?

- Do sections transition naturally?

- Are animations synchronized?

- Are delays intentional?

- Are easing curves consistent?

- Does anything feel robotic?

- Does anything feel too slow?

- Does anything feel excessive?

- Does the site feel premium?

- Does it feel like a carefully crafted Framer-quality experience?

If an animation feels unnecessary, remove it.

If a transition feels abrupt, refine it.

The goal is not maximum animation.

The goal is maximum POLISH.


Just copy the https://pastora.framer.wiki/

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/011e65f0-98ae-4559-8fa1-82ea1a22869c).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
