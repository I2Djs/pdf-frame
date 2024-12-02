<script setup>
import { watch, shallowRef } from 'vue';
import Canvas_example from './examples/Canvas_example.vue';
import Canvas_path_animation from './examples/Canvas_path_animation.vue';
import Canvas_pathanimation from './examples/Canvas_path_animation2.vue';
import Pdf_example from './examples/Pdf_example_2.vue';
import Pdf_custom_fonts from './examples/Pdf_custom_fonts.vue';
import Pdf_text_decoration from './examples/Pdf_text_decoration.vue';
import Canvas_helix_animation from './examples/Canvas_helix_animation.vue';
import Canvas_animation from './examples/Canvas_animate.vue';
import PDf_table from './examples/Pdf_table_test.vue';
import PDf_encrypt from './examples/Pdf_encrypt_blob.vue';
import Canvas_events from './examples/Canvas_events.vue';
import Canvas_tadpole_animation from './examples/Canvas_tadpole_animation.vue';

  let exampleList = [{
    title: 'Canvas Example',
    component: Canvas_example
  }, {
    title: 'PDF Example',
    component: Pdf_example
  },{
    title: 'Canvas Path Animaton - 1',
    component: Canvas_path_animation
  }, {
    title: 'Canvas Path Animaton - 2',
    component: Canvas_pathanimation
  }, {
    title: 'Canvas Helix Animation',
    component: Canvas_helix_animation
  }, {
    title: 'Canvas rect Animation',
    component: Canvas_animation
  }, {
    title: 'PDF Custom Fonts',
    component: Pdf_custom_fonts
  }, {
    title: 'Pdf Table rendering',
    component: PDf_table
  }, {
    title: 'Pdf Encryption',
    component: PDf_encrypt
  }, {
    title: 'Canvas Events',
    component: Canvas_events
  }, {
    title: 'Canvas Tadpole Animation',
    component: Canvas_tadpole_animation
  }, {
    title: 'PDF Text decoration',
    component: Pdf_text_decoration
  }]

  let selectedExample = shallowRef(Canvas_example);

</script>

<template>
    <div class="container">
        <div class="exampleSelector">
            <label for="cars">Select Example</label>
                <select id="cars" name="cars" v-model="selectedExample">
                    <option v-for="item in exampleList" :value="item.component"> {{ item.title }}</option>
                </select>
        </div>
        <div class="canvasParentContainer">
            <component :is="selectedExample"></component>
        </div>
    </div>
</template>

<style>
html, body, #app {
    height: 100%;
    width: 100%;
    background-color: #242424;
  }

.container {
    height: 100%;
    width: 100%;
    display: grid;
    grid-template-rows: 4rem 1fr;
    grid-template-columns: 100%;
    grid-row-gap: 1rem;
    justify-content: center;
}

.exampleSelector {
    height: 100%;
    width: 100%;
    display: flex;
    align-items: end;
}

.canvasParentContainer {
  height: 100%;
  width: 100%;
}

#canvasContainer{
  height: 100%;
  width: 100%;
  position: relative;
}
</style>
