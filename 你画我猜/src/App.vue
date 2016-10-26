<template>
	<div>
		<div class="draw-wrap flex-box" v-if='this.player == 0'>
			<a title="我来画" @click='draw'>我来画</a>
			<a title="我来猜" @click='show'>我来猜</a>
		</div>
		<draw v-if='this.player == 1'></draw>
		<show v-if='this.player == 2'></show>
	</div>
</template>

<script>
	import Draw from './views/components/drawing-board.vue'
	import Show from './views/components/showing-board.vue'
	
	export default {
		data () {
			return {
				player: 0
			}
		},
		components: {
			Draw,
			Show
		},
		methods: {
			draw () {
				this.player = 1;
			},
			show () {
				this.player = 2;
			}
		}
	}
</script>

<style lang="sass">
	html,body{width:100%;height:100%;margin:0;padding:0;background: #fff;}
	.draw-wrap{
		width: 362px;
		height: 80px;
		margin: -40px 0 0 -180px;
		background: url(./assets/img/img1.jpg);
		position: absolute;
	    top: 40%;
	    left: 50%;
	}
	.flex-box {
	    display: flex;
	    justify-content: space-between;
	    align-items: flex-end;
	    flex-wrap: wrap;
	}
	.draw-wrap a {
	    width: 50%;
	    height: 80px;
	    display: block;
	    cursor: pointer;
	    position: absolute;
	    top: 0;
	    left: 0;
	    text-indent: -9999px;
	    overflow: hidden;
	}
	.draw-wrap a:nth-child(2) {
	    left: 50%;
	}

</style>