import { levelList } from "$lib/levels";
import { StageName, type Level } from "$lib/levels/types";
import type { SentimentAnalyzer } from "$lib/nlp-algorithms";
import { writable } from "svelte/store";

export const currentLevel = writable<Level>(levelList[0]);
export const currentStage = writable<StageName>(StageName.Intro);
export const currentDialogIndex = writable<number>(0);

export const analyzeText = writable<string>("");
export const analyzeIndex = writable<number>(0);
export const analyzeExplaination = writable<string>("");
export const isAnalyzing = writable<boolean>(false);
export const currentAnalyzer = writable<SentimentAnalyzer | null>(null);