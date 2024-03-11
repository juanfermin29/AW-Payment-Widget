import { css } from "lit";

export const modalStyles = css`
  .wrapper {
    border: 1px solid black;
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(51, 51, 51, 0.5);
   /*  background-color: #333;  */
    opacity: 0;
    visibility: hidden;
    transform: scale(1.1);
    transition: visibility 0s linear 0.25s, opacity 0.25s 0s, transform 0.25s;
    z-index: 1;
  }

  .visible {
    opacity: 1;
    visibility: visible;
    transform: scale(1);
    transition: visibility 0s linear 0s, opacity 0.25s 0s, transform 0.25s;
  }

  .modal {
    font-size: 14px;
    padding: 10px 10px 5px 10px;
    background-color: #D9D9D9; 
    position: absolute;
    top: 50%;
    left: 50%;
    padding-bottom: 20px;
    padding-top:20px;
    transform: translate(-50%, -50%);
    border-radius: 2px;
    width: 350px;
    height:570px;
  }

  .title {
    color: black;
    font-size: 18px;
  }

  .button-container {
    text-align: right;
  }

  button {
    margin-left: 5px;
    min-width: 80px;
    background-color: dodgerblue;
    border-color: #848e97;
    border-style: solid;
    border-radius: 2px;
    padding: 3px;
    color: white;
    cursor: pointer;
  }

  button:hover {
    background-color: #6c757d;
    border-color: #6c757d;
  }


`;
