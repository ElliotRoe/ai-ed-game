export type Character = {
    name: string;
    image: string;
}
export type Cast = Character[];
export type Scene = {
    background: string;
    cast: Cast;
}
export type Dialogue = {
    character: string;
    text: string;
}

export type Choice = {
    question: Dialogue;
    options: string[];
    key: number[];
    type: "multiple-select" | "single-select" | "short-answer";
}

export type Script = (Dialogue | Choice)[];
export enum StageName {
    Intro = "Intro",
    Test = "Test",
    Debrief = "Debrief"
}

export type Stage = {
    name: StageName;
    scene: Scene;
    script: Script;
}
export type Level = {
    name: string;
    stages: Stage[];
}