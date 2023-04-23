<script>
  import { mapState, mapActions } from 'vuex';

  import CardItem from '../components/CardItem.vue';
  import CardItemList from '../components/CardItemList.vue';
  import DeleteModal from '../components/DeleteModal.vue';
  import DatePickerModal from '../components/DatePickerModal.vue';


  export default {
    components: {
      CardItem,
      CardItemList,
      DeleteModal,
      DatePickerModal
    },
    setup(){
    },
    computed: {
      ...mapState([
        'data'
      ])
    },
    data() {
      return {
        deleteModalState: false,
        deleteData: null,
      }
    },
    methods: {
      openDeleteModal: function(params){
        this.deleteModalState = true;
        this.deleteData = params;
      },
      deleteCardList: function(params){
        const { id, parentId } = params;

        // temp
        this.$store.dispatch('testCall',
          { method: 'DELETE', id, parentId }
        );

        this.closeDeleteModal();
      },
      closeDeleteModal: function(){
        this.deleteModalState = false;
      },

      changeItemList: function(){
        this.$store.dispatch('testCall',
          { method: 'PATCH' }
        )
      },
    }
  }
</script>

<template>
  <section>
    <div class="card-wrap">
      <template
        v-for="(card, index) in data"
        :key="`card_${index}`"
      >
        <CardItem
          :data="card"
        >
          <template
            v-for="(list, index) in card.list"
            :key="index"
          >
            <CardItemList 
              :data="{ ...list, parentId: $store.state.data.id }"
              :openDeleteModal="openDeleteModal"
              :changeItemList="changeItemList"
            />
          </template>
        </CardItem>
      </template>
    </div>
  </section>
  
  <DeleteModal
    :state="deleteModalState"
    :data="deleteData"
    :onConfirm="deleteCardList"
    :onClose="closeDeleteModal"
  />

  <DatePickerModal
  />
</template>

