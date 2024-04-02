<script lang="ts" context="module">
    export type States = "selected" | "unselected" | "correct" | "incorrect";
</script>


<script lang="ts">
	import Button from "./ui/button/button.svelte";

    export let state:States = "unselected";
    export let disabled = false;

    let buttonStyles: Record<States, string> = {
        selected: "background-color: #0F172A; color: white;",
        unselected: "background-color: white;",
        correct: "background-color: green; color: white;",
        incorrect: "background-color: #FF0000; color: white;"
    }
</script>

<Button variant="outline" bind:disabled
    style={`
        ${buttonStyles[state]}
    `} class="rounded-full" {...$$props}
    on:click={() => state = state === "selected" ? "unselected" : "selected"}
><slot/></Button>   