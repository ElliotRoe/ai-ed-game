<script lang="ts">
    export let stages: string[] = [];
    export let currentStage: string = "";

    function getStageColor(stage: string): string {
        if (stage === currentStage) {
            return "orange";
        } else if (stages.indexOf(stage) < stages.indexOf(currentStage)) {
            return "green";
        } else {
            return "gray";
        }
    }
</script>

<div class="flex flex-row space-x-20 p-2">
    {#each stages as stage}
        <div class="flex flex-col items-center space-y-2">
            <div class="w-16 h-16 rounded-full" style="background-color: {getStageColor(stage)}"/>
            <p class="text-lg font-bold">{stage}</p>
        </div>
    {/each}
</div>