/// <reference types="vite/client" />


import {HdTap} from "./components";

declare global {
  interface HTMLElementTagNameMap {
    'heed-tap': HeedTap
  }
}
