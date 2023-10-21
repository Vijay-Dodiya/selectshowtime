// import React, { useState } from "react";
// import styled from "styled-components";

// const NavbarContainer = styled.div`
//   display: flex;
//   justify-content: space-between;
//   align-items: center;
//   background-color: #333;
//   color: #fff;
//   padding: 10px 20px;
// `;

// const Logo = styled.div`
//   font-size: 24px;
//   font-weight: bold;
//   cursor: pointer;
//   margin-right: 20px;

//   @media (max-width: 768px) {
//     display: none;
//   }
// `;

// const HamburgerIcon = styled.span`
//   font-size: 24px;
//   cursor: pointer;

//   @media (min-width: 769px) {
//     display: none;
//   }
// `;

// const MobileMenu = styled.div`
//   display: none;
//   flex-direction: column;
//   position: absolute;
//   top: 60px;
//   right: 20px;
//   background-color: #333;
//   z-index: 1;
//   padding: 10px;
//   text-align: center;

//   @media (max-width: 768px) {
//     display: ${(props) => (props.isOpen ? "block" : "none")};
//     position: absolute;
//     top: 56px;
//     left: 0;
//     width: 100%;
//     flex-direction: column;
//   }
// `;

// const Links = styled.div`
//   display: flex;
//   align-items: center;

//   @media (max-width: 768px) {
//     display: none;
//   }
// `;

// const Link = styled.a`
//   color: #fff;
//   text-decoration: none;
//   margin: 10px 10px;

//   &:last-child {
//     margin-right: 0;
//   }
// `;

// const Profile = styled.div`
//   display: flex;
//   align-items: center;
// `;

// const ProfileImage = styled.img`
//   width: 40px;
//   height: 40px;
//   border-radius: 50%;
//   margin-right: 10px;
// `;

// const ActionContainer = styled.div`
//   display: flex;
//   align-items: center;
// `;

// const SignInButton = styled.button`
//   background-color: transparent;
//   color: #fff;
//   border: none;
//   cursor: pointer;
//   margin-right: 20px;
// `;

// const SearchContainer = styled.div`
//   display: flex;
//   align-items: center;
// `;

// const SearchInput = styled.input`
//   padding: 5px;
//   border: 1px solid #777;
//   border-radius: 4px;
//   margin-right: 10px;
// `;

// const SearchIcon = styled.span`
//   font-size: 20px;
//   color: #fff;
//   cursor: pointer;
// `;

// const Navbar = ({ user }) => {
//   const [isSearchVisible, setSearchVisible] = useState(false);
//   const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

//   const handleSearch = () => {
//     setSearchVisible(!isSearchVisible);
//   };

//   const toggleMobileMenu = () => {
//     setMobileMenuOpen(!isMobileMenuOpen);
//   };

//   return (
//     <NavbarContainer>
//       <Logo>Your Logo</Logo>
//       <HamburgerIcon onClick={toggleMobileMenu}>☰</HamburgerIcon>
//       <MobileMenu isOpen={isMobileMenuOpen}>
//         <Logo>Your Logo</Logo>
//         <Link href="/">Home</Link>
//         <Link href="/about">About</Link>
//         <Link href="/services">Services</Link>
//         <Link href="/contact">Contact</Link>
//       </MobileMenu>
//       <Links>
//         <Link href="/">Home</Link>
//         <Link href="/about">About</Link>
//         <Link href="/services">Services</Link>
//         <Link href="/contact">Contact</Link>
//       </Links>
//       <ActionContainer>
//         {user ? (
//           <Profile>
//             <ProfileImage src={user.profileImage} alt="User Profile" />
//             {user.username}
//           </Profile>
//         ) : (
//           <SignInButton>Sign In</SignInButton>
//         )}
//         <SearchContainer>
//           <SearchInput
//             type="text"
//             placeholder="Search..."
//             isVisible={isSearchVisible}
//           />
//           <SearchIcon onClick={handleSearch}>🔍</SearchIcon>
//         </SearchContainer>
//       </ActionContainer>
//     </NavbarContainer>
//   );
// };

// export default Navbar;

import { signOut } from "firebase/auth";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import logo from "../assets/logo.png";
import { firebaseAuth } from "../utils/firebase-config";
import { FaPowerOff, FaSearch } from "react-icons/fa";
export default function Navbar({ isScrolled }) {
  const [showSearch, setShowSearch] = useState(false);
  const [inputHover, setInputHover] = useState(false);
  const links = [
    { name: "Home", link: "/" },
    { name: "TV Shows", link: "/tv" },
    { name: "Movies", link: "/movies" },
    { name: "My List", link: "/mylist" },
  ];

  return (
    <Container>
      <nav className={`${isScrolled ? "scrolled" : ""} flex`}>
        <div className="left flex a-center">
          <div className="brand flex a-center j-center">
            <img src={logo} alt="Logo" />
          </div>
          <ul className="links flex">
            {links.map(({ name, link }) => {
              return (
                <li key={name}>
                  <Link to={link}>{name}</Link>
                </li>
              );
            })}
          </ul>
        </div>
        <div className="right flex a-center">
          <div className={`search ${showSearch ? "show-search" : ""}`}>
            <button
              onFocus={() => setShowSearch(true)}
              onBlur={() => {
                if (!inputHover) {
                  setShowSearch(false);
                }
              }}
            >
              <FaSearch />
            </button>
            <input
              type="text"
              placeholder="Search"
              onMouseEnter={() => setInputHover(true)}
              onMouseLeave={() => setInputHover(false)}
              onBlur={() => {
                setShowSearch(false);
                setInputHover(false);
              }}
            />
          </div>
          <button onClick={() => signOut(firebaseAuth)}>
            <FaPowerOff />
          </button>
        </div>
      </nav>
    </Container>
  );
}

const Container = styled.div`
  .scrolled {
    background-color: black;
  }
  nav {
    position: sticky;
    top: 0;
    height: 6.5rem;
    width: 100%;
    justify-content: space-between;
    position: fixed;
    top: 0;
    z-index: 2;
    padding: 0 4rem;
    align-items: center;
    transition: 0.3s ease-in-out;
    .left {
      gap: 2rem;
      .brand {
        img {
          height: 4rem;
        }
      }
      .links {
        list-style-type: none;
        gap: 2rem;
        li {
          a {
            color: white;
            text-decoration: none;
          }
        }
      }
    }
    .right {
      gap: 1rem;
      button {
        background-color: transparent;
        border: none;
        cursor: pointer;
        &:focus {
          outline: none;
        }
        svg {
          color: #f34242;
          font-size: 1.2rem;
        }
      }
      .search {
        display: flex;
        gap: 0.4rem;
        align-items: center;
        justify-content: center;
        padding: 0.2rem;
        padding-left: 0.5rem;
        button {
          background-color: transparent;
          border: none;
          &:focus {
            outline: none;
          }
          svg {
            color: white;
            font-size: 1.2rem;
          }
        }
        input {
          width: 0;
          opacity: 0;
          visibility: hidden;
          transition: 0.3s ease-in-out;
          background-color: transparent;
          border: none;
          color: white;
          &:focus {
            outline: none;
          }
        }
      }
      .show-search {
        border: 1px solid white;
        background-color: rgba(0, 0, 0, 0.6);
        input {
          width: 100%;
          opacity: 1;
          visibility: visible;
          padding: 0.3rem;
        }
      }
    }
  }
`;
