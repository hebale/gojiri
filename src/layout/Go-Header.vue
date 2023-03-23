<script>
  import { onMounted, ref } from 'vue';
  import { getMonth, getYear } from 'date-fns';
  import Flicking from '@egjs/vue3-flicking';
  import { Perspective } from '@egjs/flicking-plugins';


  export default {
    components: {
      Flicking,     
      // SplideSlide
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
        plugins: [
          new Perspective({ 
            seletor: 'active',
            scale: 0.8,
            rotate: 0,
          })
        ]
      }
    },
    methods: {       
      move(event) {        
        event.currentTarget.panels.forEach(panel => {
          -0.2 < panel.progress && panel.progress < 0.2
            ? panel.element.classList.add('active')
            : panel.element.classList.remove('active')
        })
      },
      // moveEnd(event) {

        
      // },
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
        //   const proxySplide = splide.value.splide;
        //   const control = document.createDocumentFragment();

        //   ['prev', 'next'].forEach((el) => {
        //     const dom = document.createElement('div');

        //     dom.classList.add(el);
        //     dom.addEventListener('click', () => {
        //       proxySplide.go( el === 'prev' ? '-1' : '+1');
        //     });
            
        //     control.appendChild(dom);
        //   })
          
          console.log(flicking.value.flicking)
        //   proxySplide.root.querySelector('.splide__track').appendChild(control);
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

      @move="move"
    >
      <li v-for="(value, index) in 12" :key="`slide_${ index }`" >
        <button type="button">{{ value }}</button>
      </li>

      <template #viewport>
        <button
          type="button"
          class="prev"
          @click="slideToPrev"
        >
          이전
        </button>
        <button
          type="button"
          class="next"
          @click="slideToNext"
        >
          다음
        </button>
      </template>
    </Flicking>



    <!-- <Splide ref="splide" @splide:dragging="event" :options="SplideOptions" >
      <SplideSlide v-for="(value, index) in 12" :key="`slide_${ index }`" >
        <Button type="button">{{ value }}</Button>
      </SplideSlide>
    </Splide> -->
  </header>
</template>
