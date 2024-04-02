export type Reason = {
    word: string;
    explaination: string;
}

export type Result = {
    sentiment: number;
    reasons: Reason[];
}

export type WordType = "noun" | "verb" | "adjective" | "adverb" | "pronoun" | "preposition" | "conjunction" | "interjectionn";

export type Word = {
    word: string;
    type: WordType[];
    sentiment: number;
}

export interface SentimentAnalyzer {
    analyzeSentiment(text: string): Result;
}