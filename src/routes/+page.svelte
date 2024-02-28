<script lang="ts">
	import { goto } from "$app/navigation";
	import {Button} from "$lib/components/ui/button";
	import { levelList } from "$lib/levels";
	import { currentDialogIndex, currentLevel } from "$lib/stores/level-store";

	const goToLevel = (level: number) => {
		currentLevel.set(levelList[level]);
		
		currentDialogIndex.set(0);
		goto(`/intro`);
	};
</script>
<div class="w-full h-full flex flex-col items-center justify-center space-y-10">
	<div class="flex flex-row space-x-5">
		<img src="/images/logo.png" alt="squareup" class="h-[100px]" />
		<div class="flex flex-col">
			<p class="text-6xl font-black">Square Up</p>
			<p class="text-lg text-slate-600">An online wordplay game about the perils of AI</p>
		</div>
	</div>
	<div class="flex flex-col space-y-5 items-center">
		<p class="text-2xl">Choose your level</p>
		<div class="flex flex-row space-x-5">
			{#each levelList as level, i}
				<Button variant="outline" on:click={()=>goToLevel(i)}>{level.name}</Button>
			{/each}
		</div>
	</div>
</div>