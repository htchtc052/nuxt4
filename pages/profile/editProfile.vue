<template>
	<div class="mx-auto">
		<div class="card">
			<h2 class="card-title mx-auto">
				{{ $t('title') }}
			</h2>
			<div class="card-body">
					<form @submit.prevent="submit" role="form" class="form">
						<div class="form-group">
							<label for="name">{{ $t('name') }}</label>
							<input
								type="text"
								class="form-control"
								:class="{'is-invalid' : error.name}"
								id="name"
								v-model="form.name"
								:disabled="loading"
							/>
							<div class="invalid-feedback" v-show="error.name">{{ error.name }}</div>
						</div>
						<div class="form-group mx-auto">
							<button type="submit" class="btn btn-primary btn-lg btn-block" :class="{ 'btn-loading': loading }" :disabled="loading">{{ $t('submit') }}</button>
						</div>
					</form>
			</div>
		</div>
	</div>

</template>
<script>
	
	import {api} from "../../../config";
	import {mapState, mapGetters} from "vuex";

	export default {
		i18n: {
			messages: {
				en: { 
					"title": "Update profile",
					"submit": "Save",
					"done": "Info updated",
				},
				ru: {
					"title": "Изменение профиля",
					"submit": "Сохранить",
					"done": "Информация обновлена",
				}
			}
		},
		computed: {
			meta_title: function() {
				return this.$t('title');
			},
			...mapGetters({
				 form: 'userData'
			})
		},
		metaInfo () {
			return {
				title: this.meta_title,
			}
		},
		data() {
			return {
				loading: false,
				error: {
					name: '',
				}
			};
		},
		methods: {
			async submit() {
				this.loading = true;
				try {
					const res = await axios.post(api.updateUserProfile, this.form)
					
					this.loading = false;

					this.$store.dispatch('setUser', res.data.user);				
					
					this.$noty.success(this.$t('done'))

					this.$router.push({name: 'profile'})

				} catch (errors) {
					this.loading = false;
					(errors) ? this.setErrors(errors) : this.clearErrors()
				}
			},
			setErrors(errors) {
				this.error.name = errors.name ? errors.name[0] : null;
			},
			clearErrors() {
				this.error.name = null;
			},
			created() {
				console.log("form", form);
			}
			
		}
	}
</script>
