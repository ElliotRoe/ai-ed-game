import { levelList } from "$lib/levels";
import { StageName, type Level } from "$lib/levels/types";
import { writable } from "svelte/store";

export const currentLevel = writable<Level>(levelList[0]);
export const currentStage = writable<StageName>(StageName.Intro);
export const currentDialogIndex = writable<number>(0);