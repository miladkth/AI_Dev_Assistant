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
// src/index.ts
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
// Läser in .env-filen om den finns (t.ex. API-nycklar)
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use((0, cors_1.default)()); // Tillåter cross-origin requests
app.use(express_1.default.json()); // Gör så att vi kan läsa JSON i req.body
// En enkel POST-endpoint för frågor
app.post('/api/query', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { question } = req.body;
    if (!question) {
        return res.status(400).json({ error: 'Ingen fråga angavs.' });
    }
    // Temporär hårdkodad respons – vi kopplar in AI senare
    const answer = `Du frågade: ${question}`;
    res.json({ answer });
}));
// Startar servern på port 3001
app.listen(3001, () => {
    console.log('✅ Backend körs på http://localhost:3001');
});
