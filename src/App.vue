<template>
	<!-- template最外层只能包含一个标签 -->
  	<div class="skyblue box">
		  第一个单文件组件{{message}}hahahha
		<router-link to="/login">登录</router-link>
		<router-link to="/register">注册</router-link>
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
* {
	margin: 0;
	padding: 0;
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