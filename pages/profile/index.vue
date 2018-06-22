<template>
		<div id="mega-content">
		<div class="card" v-if="check">
			<ProfileMenu :user=user></ProfileMenu>
		
			<div class="card-body">
				<div>
					<strong>{{ $t('name') }}:</strong>
					{{ user.name }}
				</div>
					<div>
					<strong>{{ $t('email') }}:</strong>
					{{ user.email }}
				</div>
	</div>
	</div>
	</div>
</template>

<script>
import ProfileMenu from '~/components/ProfileMenu.vue'
import { mapGetters } from "vuex";

export default {
	middleware: ["auth", "verified"],
	layout: "rm",
	components: {
		ProfileMenu
	},
  computed: mapGetters({
		user: "auth/user",
		check: "auth/check"
  }),

};
</script>
