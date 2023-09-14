<template>
	<!-- Barra superior -->
	<v-app-bar order="1" :elevation="11">
		<v-app-bar-nav-icon variant="text" @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
	</v-app-bar>
	<!-- Barra oculta -->
	<v-navigation-drawer order="0" v-model="drawer" temporary floating>
		<v-list :items="items"></v-list>
	</v-navigation-drawer>
</template>

<script setup>
	import { ref } from 'vue'
	let drawer = ref(false);
	// Coloca dentro las opciones y separadores de la barra oculta
	let items = ref([
		{title: 'Opciones' },
		{type: 'divider'},
		{title: 'Home', value: 'inicio', props:{prependIcon:'mdi-view-dashboard', to:'/'}},
		{title: 'Tabla', value: 'tabla', props:{prependIcon:'mdi-table', to:'/Tabla'}},
		{title: 'Matriz', value: 'Matriz', props:{prependIcon:'mdi-table', to:'/Matriz'}},
	]);
</script>
