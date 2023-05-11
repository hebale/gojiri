<script>
  import { onMounted, ref } from 'vue';
  import { getMonth, getYear } from 'date-fns';
  import FlickingComp from '@egjs/vue3-flicking';

  export default {
    components: {
      FlickingComp
    },  
    setup() {
      const flicking = ref();
      onMounted(() => {
        if (flicking.value && flicking.value.flicking) {
          console.log(flicking.value.flicking);
        }
      });
      
      return { flicking };
    },  
    data() {
      return {        
        now: { 
          year: getYear(new Date),
          month: getMonth(new Date)
        },
        selectedMonth: getMonth(new Date) + 1,
        flickingOptions: {
          defaultIndex: getMonth(new Date),
          panelsPerView: 3,
          circular: true,
          align: 'center',          
          duration: 450,
          // moveType: 'snap',
          // interruptable: true,
          preventClickOnDrag: true,
          // autoResize: true,
          // preventEventsBeforeInit: true,
        }
      }
    },
    methods: {
      ready(event) {
        this.motionTransform(event);
        this.changed();
      },
      changed() {
        const year = this.now.year;
        const month = this.selectedMonth.length > 1
          ? this.selectedMonth
          : `0${this.selectedMonth}`;

        this.$store.commit('SET_DATE', { year, month });
        this.$store.dispatch('updateData');
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
          
          panel.element.style.transform = `scale(${Math.max(0.7, 1 - (progress / 2.1))})`;
          panel.element.querySelector('span').style.fontSize =`${Math.max(16, 24 - (progress * 10))}px`;

          if (progress < 0.2) {
            panel.element.classList.add('active')
          } else {
            panel.element.classList.remove('active')
          };
        });

        const direction = event.direction;
        const nowValue = event.currentTarget.panels
          .filter(panel => Math.abs(panel.progress.toFixed(2)) < 0.9)[0]
          ?.element.innerText;

        if (direction === 'PREV' && this.selectedMonth < parseInt(nowValue)) {
          this.now.year -= 1;
        };

        if (direction === 'NEXT' && this.selectedMonth > parseInt(nowValue)) {
          this.now.year += 1;
        };
        this.selectedMonth = parseInt(nowValue);        
      }
    }
  }
</script>

<template>
  <header>
    <h1>
      <a href="/"><img src="" alt="">고지리</a>
    </h1>
    <p class="year">{{ now.year }}</p>
    <flicking-comp
      ref="flicking"
      :options="flickingOptions"
      :cameraTag="'ul'"

      @ready="ready"
      @move="motionTransform"
      @changed="changed"
    >
      <li v-for="(value, index) in 12" :key="`slide_${ index }`" >
        <button type="button"><span>{{ value }}</span></button>
      </li>
      <template #viewport>
        <button type="button" class="prev" @click="slideToPrev">이전</button>
        <button type="button" class="next" @click="slideToNext">다음</button>
      </template>
    </flicking-comp>
  </header>
</template>
