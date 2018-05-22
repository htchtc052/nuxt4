<template>
	<div class="container">
		<div class="jumbotron">
			<h1 class="display-4">{{ $t('title') }}</h1>
			<p class="lead">{{ $t('text') }}</p>
		</div>
	</div>
</template>

<script>

	export default {
		i18n: {
			messages: {
				en: { 
					"title": "Main page",
					"text": "Welcome to our site",
				},
				ru: {
					"title": "Главная страница",
					"text": "Добро пожаловать на наш сайт",
				} 
			}
		}
		,
		computed: {
			meta_title: function() {
				return this.$t('title');
			}
		},
		metaInfo () {
			return {
				title: this.meta_title,
			}
		},

	}
</script>
