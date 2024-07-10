import React from 'react';
import "./Header.css"
import logo from "../../../images/logo.jpg";
import { FaCartArrowDown } from "react-icons/fa";
import { IoSearchSharp } from "react-icons/io5";
import { CgProfile } from "react-icons/cg";

const Header = () => {
return (
    <>
      <nav className="navbar">
        <div className="web-header">
        <div className='weblogo'>
        <a href="/" className="navbar-brand"><img src={logo} loading="lazy" alt="" /></a>
        </div>
        <ul className="navbar-nav">
          <li className="nav-item"><a href="/" className="nav-link">Home</a></li>
          <li className="nav-item"><a href="/products" className="nav-link">Products</a></li>
          <li className="nav-item"><a href="/contact" className="nav-link">Contact</a></li>
          <li className="nav-item"><a href="/about" className="nav-link">About</a></li>
        </ul>
        <div className='icons-section'>
          <a href="/cart"><FaCartArrowDown /></a>
          <a href="/search"><IoSearchSharp /></a>
          <a href="/login"><CgProfile /></a>
        </div>
        </div>
        <div className='hamburger'>
        <label className="hamburger-menu">
      <input type="checkbox" />
    </label>
    <aside className="side-bar">
      <div>
        <a href="/" ><img className="navbar-logo" src={logo} loading="lazy" alt="" /></a>
        </div>
        <ul className="navbar-nav">
          <li className="nav-item"><a href="/" className="nav-link">Home</a></li>
          <li className="nav-item"><a href="/products" className="nav-link">Products</a></li>
          <li className="nav-item"><a href="/contact" className="nav-link">Contact</a></li>
          <li className="nav-item"><a href="/about" className="nav-link">About</a></li>
        </ul>
        <div className='icons-section'>
          <a href="/cart"><FaCartArrowDown /></a>
          <a href="/search"><IoSearchSharp /></a>
          <a href="/login"><CgProfile /></a>
        </div>
    </aside>
        </div>
      </nav>
    </>
  )
}
export default Header