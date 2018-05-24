<template>
	
	<div class="mx-auto">
		<div class="card">
			<h2 class="card-title mx-auto">
				{{ $t('title') }}
			</h2>
			<div class="card-body">
					<form @submit.prevent="submit" role="form" class="form">
							<div class="form-group">
								<label for="password">{{ $t('new_password') }}</label>
								<input
									type="password"
									class="form-control"
									:class="{'is-invalid' : error.password}"
									id="password"
									v-model="form.password"
									:disabled="loading"
								/>
								<div class="invalid-feedback" v-show="error.password">{{ error.password }}</div>
							</div>
							<div class="form-group">
								<label for="confirm_password">{{ $t('confirm_password') }}</label>
								<input
									type="password"
									class="form-control"
									:class="{'is-invalid' : error.confirm_password}"
									id="confirm_password"
									v-model="form.confirm_password"
									:disabled="loading"
								/>
								<div class="invalid-feedback" v-show="error.confirm_password">{{ error.confirm_password }}</div>
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
	export default {
		i18n: {
			messages: {
				en: { 
					"title": "Change password",
					"submit": "Save",
					"done": "Password changed",
				},
				ru: {
					"title": "Смена пароля",
					"submit": "Сохранить",
					"done": "Пароль изменен",
					
				}
			}
		},
		
		computed: {
			meta_title: function() {
				return this.$t('title');
			},
		},
		metaInfo () {
			return {
				title: this.meta_title,
			}
		},
		data() {
			return {
				loading: false,
				form: {
					password: null,
					confirm_password: null,
				},
				error: {
					password: null,
					confirm_password: null,
				}
			}
		},
		methods: {
			async submit() {
				this.loading = true;
				try {
					const res = await axios.post(api.updateUserPassword, this.form)
					
					this.loading = false;
					
					this.$noty.success(this.$t('done'))

					this.$router.push({name: 'profile'})

				} catch (errors) {
					this.loading = false;
					(errors) ? this.setErrors(errors) : this.clearErrors()
				}
			},
			setErrors(errors) {
				this.error.password = errors.password ? errors.password[0] : null;
				this.error.confirm_password = errors.confirm_password ? errors.confirm_password[0] : null;
			},
			clearErrors() {
				this.error.password = null;
				this.error.confirm_password = null;
			}
			
		}
	}
</script>
