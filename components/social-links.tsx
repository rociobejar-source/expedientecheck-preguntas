const socialLinks = [
  {
    label: "Ver YouTube",
    helper: "@ExpedienteCheck",
    href: "https://www.youtube.com/@ExpedienteCheck"
  },
  {
    label: "Seguir en LinkedIn",
    helper: "ExpedienteCheck",
    href: "https://www.linkedin.com/company/expedientecheck/"
  }
];

type SocialLinksProps = {
  className?: string;
  variant?: "default" | "success";
};

export default function SocialLinks({
  className = "",
  variant = "default"
}: SocialLinksProps) {
  const linkClass =
    variant === "success"
      ? "border-brand-green/20 bg-white text-brand-blue hover:border-brand-blue/30"
      : "border-brand-blue/10 bg-brand-beige/60 text-brand-blue hover:border-brand-gold/50 hover:bg-white";

  return (
    <div className={`grid gap-3 sm:grid-cols-2 ${className}`}>
      {socialLinks.map((link) => (
        <a
          key={link.href}
          className={`rounded-lg border px-4 py-3 text-sm font-bold transition ${linkClass}`}
          href={link.href}
          target="_blank"
          rel="noreferrer"
        >
          <span className="block">{link.label}</span>
          <span className="mt-1 block text-xs font-medium text-slate-500">
            {link.helper}
          </span>
        </a>
      ))}
    </div>
  );
}
