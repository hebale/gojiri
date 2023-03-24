<script>
  import { onMounted, ref } from 'vue';
  import { getMonth, getYear } from 'date-fns';
  import Flicking from '@egjs/vue3-flicking';

  export default {
    components: {
      Flicking
    },    
    data() {
      return {        
        today: { 
          year: getYear(new Date),
          month: getMonth(new Date)
        },
        currentCount: getMonth(new Date) + 1,
        FlickingOptions: {
          defaultIndex: getMonth(new Date),
          panelsPerView: 3,
          circular: true,
          align: 'center',          
          duration: 800,
          moveType: 'snap',
          interruptable: true,
          preventClickOnDrag: true,
          autoResize: true,
          preventEventsBeforeInit: true,
        }
      }
    },

    methods: {
      ready(event) {
        this.motionTransform(event);
      },
      slideToPrev() {
        this.$refs.flicking.prev();
      },
      slideToNext(){
        this.$refs.flicking.next();
      },
      motionTransform(event) {
        event.currentTarget.panels.forEach(panel => {
          const progress = Math.abs(panel.progress.toFixed(2));
          // motion
          if (progress < 1.5) {
            panel.element.style.fontSize = `${Math.max(16, 24 - (progress * 10))}px`;
            panel.element.style.transform = `scale(${Math.max(0.7, 1 - (progress / 2.1))})`;
          } else {
            panel.element.style.fontSize = '16px';
            panel.element.style.transform = 'scale(0.7)';
          }

          // active
          if (progress < 0.2) {
            panel.element.classList.add('active')
          } else {
            panel.element.classList.remove('active')
          }
        })

        // counting
        const direction = event.direction;
        const nowValue = event.currentTarget.panels
          .filter(panel => Math.abs(panel.progress.toFixed(2)) < 0.9)[0]
          ?.element.innerText;

        if (direction === 'PREV' && this.currentCount < parseInt(nowValue)) {
          this.today.year -= 1;
        } 
        if (direction === 'NEXT' && this.currentCount > parseInt(nowValue)) {
          this.today.year += 1;
        }
        this.currentCount = parseInt(nowValue);        
      }
    },

    setup() {
      const flicking = ref();
      onMounted(() => {
        if (flicking.value && flicking.value.flicking) {
          console.log(flicking.value.flicking)
        }
      });

      return {
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

      @ready="ready"
      @move="motionTransform"
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
