<template>
	<div class="app">
		<link href="https://fonts.googleapis.com/css2?family=Josefin+Sans&family=Lilita+One&display=swap" rel="stylesheet">
		<div class="container">
			<div class="py-5 text-center" v-if="state == 1 || state == 0">
				<h2 class="mb-2">COVID Fake News Detector</h2>
				<p class="lead">Temukan kebenaran informasi yang anda dapatkan disini.</p>
			</div>
			<div class="mt-1" v-if="state == 0">
				<div class="row">
				    <div class="col-md-8 offset-md-2">
				    	<textarea @keydown="dondon" class="form-control" rows="5" placeholder="Masukkan kata kunci" v-model="keyword"></textarea>
				    	<button @click="check" class="btn btn-danger btn-block btn-lg mt-3">Cek Berita</button>
				    </div>
				</div>
			</div>
			<div v-if="state == 1" style="margin-top: -50px">
				<lottie :options="defaultOptions" :height="250" :width="250"/>
			</div>

			<div v-if="state == 2 || state == 3" class="text-center pt-5">
				<p class="lead">"{{ keyword }}"</p>
			</div>
			<div v-if="state == 4" class="text-center pt-5 pb-2">
				<h2>Terjadi Kesalahan</h2>
			</div>
			<div v-if="state == 2">
				<lottie :options="successOptions" :height="250" :width="250"/>
			</div>
			<div v-if="state == 3">
				<lottie :options="wrongOptions" :height="250" :width="250"/>
			</div>
			<div v-if="state == 4">
				<lottie :options="errorOptions" :height="250" :width="250"/>
			</div>			
			<div v-if="state == 2 || state == 3" class="text-center pt-1 mb-4">
				<h2>{{ state == 2 ? "VALID" : "TIDAK VALID" }}</h2>
			</div>

			<div class="mt-1 text-center" v-if="state != 0 && state != 1">
				<a href="javascript:void(0);" class="text-white" @click="again" >Coba Lagi</a>
			</div>			

			<div class="particel" v-if="state == 1 || state == 0">
	      		<img src="/virues.png" class="h150 particular" style="left: calc(50% - 75px); top: 20px;">    				
			</div>
	    </div>		
	</div>
</template>

<script>

import Lottie from 'vue-lottie';
import * as animationData from './assets/10358-searching.json';
import * as successAnimation from './assets/28702-done.json';
import * as wrongAnimation from './assets/13865-sign-for-error-flat-style.json';
import * as errorAnimation from './assets/23919-error-doggy.json';

const body = document.getElementsByTagName('body')[0];
const axios = require('axios').default;

export default {
  name: 'App',
	components: {
		'lottie': Lottie
	},
	data: () => ({
        defaultOptions: {animationData: animationData.default},
        successOptions: {animationData: successAnimation.default, loop: false},
        wrongOptions: {animationData: wrongAnimation.default, loop: false},
        errorOptions: {animationData: errorAnimation.default},
        animationSpeed: 1,
        keyword : '',
        state : 0 // 0 : default, 1 : onloading, 2 : true, 3 : false, 4 : error
	}),
	methods : {
		check(){
			if(this.keyword == '')
				return;
			this.state = 1;
			let e = this;
			axios.post('https://cvdbe.herokuapp.com/detect', {
				issue: e.keyword
			})
			.then(function (response) {
				if(response.data.message.toUpperCase() == "SUCCESS")
					e.state = 2;
				else
					e.state = 3;
			})
			.catch(function (error) {
				e.state = 4;
			});

		},
		again(){
			this.state = 0;
			this.keyword = "";
		},
		dondon(){
			let key = event.keyCode || event.charCode;
			if(key == 13)
				this.check();
		}
	}
}
</script>

<style>
	.h100{ height: 100px; width: auto; }
	.h150{ height: 150px; width: auto; }
	.h50{ height: 50px; width: auto;  }
	.h25{ height: 25px; width: auto;  }

	.particular {
		opacity: 0.6;  
		width: auto; 
		position: absolute;
		z-index: -1;
	}

	body{
		background-color: #220052;
		color: white;		
	}

	h2{
		font-family: 'Lilita One', cursive;
	}
</style>