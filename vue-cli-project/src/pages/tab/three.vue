<template>
	<div>
		<helloWorld :name="helloName"></helloWorld>
	</div>
</template>

<script type="text/javascript">
import helloWorld from '../../components/helloWorld'
export default {
	name: 'three',
	components: {
		helloWorld
	},
	data() {
		return {
			helloName: 'Mr.gao'
		}
	}
}
</script>