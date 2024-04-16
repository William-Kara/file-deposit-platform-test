<template>
	<!-- From here to the next comment saying otherwise, the code is only for prototyping purpose, please disregard the code quality or the optimisation regarding a potential integration of the functionalities in the future.   -->
	<div>
		<AppHeader />
		<div class="container mx-auto p-12">
			<div class="flex flex-row">
				<div class="xl:basis-2/3">
					<h2 class="text-5xl font-bold leading-snug">
						Bienvenue sur la
						<span class="text-arena-turquoise"
							>Plateforme<br />
							de Dépôt</span
						>
						de Fichiers.
					</h2>
					<p class="text-xl max-w-196 leading-loose">
						Facilitez vos échanges de documents en toute sécurité avec notre
						plateforme conviviale. Importez, gérez et partagez vos fichiers en
						quelques clics. Restez informé grâce à nos notifications en temps
						réel.
					</p>
				</div>
				<div class="basis-1/3 hidden xl:block">
					<img src="./assets/logo.png" class="w-2/3 m-auto" />
				</div>
			</div>
		</div>
		<div class="bg-arena-blue lg:flex max-lg:py-5">
			<div
				class="text-center bg-arena-yellow lg:w-1/3 m-10 rounded-3xl drop-shadow-2xl flex justify-center items-center"
			>
				<div>
					<h3 class="mt-10 mx-5 text-xl font-bold leading-loose">
						Glissez et déposez votre fichier<br />
						ou cliquez ici pour sélectionner votre fichier
					</h3>
					<p class="my-10 text-arena-grey">
						Sans limite de poids ou de type de fichier
					</p>
					<div class="mb-10">
						<input type="file" id="file" />
					</div>
				</div>
			</div>
			<div class="bg-arena-grey flex-auto m-10 rounded-3xl drop-shadow-2xl">
				<form class="rounded px-8 pt-6 pb-8 mb-4">
					<div class="mb-4">
						<label
							class="block text-gray-700 text-sm font-bold mb-2"
							for="libelle"
						>
							Libellé
						</label>
						<input
							class="shadow border rounded w-full py-2 px-3"
							id="libelle"
							type="text"
						/>
					</div>
					<label
						class="block text-gray-700 text-sm font-bold mb-2"
						for="category"
					>
						Catégorie
					</label>
					<div class="relative mb-4">
						<select
							class="shadow border rounded w-full py-2 px-3 pr-8 appearance-none"
							id="category"
						>
							<option>Sélectionner une catégorie</option>
						</select>
						<div
							class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700"
						>
							<svg
								class="fill-current h-4 w-4"
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 20 20"
							>
								<path
									d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"
								/>
							</svg>
						</div>
					</div>
					<div class="relative mb-4">
						<label
							class="block text-gray-700 text-sm font-bold mb-2"
							for="category"
						>
							Destinataire(s)
						</label>
						<div class="relative">
							<!-- Should be a select multiple -->
							<select
								class="shadow border rounded w-full py-2 px-3 pr-8 appearance-none"
								id="category"
							>
								<option>Sélectionner le(s) Destinataire(s)</option>
							</select>
							<div
								class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700"
							>
								<svg
									class="fill-current h-4 w-4"
									xmlns="http://www.w3.org/2000/svg"
									viewBox="0 0 20 20"
								>
									<path
										d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"
									/>
								</svg>
							</div>
						</div>
					</div>
					<div class="mb-4">
						<label
							class="block text-gray-700 text-sm font-bold mb-2"
							for="libelle"
						>
							Commentaire
						</label>
						<textarea class="shadow border rounded w-full py-2 px-3"></textarea>
					</div>

					<div class="text-center mt-10">
						<button
							class="bg-arena-blue hover:bg-arena-turquoise text-white font-bold py-2 px-4 rounded"
							type="button"
						>
							Envoyer le fichier
						</button>
					</div>
				</form>
			</div>
		</div>
		<div class="bg-arena-grey">
			<div class="p-12 mx-auto">
				<!-- Here, we call the table element that uses tabulator -->
				<div ref="table"></div>
			</div>
		</div>
		<!-- Back to prototyping -->
		<AppFooter />
	</div>
</template>

