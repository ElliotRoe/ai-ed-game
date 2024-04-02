import { type Reason, type SentimentAnalyzer, type Word } from ".";
import { tokenize } from "./util";
import wordBankJson from "./word-bank.json";

// Flawed implementation of a sentiment analyzer
// Only uses positive words

export class PosWordBankAnalyzer implements SentimentAnalyzer {
    wordBank: Map<string, Word> = new Map();

    constructor() {
        const wordBankArr = wordBankJson.words as unknown as Word[];
        wordBankArr.forEach(word => {
            this.wordBank.set(word.word, word);
        });
    }

    analyzeSentiment(text: string) {
        const tokens = tokenize(text);
        let sentiment = 0;
        const reasons: Reason[] = [];
        tokens.forEach(token => {
            const word = this.wordBank.get(token);
            if (word) {
                if (word.sentiment <= 0) {
                    reasons.push({ word: token, explaination: `Hrmmmmm... I've never seen the word "${token}" before. Probably means nothing!` });
                } else {
                    sentiment += word.sentiment;
                    
                    reasons.push({ word: token, explaination: `Oh! I know the word "${token}"! It's super positive` });
                }
            }
        });
        return { sentiment, reasons };
    }
}