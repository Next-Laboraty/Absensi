import React from "react";
import { SvgXml } from "react-native-svg";  


export default function LoginScreenLogoUp(){  
  const svgMarkup = `
  <svg width="65" height="80" viewBox="0 0 65 80" fill="none" xmlns="http://www.w3.org/2000/svg">
  <g filter="url(#filter0_d_24_98)">
  <rect x="4" width="23.3846" height="52" rx="11.6923" fill="#516BEB"/>
  </g>
  <g filter="url(#filter1_d_24_98)">
  <rect x="37.6155" y="20" width="23.3846" height="52" rx="11.6923" fill="#516BEB"/>
  </g>
  <defs>
  <filter id="filter0_d_24_98" x="0" y="0" width="31.3845" height="60" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
  <feFlood flood-opacity="0" result="BackgroundImageFix"/>
  <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
  <feOffset dy="4"/>
  <feGaussianBlur stdDeviation="2"/>
  <feComposite in2="hardAlpha" operator="out"/>
  <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/>
  <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_24_98"/>
  <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_24_98" result="shape"/>
  </filter>
  <filter id="filter1_d_24_98" x="33.6155" y="20" width="31.3845" height="60" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
  <feFlood flood-opacity="0" result="BackgroundImageFix"/>
  <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
  <feOffset dy="4"/>
  <feGaussianBlur stdDeviation="2"/>
  <feComposite in2="hardAlpha" operator="out"/>
  <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/>
  <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_24_98"/>
  <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_24_98" result="shape"/>
  </filter>
  </defs>
  </svg>`;
  const SvgImage = () => <SvgXml xml={svgMarkup} width="100%" />;  

  return <SvgImage />;
}