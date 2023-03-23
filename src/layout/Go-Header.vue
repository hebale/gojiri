<script>
  import { onMounted, ref } from 'vue';
  import { getMonth, getYear } from 'date-fns';
  import Flicking from '@egjs/vue3-flicking';
  import { Perspective } from '@egjs/flicking-plugins';

  export default {
    components: {
      Flicking
    },    
    data() {
      return {
        FlickingOptions: {
          defaultIndex: getMonth(new Date),
          panelsPerView: 3,
          circular: true,
          align: 'center',          
          duration: 500,
          moveType: 'snap',
          interruptable: true,
          preventClickOnDrag: true,
          autoResize: true,
          preventEventsBeforeInit: true,
        },
        // plugins: [
        //   new Perspective({ 
        //     seletor: 'active',
        //     scale: 0.8,
        //     rotate: 0,
        //   })
        // ]
      }
    },
    methods: {       
      slideMove(event) {        
        event.currentTarget.panels.forEach(panel => {
          const progress = Math.abs(panel.progress.toFixed(2));

          if (progress < 1.5) {
            panel.element.style.transform = `scale(${Math.max(0.7, 1 - (progress / 2.1))})`
          } else {
            panel.element.style.transform = `scale(0.7)`
          }

          if (progress < 0.2) {
            panel.element.classList.add('active')
          } else {
            panel.element.classList.remove('active')
          }
        })
      },
      slideToPrev() {
        this.$refs.flicking.prev();
      },
      slideToNext(){
        this.$refs.flicking.next();
      }
    },

    setup() {
      const today = ref({ 
        year: getYear(new Date),
        month: getMonth(new Date)
      });

      const flicking = ref();

      onMounted(() => {
        if (flicking.value && flicking.value.flicking) {
          console.log(flicking.value.flicking)
        }
      });

      return {
        today,
        flicking,
      };
    },
  }
</script>

<template>
  <header>
    <p class="year">{{ today.year }}</p>
    <Flicking
      ref="flicking"
      :options="FlickingOptions"
      :cameraTag="'ul'"
      :plugins="plugins"

      @move="slideMove"
    >
      <li v-for="(value, index) in 12" :key="`slide_${ index }`" >
        <button type="button">{{ value }}</button>
      </li>
      <template #viewport>
        <button type="button" class="prev" @click="slideToPrev">이전</button>
        <button type="button" class="next" @click="slideToNext">다음</button>
      </template>
    </Flicking>
  </header>
</template>
