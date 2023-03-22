<script>
  import { onMounted, ref } from 'vue';
  import { Splide, SplideSlide } from '@splidejs/vue-splide';  
  import { getMonth, getYear } from 'date-fns';


  

  export default {
    components: {
      Splide,     
      SplideSlide
    },    
    data() {
      return {
        SplideOptions: {
          type: 'loop',
          arrows: false, // shadow button
          pagination: false,
          lazyLoad: false,
          drag: 'free',
          snap: true,
          perPage: 3,
          focus: 'center',
        }
      }
    },
    setup() {
      const today = ref({ 
        year: getYear(new Date),
        month: getMonth(new Date)
      });

      const splide = ref();

      onMounted(() => {
        if (splide.value && splide.value.splide) {
          const proxySplide = splide.value.splide;
          const control = document.createDocumentFragment();

          ['prev', 'next'].forEach((el) => {
            const dom = document.createElement('div');

            dom.classList.add(el);
            dom.addEventListener('click', () => {
              proxySplide.go( el === 'prev' ? '-1' : '+1');
            });
            control.appendChild(dom);
          })
          
          proxySplide.root.querySelector('.splide__track').appendChild(control);


          
          proxySplide.mount({ Intersection });
        }
      });


      const test = (entry) => {
        console.log(entry)
      }


      return {
        today,
        splide,        
        test
      };
    },
  }
</script>

<template>
  <header>
    <p class="year">{{ today.year }}</p>
    <Splide ref="splide" @splide:intersection="test" :options="SplideOptions" >
      <SplideSlide v-for="(value, index) in 12" :key="`slide_${ index }`" >
        <Button type="button">{{ value }}</Button>
      </SplideSlide>
    </Splide>
  </header>
</template>
