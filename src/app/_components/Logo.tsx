import Link from "next/link";
import { LuPopcorn } from "react-icons/lu";

export default function Logo() {
  return (
    <Link href="/">
      <span className="header-logo">
        <LuPopcorn />
      </span>
    </Link>
  );
}
