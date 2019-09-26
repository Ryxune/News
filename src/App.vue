<template>
	<!-- template最外层只能包含一个标签 -->
  	<div class="skyblue box">
		<router-view></router-view>
	</div>
</template>

<script>
// 必须暴露一个对象，对象是组件的配置
export default {
	data(){
		return {
			message:"hello vue"
		}
	}
}
</script>

<style>
/* 组件样式，会污染全局 */

@import url('http://at.alicdn.com/t/font_1426139_h6vn3jbl5q.css');
@import url('../node_modules/vant/lib/index.css');

* {
	margin: 0;
	padding: 0;
}

body {
	background: #efefef;
}

a {
	color:inherit;
}

a:hover {
	text-decoration:none;
}

ul,li ol {
	list-style:none;
}

i,em {
	font-style: normal;
}


</style>