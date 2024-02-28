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
export type Script = Dialogue[];
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