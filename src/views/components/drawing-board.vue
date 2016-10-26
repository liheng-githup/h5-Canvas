<template>
	<div>
		<canvas id="canvas" width="412" height="340" style="border: 1px solid #999;"></canvas>
		<div id="keyword-box">
	        <span>Keyword: </span>
	        <span id="keyword">{{keyword}}</span>
	    </div>
	    <button id="resetbtn">Reset</button>
	    <div>
	    	<p>画笔粗细</p>
		    <ul>
		    	<li @click="changeSize(2)">1号</li>
		    	<li @click="changeSize(4)">2号</li>
		    	<li @click="changeSize(6)">3号</li>
		    	<li @click="changeSize(8)">4号</li>
		    	<li @click="changeSize(10)">5号</li>
		    </ul>
	    </div>
	    <div>
	    	<p>画笔颜色</p>
		    <ul>
		    	<li @click="changeColor('red')">红色</li>
		    	<li @click="changeColor('black')">黑色</li>
		    	<li @click="changeColor('blue')">蓝色</li>
		    	<li @click="changeColor('yellow')">黄色</li>
		    	<li @click="changeColor('green')">绿色</li>
		    </ul>
	    </div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				//初始化
				ws: '',
				btn: '',
				canvas: '',
				cxt: '',
				stage_info: '',
				path: {
					beginX: 0,
		            beginY: 0,
		            endX: 0,
		            endY: 0
				},
				//画笔样式
				pointSize: '1',
				pointColor: 'black',
				//提示
				keyword: '',
			}
		},
		mounted: function () {
		  	this.$nextTick(function () {
		  		var _self = this;

				this.ws = new WebSocket('ws://localhost:8090')
				this.canvas = document.getElementById("canvas")
		        this.cxt = this.canvas.getContext('2d')
		        this.stage_info = this.canvas.getBoundingClientRect()
		        this.btn = document.getElementById('resetbtn')
		        
		        this.ws.onopen = () => {
		        	_self.init(_self.ws,_self.btn)
		        }
		        this.ws.onmessage = (msg) => {
		            msg.data.split(':')[0] == 'keyword' ?
		                _self.keyword = msg.data.split(':')[1] :
		                false
		        }
		  	})
		},
		methods: {
			init(ws, btn) {
		    	var _self = this;
		    	
		    	_self.canvas.addEventListener('touchstart',function(){
		    		_self.drawBegin(event, ws)
		    	})
		    	_self.canvas.addEventListener('touchend',function(){
		    		_self.drawEnd()
		    		ws.send('stop')
		    	})
		    	
		        _self.clearCanvas(ws, btn)
		   },
		   drawBegin(e, ws) {
		    	var _self = this;
		    	
		        window.getSelection() ? window.getSelection().removeAllRanges() : document.selection.empty()
		        
		        _self.cxt.lineWidth = _self.pointSize
		        _self.cxt.strokeStyle = _self.pointColor
		
		        _self.cxt.beginPath()
		        
		        
		        _self.cxt.moveTo(
		            e.touches[0].pageX - _self.stage_info.left,
		            e.touches[0].pageY - _self.stage_info.top
		        )
		
		        _self.path.beginX = e.touches[0].pageX - _self.stage_info.left
		        _self.path.beginY = e.touches[0].pageY - _self.stage_info.top
		
				window.addEventListener('touchmove',function(){
					_self.drawing(event, ws)
				})
	    	},
	    	drawing(e, ws) {
	    		var _self = this;
	    		
		        _self.cxt.lineTo(
		            e.touches[0].pageX - _self.stage_info.left,
		            e.touches[0].pageY - _self.stage_info.top
		        )
		
		        _self.path.endX = e.touches[0].pageX - _self.stage_info.left
		        _self.path.endY = e.touches[0].pageY - _self.stage_info.top
				
		        ws.send(_self.path.beginX + '.' + _self.path.beginY + '.' + _self.path.endX + '.' + _self.path.endY + '.' + _self.pointSize + '.' + _self.pointColor)
				
		        _self.cxt.stroke()
		    },
			drawEnd() {
	        
	    	},
	    	clearCanvas(ws, btn) {
	    		var _self = this;
	    		
		        btn.onclick = () => {
		            _self.cxt.clearRect(0, 0, 500, 500)
		            ws.send('clear')
		        }
		    },
		    changeSize (size) {
		    	this.pointSize = size;
		    },
		    changeColor (color) {
		    	this.pointColor = color;
		    }
		}
	}
</script>

<style>
	
</style>