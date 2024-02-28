<script>
	import Progress from "$lib/components/progress.svelte";
	import { Button } from "$lib/components/ui/button";
	import { StageName } from "$lib/levels/types";
	import { currentLevel, currentDialogIndex } from "$lib/stores/level-store";
    
    let currentDialog = "";
    let currentCharacterUrl = "";
    $: {
        if ($currentLevel){
            currentDialog = $currentLevel.stages[0].script[$currentDialogIndex].text;
            const currentCharacterName = $currentLevel.stages[0].script[$currentDialogIndex].character;
            currentCharacterUrl = $currentLevel.stages[0].scene.cast.filter(c => c.name === currentCharacterName).map(c => currentCharacterUrl = c.image)[0];
        }
    }

</script>
<div class="flex flex-col w-full items-start space-y-10 h-full justify-between">
    <div class="flex flex-row justify-center w-full">
        <Progress stages={[StageName.Intro, StageName.Test, StageName.Debrief]} currentStage="Intro" />
    </div>
    <div class="flex w-full justify-end">
        <div class="card p-2 flex flex-col text-lg w-3/5 p-5">
            <p>{currentDialog}</p>
        </div>
    </div>
    <div class="flex w-full justify-end">
        <img src={currentCharacterUrl} alt="janet" class="h-[300px]" />
    </div>
    <div class="flex flex-row space-x-2 w-full justify-center">
        <Button on:click={() => currentDialogIndex.set($currentDialogIndex+1)}>Next</Button>
    </div>
</div>