<script>
  import { mapState, mapActions } from 'vuex';

  import CardComp from '../components/CardComp.vue';
  import ItemComp from '../components/ItemComp.vue';
  import AddModal from '../components/AddModal.vue';
  import DeleteModal from '../components/DeleteModal.vue';
  import PeriodModal from '../components/PeriodModal.vue';
  import SelectModal from '../components/SelectModal.vue';

  export default {
    components: {
      CardComp,
      ItemComp,
      AddModal,
      DeleteModal,
      PeriodModal,
      SelectModal
    },
    computed: {
      ...mapState([
        'data'
      ]),
      subItemList() {
        return (ID) => {
          return this.$store.state.sub.filter(el => el.PARENTS_ID === ID );
        }
      },
      checkExpire() {
        return (ITEMS) => {
          return ITEMS.filter(el => {
            if(!el.START_DATE && !el.END_DATE) return true;

            const now = Number(this.$store.state.year + this.$store.state.month);
            const start = Number(el.START_DATE);
            const end = Number(el.END_DATE);

            if(now >= start && now <= end) return true;
            
            return false;
          })
        }
      }
    },
    data() {
      return {
        addModalState: false,
        deleteModalState: false,
        deleteModalData: null,
        periodModalState: false,
        periodModalData: null,
        selectModalState: false
      }
    },
    methods: {
      async addRecentCards({ CLONE_MONTH }){
        const { code } = await this.$store.dispatch('fetchApi', {
          method: 'POST',
          path: 'clone-month',
          body: { 
            CLONE_MONTH,
            MONTH: `${this.$store.state.year}${this.$store.state.month}` 
          }
        });

        if(code === 200) {
          this.selectModalState = false;
          this.$store.dispatch('updateData');
        };
      },
      async addCard({ MONTH, TITLE }){
        const { code } = await this.$store.dispatch('fetchApi', {
          method: 'POST',
          path: 'cards',
          body: { MONTH, TITLE }
        });

        if(code === 200) {
          this.$store.dispatch('updateData', () => this.addModalState = false);
        }
      },
      async deleteCardOrItem({ ID, PARENTS_ID }){
        const { code } = await this.$store.dispatch('fetchApi', {
          method: 'DELETE',
          path: PARENTS_ID ? 'cards-items' : 'cards',
          body: { ID }
        });

        if(code === 200) {
          this.$store.dispatch('updateData', () => this.deleteModalState = false);
        };
      },
      openDeleteModal(params){
        this.deleteModalData = params;
        this.deleteModalState = true;
      },
      openDatepickerModal(params){
        this.periodModalData = params;
        this.periodModalState = true;
      }
    }
  }
</script>

<template>
  <section>
    <div class="card-wrap">
      <template
        v-for="card in data"
        :key="`card_${card.ID}`"
      >
        <card-comp
          :data="card"
          :openDeleteModal="openDeleteModal"
        >
          <template
            v-for="item in checkExpire(card.ITEMS)"
            :key="`item_${card.ID}_${item.ID}`"
          >
            <item-comp 
              :data="{ ...item, parentId: $store.state.data.id }"
              :openDeleteModal="openDeleteModal"
              :openDatepickerModal="openDatepickerModal"
            />
          </template>
          <template
            v-for="sub in subItemList(card.ID)"
            :key="`sub_${sub.PARENTS_ID}`"  
          >
            <item-comp :data="sub" />
          </template>
        </card-comp>
      </template>

      <div class="card-control" :class="{ single: data && data.length }">
        <button
          type="button"
          @click="() => this.addModalState = true"
        >
          카드 추가+
        </button>
        <button
          v-if="data && !data.length"
          type="button"
          @click="() => this.selectModalState = true"
        >
          카드 블러오기
        </button>
      </div>
    </div>
  </section>
  
  <delete-modal
    v-if="deleteModalState"
    :data="deleteModalData"
    :onConfirm="deleteCardOrItem"
    :onClose="() => this.deleteModalState = false"
  />

  <add-modal
    v-if="addModalState"
    :onConfirm="addCard"
    :onClose="() => this.addModalState = false"
  />

  <period-modal
    v-if="periodModalState"
    :data="periodModalData"
    :onClose="() => this.periodModalState = false"
  />

  <select-modal
    v-if="selectModalState"
    :onConfirm="addRecentCards"
    :onClose="() => this.selectModalState = false"
  />
</template>

