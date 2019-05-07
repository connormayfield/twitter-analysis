import React from "react";
import "./style.css";

export function Wrapper(props) {
    return (
      <div className="login-wrapper">{props.children}</div>
    );
}

export function Container(props) {
    return (
      <div className="login-container">{props.children}</div>
    );
}

export function LoginForm(props) {
    return (
      <div className="login-form">{props.children}</div>
    );
}
