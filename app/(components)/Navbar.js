"use client"
import Link from "next/link";
import Image from "next/image";
import React, { useState } from "react";
import Logo from "./Logo";
import NavItem from "./NavItem";
import { useUser } from "@auth0/nextjs-auth0/client";

const MENU_LIST = [
  { text: "Home", href: "/" },
  { text: "Quizzes", href: "/quiz" },
  { text: "Flashcards", href: "/flashcards/savedCards" },
  { text: "Study Sessions", href: "/study" },
  { text: "Login", href: "/login" },
];

const Navbar = () => {
  const [navActive, setNavActive] = useState(null);
  const [activeIdx, setActiveIdx] = useState(-1);
  const { user } = useUser(); 
  return (
    <header>
      <nav className={`nav`}>
        <Link href={"/"}>
            <h1 className="logo">BrainBuddy</h1>
        </Link>
        <div
          onClick={() => setNavActive(!navActive)}
          className={`nav__menu-bar`}
        >
        </div>
        <div className={`${navActive ? "active" : ""} nav__menu-list`}>
          {MENU_LIST.map((menu, idx) => (
            <div
              onClick={() => {
                setActiveIdx(idx);
                setNavActive(false);
              }}
              key={menu.text}
            >
              <NavItem active={activeIdx === idx} {...menu} />
            </div>
          ))}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
