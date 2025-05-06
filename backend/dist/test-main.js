"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/test-main.ts
const axios_1 = __importDefault(require("axios"));
// Körs direkt: gör en POST-förfrågan till vår endpoint
(() => __awaiter(void 0, void 0, void 0, function* () {
    const res = yield axios_1.default.post('http://localhost:3001/api/query', {
        question: 'Vad är TypeScript?',
    });
    console.log('Svar från servern:', res.data);
}))();
