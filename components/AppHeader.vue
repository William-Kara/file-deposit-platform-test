<template>
	<div class="w-full">
		<button
			class="bg-arena-blue hover:bg-arena-turquoise text-white font-bold py-2 px-4 rounded m-3 absolute right-2"
			type="button"
		>
			Loggin
		</button>
		<div class="flex" v-if="modal_on">
			<div class="fixed bottom-4 right-4 z-50">
				<div
					class="bg-white rounded-lg border-arena-turquoise border-4 p-3 shadow-xl"
				>
					<button
						@click="modal_on = false"
						type="button"
						class="bg-white rounded-md p-1 inline-flex items-center justify-center right-3 bottom-16 fixed border-4 border-arena-blue hover:border-arena-red"
					>
						<svg
							class="h-6 w-6"
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
							aria-hidden="true"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M6 18L18 6M6 6l12 12"
							/>
						</svg>
					</button>
					<div class="flex flex-row">
						<div class="ml-2 mr-6">
							<span class="font-semibold"
								>Vous avez un fichier à télécharger</span
							>
							<span class="block text-gray-500"
								>Ceci est un exemple de notification</span
							>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
	import { ref } from 'vue';

	const modal_on = ref(true);
</script>
