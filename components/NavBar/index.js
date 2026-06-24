import Link from "next/link";
import { useRouter } from "next/router";
import { StyledNav, NavList, NavItem } from "./NavBar.styled";

export default function NavBar() {
  const router = useRouter();

  return (
    <StyledNav>
      <NavList>
        <NavItem className={router.pathname === "/dashboard" ? "active" : ""}>
          <Link href="/dashboard">Home</Link>
        </NavItem>

        <NavItem className={router.pathname === "/checktiming" ? "active" : ""}>
          <Link href="/checktiming">Time</Link>
        </NavItem>

        <NavItem className={router.pathname === "/saveddates" ? "active" : ""}>
          <Link href="/saveddates">Saved Dates</Link>
        </NavItem>
      </NavList>
    </StyledNav>
  );
}