<script setup>
	import { ref, reactive, onMounted } from 'vue';
	import 'tabulator-tables/dist/css/tabulator.min.css';
	import { TabulatorFull as Tabulator } from 'tabulator-tables';

	const table = ref(null);
	const tabulator = ref(null);

	// [To Do] : at the moment the data can be anything, we should be adding data validation following this documentation => https://tabulator.info/docs/6.2/validate
	const columns = ref([
		{ title: 'Nom', field: 'nom' },
		{ title: 'Libellé', field: 'libelle' },
		{ title: 'Catégorie', field: 'category' },
		{ title: 'Date du Dépôt', field: 'upload_date' },
		{ title: 'Créé par', field: 'created_by' },
		{ title: 'Destinataire(s)', field: 'receiver' },
		{ title: 'Statut(s)', field: 'status', formatter: 'tickCross' },
		{ title: 'Date de Téléchargement', field: 'dowload_date' },
		{ title: 'Taille du Fichier', field: 'file_size' },
		{
			title: 'Téléchargement',
			field: 'download',
			formatter: 'html',
			cellClick: function (e, cell) {
				let row = cell.getData();
				// We should call a function that fetch the file here, I would probably just give the row ID for parameter.
				alert('Téléchargement du fichier de la ligne ' + row.id);
			},
		},
		{
			title: 'Supprimer',
			field: 'delete',
			formatter: 'html',
			cellClick: function (e, cell) {
				let row = cell.getRow().getData();
				// We should call a function that delete or change an Activated state here for the file here, I would probably just give the row ID for parameter.
				alert('Suppression du fichier de la ligne ' + row.id);
			},
		},
	]);
	const data = ref([]);

	onMounted(() => {
		if (!table.value) return;
		tabulator.value = new Tabulator(table.value, {
			data: data.value,
			reactiveData: true,
			columns: columns.value,
			layout: 'fitDataStretch', // making the last row extend to the end of the table
		});

		setTimeout(() => {
			// creating fake data for testing purpose
			data.value = [
				{
					id: 1,
					nom: 'Devis_client_153.xls',
					libelle: 'Devis pour le clien #153',
					category: 'Devis',
					upload_date: '02/05/2024',
					created_by: 'John Foo',
					receiver: 'Bob Bar',
					status: true, // this should probably check if dowload_date is empty or not
					dowload_date: '04/05/2024',
					file_size: '12 ko',
					download: '<button type="button" class="w-full">Télécharger</button>',
					delete: '<button type="button" class="w-full">Supprimer</button>',
				},
				{
					id: 2,
					nom: 'How_To_Improve.ppt',
					libelle: 'How to improve',
					category: 'Présentation',
					upload_date: '07/05/2024',
					created_by: 'Sam Wizz',
					receiver: 'Kim Fuzz',
					status: false,
					dowload_date: '',
					file_size: '53ko',
					download: '<button type="button" class="w-full">Télécharger</button>',
					delete: '<button type="button" class="w-full">Supprimer</button>',
				},
				{
					id: 3,
					nom: 'Proposition_Commerciale_ABC.pdf',
					libelle: 'Proposition commerciale pour ABC Corp',
					category: 'Proposition commerciale',
					upload_date: '25/05/2024',
					created_by: 'Michael Johnson',
					receiver: 'Emily Davis',
					status: true,
					dowload_date: '27/05/2024',
					file_size: '187 ko',
					download: '<button type="button" class="w-full">Télécharger</button>',
					delete: '<button type="button" class="w-full">Supprimer</button>',
				},
				{
					id: 4,
					nom: 'Presentation_Q1_Results.pptx',
					libelle: 'Présentation des résultats du T1 2024',
					category: 'Présentation',
					upload_date: '28/05/2024',
					created_by: 'Sophie Anderson',
					receiver: 'Mark Wilson',
					status: true,
					dowload_date: '30/05/2024',
					file_size: '82 ko',
					download: '<button type="button" class="w-full">Télécharger</button>',
					delete: '<button type="button" class="w-full">Supprimer</button>',
				},
				{
					id: 5,
					nom: 'Document_Marketing_Spring_Collection.pdf',
					libelle: 'Document marketing pour la collection printemps',
					category: 'Document marketing',
					upload_date: '01/06/2024',
					created_by: 'Ella Thompson',
					receiver: 'Lucas Martin',
					status: false,
					dowload_date: '',
					file_size: '128 ko',
					download: '<button type="button" class="w-full">Télécharger</button>',
					delete: '<button type="button" class="w-full">Supprimer</button>',
				},
				{
					id: 6,
					nom: 'Response_AO_RFP_2024-06-03.doc',
					libelle: "Réponse à l'appel d'offres RFP 2024-06-03",
					category: 'Réponse AO',
					upload_date: '04/06/2024',
					created_by: 'Oliver White',
					receiver: 'Sophia Lee',
					status: true,
					dowload_date: '06/06/2024',
					file_size: '42 ko',
					download: '<button type="button" class="w-full">Télécharger</button>',
					delete: '<button type="button" class="w-full">Supprimer</button>',
				},
				{
					id: 7,
					nom: 'Data_Analysis_Q2_2024.xlsx',
					libelle: 'Analyse des données Q2 2024',
					category: 'Data',
					upload_date: '07/06/2024',
					created_by: 'Daniel Clark',
					receiver: 'Isabella Brown',
					status: true,
					dowload_date: '09/06/2024',
					file_size: '78 ko',
					download: '<button type="button" class="w-full">Télécharger</button>',
					delete: '<button type="button" class="w-full">Supprimer</button>',
				},
			];
			tabulator.value?.setData(data.value);
		}, 5000);
	});
</script>
