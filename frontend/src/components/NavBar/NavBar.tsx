"use client";

import { useContext } from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarCollapse,
  NavbarLink,
  NavbarToggle,
} from "flowbite-react";
import Image from "next/image";
import Link from "next/link";
import { AuthContext } from "@/providers/AuthProvider/AuthProvider";

export function NavBar() {
  const { user, logout } = useContext(AuthContext);

  return (
    <Navbar fluid rounded>
      <NavbarBrand as={Link} href="/">
        <Image
          src="/favicon.ico"
          width={36}
          height={36}
          className="mr-3"
          alt="Flowbite React Logo"
        />
        <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
          Lojinha de PW2
        </span>
      </NavbarBrand>
      <NavbarToggle />

      <NavbarCollapse>
        <NavbarLink as={Link} href="/">
          Início
        </NavbarLink>
        <NavbarLink as={Link} href="/about">
          Sobre
        </NavbarLink>

        <NavbarLink as={Link} href="/cart">
          Carrinho
        </NavbarLink>

        {user ? (
          <>
            <NavbarLink as={Link} href="/create">
              Criar Produtos
            </NavbarLink>

            <NavbarLink
              as="button"
              onClick={() => logout()}
              className="cursor-pointer font-bold text-red-500"
            >
              Sair ({user.userName})
            </NavbarLink>
          </>
        ) : (
          <>
            <NavbarLink as={Link} href="/login">
              Login
            </NavbarLink>
          </>
        )}
      </NavbarCollapse>
    </Navbar>
  );
}

export default NavBar;
