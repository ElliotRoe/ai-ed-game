<script lang="ts">
	import type { Word, WordType } from "$lib/nlp-algorithms";
    import wordBankJson from "$lib/nlp-algorithms/word-bank.json";
    import { tokenize } from "$lib/nlp-algorithms/util";
    import * as DropdownMenu from "$lib/components/ui/dropdown-menu";
	import type { Writable } from "svelte/store";
    export let sentence: Writable<string>;

    const wordBankArr = wordBankJson.words as unknown as Word[];
    const wordBank: Map<string, Word> = new Map();
    wordBankArr.forEach(word => {
        wordBank.set(word.word, word);
    });

    const tokenizedSentence = tokenize($sentence);

    const getWordsOfType = (wordType?: WordType): string[] => {
        if (!wordType) return [];
        return Array.from(wordBank.values())
            .filter(word => word.type.includes(wordType))
            .map(word => word.word);
    }

    let selectedOptions: string[] = new Array(tokenizedSentence.length).fill("");
    // Set selected option default as what is used in the sentence
    for (let i = 0; i < tokenizedSentence.length; i++) {
        if (wordBank.has(tokenizedSentence[i])) {
            selectedOptions[i] = tokenizedSentence[i];
        }
    }

    let open: boolean[] = new Array(tokenizedSentence.length).fill(false);

    // Reconstruct sentence with selected options
    $: {
        let newSentence = "";
        for (let i = 0; i < tokenizedSentence.length; i++) {
            if (wordBank.has(tokenizedSentence[i])) {
                newSentence += selectedOptions[i] + " ";
            } else {
                newSentence += tokenizedSentence[i] + " ";
            }
        }
        newSentence = newSentence.trim();
        sentence.set(newSentence);
    }
</script>

{#each tokenize($sentence) as word, i}
    {#if wordBank.has(word)}
        <div class="border p-1 rounded-md">
            <DropdownMenu.Root bind:open={open[i]}>
                <DropdownMenu.Trigger>
                    <div class="flex flex-row">
                        <span>{selectedOptions[i] || word}</span>
                        <div class="mt-1 text-slate-500">
                            {#if !open[i]}
                                <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 12 12" {...$$props}>
                                    <path fill="currentColor" d="M6 4c-.2 0-.4.1-.5.2L2.2 7.5c-.3.3-.3.8 0 1.1c.3.3.8.3 1.1 0L6 5.9l2.7 2.7c.3.3.8.3 1.1 0c.3-.3.3-.8 0-1.1L6.6 4.3C6.4 4.1 6.2 4 6 4" />
                                </svg>
                            {:else}
                                <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 12 12" {...$$props}>
                                    <path fill="currentColor" d="M6 8.825c-.2 0-.4-.1-.5-.2l-3.3-3.3c-.3-.3-.3-.8 0-1.1c.3-.3.8-.3 1.1 0l2.7 2.7l2.7-2.7c.3-.3.8-.3 1.1 0c.3.3.3.8 0 1.1l-3.2 3.2c-.2.2-.4.3-.6.3" />
                                </svg>
                            {/if}
                        </div>
                    </div>
                </DropdownMenu.Trigger>
                <DropdownMenu.Content>
                    <DropdownMenu.Group>
                        {#each getWordsOfType(wordBank.get(word)?.type[0]) as option}
                            <DropdownMenu.Item on:click={() => {
                                selectedOptions[i] = option;
                            }}>{option}</DropdownMenu.Item>
                        {/each}
                    </DropdownMenu.Group>
                </DropdownMenu.Content>
            </DropdownMenu.Root>
        </div>
    {:else}
        <span>{word}</span>
    {/if}
{/each}