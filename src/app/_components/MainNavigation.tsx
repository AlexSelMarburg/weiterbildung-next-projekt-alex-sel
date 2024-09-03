import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaBars } from "react-icons/fa6";
import { FaTimes } from "react-icons/fa";
import { useToggle } from "@/lib/hooks/useToggle";
import { useEffect } from "react";

type LinkTarget = {
  text: string;
  url: string;
};

export const linkTargets = [
  {
    text: "Home",
    url: "/",
  },
  {
    text: "Filme",
    url: "/movies",
  },
  {
    text: "Bookmarks",
    url: "/bookmarks",
  },
] satisfies LinkTarget[];

export default function MainNavigation() {
  const pathname = usePathname();
  const [isOpen, toogleMenu, , , closeMenu] = useToggle(false);

  useEffect(closeMenu, [pathname, closeMenu]);

  return (
    <nav className="main-navigation">
      <ul className={isOpen ? "active" : ""}>
        {getMenuItems(linkTargets, pathname)}
      </ul>

      <div id="mobile-toggle">
        {isOpen ? (
          <FaTimes className="mobile-toggle-btn" onClick={() => toogleMenu()} />
        ) : (
          <FaBars className="mobile-toggle-btn" onClick={() => toogleMenu()} />
        )}
      </div>
    </nav>
  );
}

function getMenuItems(linkTargets: LinkTarget[], pathname: string) {
  return linkTargets.map(({ text, url }) => {
    const isCurrentPage = url === pathname;

    return (
      <li key={url}>
        <Link href={url} className={isCurrentPage ? "active" : ""}>
          {text}
        </Link>
      </li>
    );
  });
}
