<script lang="ts">
	import ModifyableSentence from "$lib/components/modifyable-sentence.svelte";
import Progress from "$lib/components/progress.svelte";
	import { Button } from "$lib/components/ui/button";
	import { levelList } from "$lib/levels";
	import { StageName, type Dialogue, type Choice } from "$lib/levels/types";
	import type { Result } from "$lib/nlp-algorithms";
	import { PosWordBankAnalyzer } from "$lib/nlp-algorithms/positive-word-bank-analyzer";
	import { tokenize } from "$lib/nlp-algorithms/util";
	import { currentLevel, currentDialogIndex, isAnalyzing, analyzeText, analyzeIndex, currentAnalyzer } from "$lib/stores/level-store";

    let currentDialog = "";
    let currentCharacterUrl = "";
    let isQuestion = false;
    let choices: string[] = [];
    $: {
        if ($currentLevel){
            if (($currentLevel.stages[1].script[$currentDialogIndex] as any).text){
                currentDialog = ($currentLevel.stages[1].script[$currentDialogIndex] as Dialogue).text;
                const currentCharacterName = ($currentLevel.stages[1].script[$currentDialogIndex] as Dialogue).character;
                currentCharacterUrl = $currentLevel.stages[1].scene.cast.filter(c => c.name === currentCharacterName).map(c => currentCharacterUrl = c.image)[0];
            } else {
                isQuestion = true;
                currentDialog = ($currentLevel.stages[1].script[$currentDialogIndex] as Choice).question.text;
                const currentCharacterName = ($currentLevel.stages[1].script[$currentDialogIndex] as Choice).question.character;
                currentCharacterUrl = $currentLevel.stages[1].scene.cast.filter(c => c.name === currentCharacterName).map(c => currentCharacterUrl = c.image)[0];
                choices = ($currentLevel.stages[1].script[$currentDialogIndex] as Choice).options;
            }
        }
    }

    let result: Result;

    const startAnalyze = () => {
        if (!$currentAnalyzer) {
            $currentAnalyzer = new PosWordBankAnalyzer();
        }

        result = $currentAnalyzer.analyzeSentiment($analyzeText);
        
        let end = false;
        currentDialog = result.reasons[$analyzeIndex].explaination;
        const analzyeInterval = setInterval(() => {
            $analyzeIndex = $analyzeIndex + 1;
            if ($analyzeIndex < result.reasons.length ) {
                currentDialog = result.reasons[$analyzeIndex].explaination;
            } else {
                clearInterval(analzyeInterval);
                $isAnalyzing = false;
                currentDialog = `Therefore this entire sentence is ${result.sentiment > 0 ? "positive" : "negative"}!\nWhat do you think?`
            }
        }, 2000);
    }

    $: {
        console.log($analyzeText);
    }

</script>
<div class="flex flex-col w-full items-start space-y-10 h-full justify-between">
    <div class="flex flex-row justify-center w-full">
        <Progress stages={[StageName.Intro, StageName.Test, StageName.Debrief]} currentStage="Test" />
    </div>  
    <div class="flex w-full justify-center">
        <div class="card rounded-full p-2 flex flex-row text-2xl font-bold w-3/5 p-5 space-x-2 items-center">
            {#if !$analyzeText}
                <p>Waiting for choice...</p>
            {:else if !result}
                <ModifyableSentence sentence={analyzeText} />
            {:else}
                {#each tokenize($analyzeText) as word}
                    {#if result.reasons[$analyzeIndex]?.word == word}
                        <span class="text-green-500 px-2 rounded-full border border-green-500">{word}</span>
                    {:else}
                        <span>{word}</span>
                    {/if}
                {/each}
            {/if}
        </div>
    </div>
    {#if isQuestion}
            <div class="flex flex-row space-x-2 w-full justify-center">
                {#each choices as choice}
                <Button class="rounded-full text-lg" variant={$analyzeText != choice ? "outline" : "default"} disabled={$isAnalyzing} on:click={() => {
                    $isAnalyzing = true;
                    $analyzeText = choice;
                    $analyzeIndex = 0;
                }}>{choice}</Button>
                {/each}
            </div>
        {/if}
    <div class="flex flex-col w-full items-end space-y-10">
        <div class="flex justify-end w-full">
            <div class="card p-2 flex flex-col text-lg w-3/5 p-5">
                <p>{currentDialog}</p>
            </div>
            <img src={currentCharacterUrl} alt="janet" class="h-[300px]" />
        </div>
    </div>
    <div class="flex flex-row space-x-2 w-full justify-center">
        {#if $isAnalyzing}
            <Button on:click={() => startAnalyze()}>Analyze</Button>
        {:else}
            <Button disabled={isQuestion} on:click={() => currentDialogIndex.set($currentDialogIndex+1)}>Next</Button>
        {/if}
    </div>
</div>