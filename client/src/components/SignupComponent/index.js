import React from "react";
import "./style.css";

export function Wrapper(props) {
  return (
    <div className="signup-wrapper">{props.children}</div>
  );
}

export function Container(props) {
  return (
    <div className="signup-container">{props.children}</div>
  );
}

export function SignupForm(props) {
  return (
    <div className="signup-form">{props.children}</div>
  );

}
