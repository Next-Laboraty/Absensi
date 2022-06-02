import React from "react";
import { SvgXml } from "react-native-svg";  


export default function LoginImageHeaderThree(){  
  const svgMarkup = `
  <svg width="375" height="54" viewBox="0 0 375 54" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M178 15.0036C143.2 15.4036 87.1667 46.3365 75 54.5032L316 56.5033C289.333 48.0033 212.8 14.6036 178 15.0036Z" fill="#D0D7FC"/>
  <path d="M83.5 14.9999C25 -31 -63 49.6666 -84.5 45.4999L-38 65.5L9.5 101H348C372 98.5 415.1 81.1999 395.5 31.9999C375.9 -17.2001 288 11.4999 246.5 31.9999C205.5 57.6666 135.7 56.0459 83.5 14.9999Z" fill="#516BEB"/>
  </svg>
  
`;
  const SvgImage = () => <SvgXml xml={svgMarkup} width="100%" style={{height:54}}/>;  

  return <SvgImage />;
}