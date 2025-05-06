"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const editor_1 = __importDefault(require("./editor"));
function main() {
    const canvas = document.querySelector(".canvas");
    if (!canvas)
        return;
    const ctx = canvas.getContext("2d");
    if (!ctx)
        return;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const editor = new editor_1.default(canvas, ctx);
    // editor.start();
}
