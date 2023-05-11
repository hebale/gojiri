<script>
  export default {
    props: {
      data: Object,
      openDeleteModal: Function,
    },
    data() {
      return {
        cardTitle: null
      }
    },
    computed: {
      isIndeterminate() {
        const completes = this.data.ITEMS.filter(el => el.COMPLETE === 'Y');
        return completes.length > 0 && completes.length < this.data.ITEMS.length;
      },
      isTotalComplete() {
        return this.data.ITEMS.every(el => el.COMPLETE === 'Y' );
      }
    },
    methods: {
      async updateCardView({ ID, VIEW }) {
        const { code } = await this.$store.dispatch('fetchApi', { 
          method: 'PATCH',
          path: 'cards',
          body: { ID, VIEW: VIEW === 'Y' ? 'N' : 'Y' }
        });

        if(code === 200) this.$store.dispatch('updateData');
      },
      async updateCardTitle({ ID, TITLE }) {
        const { code } = await this.$store.dispatch('fetchApi', { 
          method: 'PATCH',
          path: 'cards',
          body: { ID, TITLE }
        });

        if(code === 200) this.$store.dispatch('updateData');
      },
      async updateTotalComplete(event){
        console.log(event.target.checked)
        const { code } = await this.$store.dispatch('fetchApi', {
          method: 'PATCH',
          path: 'cards-items',
          body: { ID: this.data.ITEMS.map(el => el.ID), COMPLETE: event.target.checked ? 'Y' : 'N' }
        });

        if(code === 200) this.$store.dispatch('updateData');
      },
      changeTitle(event){
        this.cardTitle = event.target.value;
      },
      addSubCardItem({ PARENTS_ID }){
        let subData = this.$store.state.sub;
        this.$store.commit('ADD_SUB_ITEM', {
          PARENTS_ID,
          ID: subData.length
            ? subData.at(-1).ID + 1
            : 0,
          TITLE: '',
          COMPLETE: 'N',
          AMOUNT: 0,
          REFEAT: 'Y',
          START_DATE: null,
          END_DATE: null
        });
      },
      async changeCardView({ ID, VIEW }){
        const { code } = await this.$store.dispatch('fetchApi', { 
          method: 'PATCH',
          path: 'cards',
          body: { ID, VIEW: VIEW === 'Y' ? 'N' : 'Y' }
        });

        if(code === 200) {
          this.$store.dispatch('updateData', () => {
            const cardWrap = this.$refs.cardWrap;
            const cardInner = this.$refs.cardWrap.children[0];
            const cardHeader = this.$refs.cardHeader;

            accordionAnimation(
              cardWrap,
              VIEW === 'Y' 
                ? cardInner.clientHeight
                : cardHeader.clientHeight,
              VIEW === 'Y' 
                ? cardHeader.clientHeight
                : cardInner.clientHeight,
              350
            );
          });
        };

        function accordionAnimation(target, startValue, endValue, duration){
          let startTime = null;
          let loopFn = timeStamp => {
            if(!startTime) startTime = timeStamp;
            if((timeStamp - startTime) < duration) {
              const progress = (timeStamp - startTime) / duration;

              target.style.height = `${startValue + ((endValue - startValue) * progress.toFixed(2))}px`;
              requestAnimationFrame(loopFn);
            } else {
              target.style.height = VIEW === 'N' ? 'auto' : `${endValue}px`;
            };
          };
          requestAnimationFrame(loopFn);
        };
      }
    }
  }
</script>

<template>
  <div class="card" ref="cardWrap" :style="data.VIEW === 'N' && { height: '42px' }">
    <div class="inner">
      <header ref="cardHeader">
        <button
          type="button"
          class="view-btn"
          :class="{ active : data.VIEW === 'Y'}"
          @click="changeCardView(data)"
        >
          {{ data.VIEW === 'Y' ? '카드닫기' : '카드열기' }}
        </button>
        <h2>
          <label>
            <input
              type="checkbox"
              :class="{ indeterminate : isIndeterminate }"
              @change="updateTotalComplete"
              :checked="isTotalComplete" />
            <span>체크박스</span>
          </label>
          <input
            type="text"
            placeholder="제목을 입력하세요"
            :value="cardTitle !== null ? cardTitle : data.TITLE"
            @input="changeTitle"
          />
          <button
            type="button"
            class="modify-btn"
            v-if="cardTitle && cardTitle !== data.TITLE"
            @click="updateCardTitle({ ...data, TITLE: cardTitle })"
          >
            수정
          </button>
        </h2>
        <button
          type="button"
          class="delete-btn"
          @click='openDeleteModal(data)'
        >
          카드삭제
        </button>
      </header>
      <ul>
        <slot />
      </ul>
      <button
        type="button"
        @click="addSubCardItem({ PARENTS_ID: data.ID })"
      >
        아이템 추가
      </button>
    </div>
  </div>
</template>