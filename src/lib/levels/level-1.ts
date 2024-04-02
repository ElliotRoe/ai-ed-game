import { type Level, type Character, type Script, StageName } from "$lib/levels/types"

const janet: Character = {
    name: "Janet",
    image: "/images/janet.jpeg"
}
const coffeeAi: Character = {
    name: "Coffee AI",
    image: "/images/coffeeAi.png"
}

const introScript: Script = [
    {
        character: "Janet",
        text: "Hi I'm Janet! And my little coffee shop has turned into a booming business. I'm taking it world wide with a website so people can chat and buy my coffee."
    },
    {
        character: "Janet",
        text: "I built my AI to detect how people feel about my coffee and I want them to feel good, so I trained my AI on all happy comments! Will you help me test it?"
    },
    {
        character: "Coffee AI",
        text: "Hi, I'm CoffeeAI! My job is to judge sentences and decide if they're happy or not. I know a lot of examples of happy sentences but not much about negative sentences"
    },
]

const testScript: Script = [{
    question: {
        character: "Coffee AI",
        text: "Go ahead and test me! I do great on all these sentences",
    },
    type: "single-select",
    options: ["I love Janet's coffee", "I think Janet's coffee has a great taste", "It's lovely", "It's pure fun"],
    key: [0,1,2,3]
}]

const debriefScript: Script = [
    {
        question: {
            character: "Janet",
            text: "To figure out how well the AI performed, we have to figure out who the stakeholder's are of this AI. Who do you think the stakeholders are?",
        },
        type: "multiple-select",
        options: ["Janet", "Coffee AI", "The customers", "Investors"],
        key: [0, 2, 3]
    },
    {
        question: {
            character: "Janet",
            text: "That's right! The stakeholders are Janet, the customers, and the investors. We all have a stake in how well the AI performs because it affects our business."
        },
        type: "multiple-select",
        options: [],
        key: []
    },
    {
        question: {
            character: "Janet",
            text: "How did the AI performance effect each of the stakeholders of Janet's coffee?",
        },
        type: "multiple-select",
        options: ["It gave Janet a false sense of security", "It told the truth to customers", "It gave Janet a correct idea of her coffee's performance", "It lied to the customers"],
        key: [0, 3]
    },
    {
        question: {
            character: "Janet",
            text: "How could Janet improve the AI's performance?",
        },
        type: "multiple-select",
        options: ["Train on more positive examples", "Reduce Janet's algorithmic bias", "Implement regular testing strategies", "Train on more negative examples"],
        key: [3, 2]
    },
]

const level1: Level = {
    name: "Level 1",
    stages: [
        {
            name: StageName.Intro,
            scene: {
                background: "/images/coffee-shop.jpeg",
                cast: [janet, coffeeAi]
            },
            script: introScript
        },
        {
            name: StageName.Test,
            scene: {
                background: "/images/coffee-shop.jpeg",
                cast: [janet, coffeeAi]
            },
            script: testScript
        },
        {
            name: StageName.Debrief,
            scene: {
                background: "/images/coffee-shop.jpeg",
                cast: [janet, coffeeAi]
            },
            script: debriefScript
        }
    ]
}   

export default level1;