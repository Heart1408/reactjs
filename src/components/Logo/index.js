import React from "react";
import styled from "styled-components";

export default function index() {
  return (
    <Logo>
      <p className="first">
        <p className="eas">Eas</p>y
      </p>
      <p className="last">Table</p>
    </Logo>
  );
}

const Logo = styled.div`
  display: flex;
  font-size: 33px;
  justify-content: center;
  padding: 10px 0;
  font-weight: bold;
  margin: 5px;

  p {
    margin: 0;
  }

  .first {
    color: #131339;
    display: flex;
    align-items: flex-end;

    .eas {
      border-bottom: 3px solid #131339;
      margin-bottom: 5px;
      line-height: 30px;
      padding-left: 3px;
    }
  }

  .last {
    color: #800000;
    font-style: italic;
  }
`;
