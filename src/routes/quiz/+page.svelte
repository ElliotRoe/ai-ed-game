<script lang="ts">

	import MultiSelect from "$lib/components/multi-select.svelte";
    import type { States } from "$lib/components/multi-select.svelte";
	import Progress from "$lib/components/progress.svelte";
	import { Button } from "$lib/components/ui/button";
	import { StageName, type Dialogue, type Choice } from "$lib/levels/types";
	import { currentLevel, currentDialogIndex } from "$lib/stores/level-store";
    
    const defaultState:States = "unselected";

    let currentDialog = "";
    let currentCharacterUrl = "";
    let currentQuestionType = "";
    let multiSelectState: States[] = new Array($currentLevel.stages[2].script[$currentDialogIndex].options.length).fill(defaultState);
	const stage = 2;
	
    $: {
        if ($currentLevel){
            currentDialog = ($currentLevel.stages[stage].script[$currentDialogIndex] as Choice).question.text;
            currentQuestionType = ($currentLevel.stages[stage].script[$currentDialogIndex] as Choice).type;
            const currentCharacterName = ($currentLevel.stages[stage].script[$currentDialogIndex] as Choice).question.character;
            currentCharacterUrl = $currentLevel.stages[stage].scene.cast.filter(c => c.name === currentCharacterName).map(c => currentCharacterUrl = c.image)[0];
        }
    }

    let submitted = false;

    const submit = () => {
        multiSelectState.map((state, i) => {
            if (state === "selected") {
                if (($currentLevel.stages[stage].script[$currentDialogIndex] as Choice).key.includes(i)) {
                    multiSelectState[i] = "correct";
                } else {
                    multiSelectState[i] = "incorrect";
                }
            }
        });
        submitted = true;
    }

    const next = () => {
        submitted = false;
        $currentDialogIndex += 1;
        multiSelectState = new Array($currentLevel.stages[stage].script[$currentDialogIndex].options.length).fill(defaultState);
    }

</script>
<div class="flex flex-col w-full items-start space-y-10 h-full justify-between">
    <div class="flex flex-row justify-center w-full">
        <Progress stages={[StageName.Intro, StageName.Test, StageName.Debrief]} currentStage="Debrief" />
    </div>
    <div class="flex w-full justify-end">
        <div class="card p-2 flex flex-col text-lg w-3/5 p-5">
            <p>{currentDialog}</p>
        </div>
    </div>
    <div class="flex w-full justify-end">
        <img src={currentCharacterUrl} alt="janet" class="h-[300px]" />
    </div>
    <div class="flex flex-row justify-center items-center w-full space-x-4">
        <div class="grid grid-cols-2 gap-4">
            {#each $currentLevel.stages[stage].script[$currentDialogIndex].options as option, i}
                {#if currentQuestionType === "multiple-select"}
                    <MultiSelect disabled={submitted} bind:state={multiSelectState[i]}><p class="text-2xl">{option}</p></MultiSelect>
                {:else if currentQuestionType === "single-select"}
                    <Button variant="outline"><p class="text-2xl">{option}</p></Button>
                {/if}
            {/each}
        </div>
        {#if currentQuestionType === "multiple-select"}
            {#if submitted}
                <Button on:click={next}><p class="text-2xl">Next</p></Button>
            {:else}
                <Button on:click={submit}><p class="text-2xl">Submit</p></Button>
            {/if}
        {/if}
    </div>
</div>