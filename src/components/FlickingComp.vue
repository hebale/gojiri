<script>
  import FlickingComp from "@egjs/vue3-flicking";

  export default {
    components: {
      FlickingComp
    },
    props: {
      data: Array,
      options: Object,
      onChanged: Function
    },
    data() {
      return {
        flickingOptions: {
          horizontal: false,
          ...(this.options || {})
        }
      }
    },
    methods: {
      changed(event) {
        const target = event.currentTarget;
        this.onChanged(target.panels[target.index].element.innerText);
      },
      motionTransform: event => {
        event.currentTarget.panels.forEach(panel => {
          const rotateVal = -panel.progress * 30;
          const sinRot = Math.sin(Math.abs(rotateVal * Math.PI / 180));
          const depth = 150 * sinRot * sinRot;
          panel.element.style.transform = `translateZ(-${depth}px) rotateX(${rotateVal}deg)`;
        });
      }
    }
  }
</script>

<template>
  <flicking-comp
    class="picker"
    :options="flickingOptions"
    :cameraTag="'ul'"

    @ready="motionTransform"
    @move="motionTransform"
    @changed="changed"
  >
    <template v-for="num in data" :key="num" >
      <li>{{ num }}</li>
    </template>
    <template #viewport>
      <div class="guide-line"></div>
      <div class="dim-top"></div>
      <div class="dim-bottom"></div>
    </template>
  </flicking-comp>
</template>