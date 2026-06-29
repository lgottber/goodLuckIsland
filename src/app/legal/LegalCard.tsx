import Link from "next/link";
import Icon from "../../components/Icon";
import type { IconName } from "../../components/Icon";

interface Props {
  href: string;
  icon: IconName;
  title: string;
  description: string;
  updated: string;
}

export default function LegalCard({ href, icon, title, description, updated }: Props) {
  return (
    <Link href={href} className="legal-card">
      <div className="legal-card-icon">
        <Icon name={icon} size={28} />
      </div>
      <div className="legal-card-body">
        <h2 className="legal-card-title">{title}</h2>
        <p className="legal-card-desc">{description}</p>
        <span className="legal-card-updated">Last updated: {updated}</span>
      </div>
      <div className="legal-card-arrow">
        <Icon name="arrow-right" size={16} />
      </div>
    </Link>
  );
}
