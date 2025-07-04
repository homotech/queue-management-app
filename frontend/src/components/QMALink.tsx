import Link from "next/link";

interface QMALinkProps {
  children: React.ReactNode;
  href: string;
  additionalStyles?: string;
}

const QMALink = ({ children, href, additionalStyles }: QMALinkProps) => {
  return (
    <Link
      href={href}
      className={`text-gray-500 hover:underline ${additionalStyles}`}
    >
      {children}
    </Link>
  );
};
export default QMALink;
