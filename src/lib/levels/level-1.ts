import { type Level, type Character, type Script, StageName } from "$lib/levels/types"

const janet: Character = {
    name: "Janet",
    image: "/images/janet.jpeg"
}

const introScript: Script = [
    {
        character: "Janet",
        text: "Hi I'm Janet! And my little coffee shop has turned into a booming business. I'm taking it world wide with a website so people can chat and buy my coffee."
    },
    {
        character: "Janet",
        text: "I built my AI to detect how people feel about my coffee and I want them to feel good, so I trained my AI on all happy comments! Will you help me test it?"
    }
]

const level1: Level = {
    name: "Level 1",
    stages: [
        {
            name: StageName.Intro,
            scene: {
                background: "/images/coffee-shop.jpeg",
                cast: [janet]
            },
            script: introScript
        }
    ]
}   

export default level1;