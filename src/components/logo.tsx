import logoImg from "@/assets/logo.jpg";

/** Brand mark. The source artwork sits on black, so it is blended onto dark surfaces. */
export function Logo({ className = "h-11 w-11" }: { className?: string }) {
  return (
    <img
      src={logoImg}
      alt="Minoj by Rumayso"
      width={150}
      height={150}
      className={`${className} select-none object-contain mix-blend-screen`}
    />
  );
}
