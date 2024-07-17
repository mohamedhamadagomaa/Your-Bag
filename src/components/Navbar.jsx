import React from "react";
import { useSelector } from "react-redux";
import { CartIcon, Cart } from "../icons";
const Navbar = () => {
  // destructured method
  const { amount } = useSelector((store) => store.cart);
  return (
    <nav>
      <div className="nav-center">
        <h1>
          <Cart />
        </h1>
        <div className="nav-container">
          <CartIcon />
          <div className="amount-container">
            <p className="total-amount">{amount}</p>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
