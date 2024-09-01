import Link from "next/link";
import { MdOutlineMapsHomeWork } from "react-icons/md";

export default function Logo() {
  return (
    <Link href="/">
      <span className="header-logo">
        <MdOutlineMapsHomeWork />
      </span>
    </Link>
  );
}
