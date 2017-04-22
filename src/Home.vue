
<template>
	<div>

    <grid-layout
            :layout="layout"
            :col-num="12"
            :row-height="30"
            :is-draggable="true"
            :is-resizable="true"
            :vertical-compact="true"
            :margin="[10, 10]"
            :use-css-transforms="true"
    >

        <grid-item v-for="item in layout"
                   :x="item.x"
                   :y="item.y"
                   :w="item.w"
                   :h="item.h"
                   :i="item.i">
            {{item.i}}
        </grid-item>
    </grid-layout>

	</div>
</template>


<script>

   import VueGridLayout from 'vue-grid-layout'

    var testLayout = [
          {"x":0,"y":0,"w":2,"h":2,"i":"0"},
          {"x":2,"y":0,"w":2,"h":4,"i":"1"},
          {"x":4,"y":0,"w":2,"h":5,"i":"2"},
          {"x":6,"y":0,"w":2,"h":3,"i":"3"},
          {"x":8,"y":0,"w":2,"h":3,"i":"4"},
          {"x":10,"y":0,"w":2,"h":3,"i":"5"},
          {"x":0,"y":5,"w":2,"h":5,"i":"6"},
          {"x":2,"y":5,"w":2,"h":5,"i":"7"},
          {"x":4,"y":5,"w":2,"h":5,"i":"8"},
          {"x":6,"y":4,"w":2,"h":4,"i":"9"}
    ];

  var GridLayout = VueGridLayout.GridLayout;
  var GridItem = VueGridLayout.GridItem;

    export default {
      components: {
        GridLayout,
        GridItem,
      },
      data () {
        return {
          layout: testLayout
        }
      },
    }
</script>

<style scoped>
    .main-content{
      padding: 0 10px;
      margin-top: 20px;
      
    }

    .vue-grid-item{
      background-color: White;
    }
</style>


