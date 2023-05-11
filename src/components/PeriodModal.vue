<script>
  import DateFlicker from './FlickingComp.vue';

  export default {
    components: {
      DateFlicker
    },
    props: {
      data: Object,
      onClose: Function
    },
    data(){
      return {
        error: false,
        period: { 
          ID: this.data.ID,
          START_YEAR: Number(this.data.START_DATE.substring(0, 4)),
          START_MONTH: Number(this.data.START_DATE.substring(4, 6)),
          END_YEAR: Number(this.data.END_DATE.substring(0, 4)),
          END_MONTH: Number(this.data.END_DATE.substring(4, 6))
        }
      }
    },
    methods: {
      setStartYear(year) {
        this.period.START_YEAR = Number(year);
      },
      setStartMonth(month) {
        this.period.START_MONTH = Number(month);
      },
      setEndYear(year) {
        this.period.END_YEAR = Number(year);
      },
      setEndMonth(month) {
        this.period.END_MONTH = Number(month);
      },
      changePeriod(){
        const isError = this.period.START_YEAR > this.period.END_YEAR
          || (this.period.START_YEAR === this.period.END_YEAR && this.period.START_MONTH > this.period.END_MONTH);

        if(isError) {
          this.error = true;
        } else {
          this.error = false;
          this.$store.commit('ADD_CHANGED_PERIOD', {
            ID: this.period.ID,
            START_DATE: `${this.period.START_YEAR}${this.period.START_MONTH < 10 ? '0' + this.period.START_MONTH : this.period.START_MONTH}`,
            END_DATE: `${this.period.END_YEAR}${this.period.END_MONTH < 10 ? '0' + this.period.END_MONTH : this.period.END_MONTH}`
          });
          
          this.onClose();
        };
      }
    }
  }
</script>

<template>
  <div class="dim">
    <div class='modal'>
      <h3>기간선택</h3>
      <div class="body">
        <div class="picker-wrap">
          <div class="start-date-module">
            <p>시작월</p>
            <div>
              <date-flicker 
                :data="$store.state.yearRange"
                :options="{
                  defaultIndex: $store.state.yearRange.indexOf(period.START_YEAR)
                }"
                :onChanged="setStartYear"
              />
              <date-flicker
                :data="$store.state.monthRange"
                :options="{
                  defaultIndex: $store.state.monthRange.indexOf(period.START_MONTH)
                }"
                :onChanged="setStartMonth"
              />
            </div>
          </div>
          <div class="end-date-module">
            <p>종료월</p>
            <div>
              <date-flicker 
                :data="$store.state.yearRange"
                :options="{
                  defaultIndex: $store.state.yearRange.indexOf(period.END_YEAR)
                }"
                :onChanged="setEndYear"
              />
              <date-flicker
                :data="$store.state.monthRange"
                :options="{
                  defaultIndex: $store.state.monthRange.indexOf(period.END_MONTH)
                }"
                :onChanged="setEndMonth"
              />
            </div>
          </div>
        </div>
        <span class="error" v-if="error">시작월이 종료월보다 큽니다.</span>
      </div>
      <div class="control">
        <button
          type="button"
          @click="changePeriod"
        >
          등록
        </button>
        <button
          type="button"
          @click="onClose()"
        >
          취소
        </button>
      </div>
    </div>
  </div>
</template>