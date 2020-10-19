import React from "react";
import HeaderLoggedOut from "./HeaderLoggedOut";
import HeaderLoggedIn from "./HeaderLoggedIn";

function Header(props) {
	return <>{props.loggedIn ? <HeaderLoggedIn /> : <HeaderLoggedOut />}</>;
}

export default Header;
