<template>
	<div>
		<h3 class="mb-4">{{ $t('profile_title', { name: user.name }) }}</h3>
		<div class="card">
			<ul class="list-group list-group-flush">
				<li class="list-group-item">
					{{ $t('name') }}
					<p class="lead">{{ user.name }}</p>
				</li>
				<li class="list-group-item">
					{{ $t('email') }}
					<p class="lead">{{ user.email }}</p>
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  // middleware: ["auth", "verified"],
  
  mounted() {
   
  },
  computed: mapGetters({
    user: "auth/user"
  }),

};
</script>
