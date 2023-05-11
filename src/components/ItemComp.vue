<script>
  export default {
    props: {
      data: Object,
      openDeleteModal: Function,
      openDatepickerModal: Function
    },
    data() {
      return {
        isEditable: false,
        expire: null,
        expireLabel: [
          { name: '매월반복' },
          { name: '이번달만' },
          { name: '기간입력' }
        ],
        changedData: { ...this.data },
        insertData: {
          TITLE: null,
          AMOUNT: null,
          REFEAT: 'Y',
          START_DATE: null,
          END_DATE: null
        }
      }
    },
    watch: {
      '$store.state.period'(newPeriod){
        const period = newPeriod.filter(el => el.ID === this.data.ID)

        if(period.length) {
          this.changedData.START_DATE = period[0].START_DATE;
          this.changedData.END_DATE = period[0].END_DATE;
        }
      }
    },
    computed: {
      expireText(){
        return ({ REFEAT, START_DATE, END_DATE }) => {
          if(REFEAT ==='N') {
            return '이번달만';
          } else if(START_DATE && END_DATE) {
            return '기간입력';
          } else {
            return '매월반복';
          };
        }
      },
      formatDate(){
        return (date) => {
          return String(date).replace(/(\d{4})(\d{2})/, '$1-$2');
        };
      },
      formatAmount(){
        if(this.isEditable) {
          return parseInt(this.data.AMOUNT);
        } else {
          return String(this.data.AMOUNT).replace(/(\d)(?=(?:\d{3})+(?!\d))/g, '$1,');
        }
      }
    },
    methods: {
      async updateComplete({ ID, COMPLETE }){
        const { code } = await this.$store.dispatch('fetchApi', {
          method: 'PATCH',
          path: 'cards-items',
          body: { ID, COMPLETE: COMPLETE === 'Y' ? 'N' : 'Y' }
        });

        if(code === 200) this.$store.dispatch('updateData');
      },
      async changeEditable({ ID, TITLE, AMOUNT, REFEAT, START_DATE, END_DATE }) {
        if(!this.isEditable) {
          this.isEditable = true;
          this.expire = this.expireText({ REFEAT, START_DATE, END_DATE });
          this.changedData = { ...this.data };

          return;
        };

        if(
          TITLE === this.changedData.TITLE &&
          AMOUNT === this.changedData.AMOUNT &&
          REFEAT === this.changedData.REFEAT &&
          START_DATE === this.changedData.START_DATE &&
          END_DATE === this.changedData.END_DATE
        ) {
          this.isEditable = false;
          return;
        };

        const { code } = await this.$store.dispatch('fetchApi', {
          method: 'PATCH',
          path: 'cards-items',
          body: { ID,
            ...(TITLE !== this.changedData.TITLE && { TITLE: this.changedData.TITLE }),
            ...(AMOUNT !== this.changedData.AMOUNT && { AMOUNT: this.changedData.AMOUNT }),
            ...(REFEAT !== this.changedData.REFEAT && { REFEAT: this.changedData.REFEAT }),
            ...(START_DATE !== this.changedData.START_DATE && { START_DATE: this.changedData.START_DATE }),
            ...(END_DATE !== this.changedData.END_DATE && { END_DATE: this.changedData.END_DATE })
          }
        });
        
        if(code === 200) {  
          this.$store.dispatch('updateData', () => this.isEditable = false );
        };
      },
      async insertCardItem({ ID, PARENTS_ID }){
        const { code } = await this.$store.dispatch('fetchApi', {
          method: 'POST',
          path: 'cards-items',
          body: {
            PARENTS_ID,
            TITLE: this.insertData.TITLE,
            AMOUNT: this.insertData.AMOUNT,
          }
        });

        if(code === 200) this.$store.dispatch('updateData', () => this.removeSubCardItem({ ID }));
      },
      changeTitle(event) {
        if(this.data.CREATED) {
          this.changedData.TITLE = event.target.value;
        } else {
          this.insertData.TITLE = event.target.value;
        }
      },
      changeAmount(event) {
        if(this.data.CREATED) {
          this.changedData.AMOUNT = event.target.value;
        } else {
          this.insertData.AMOUNT = event.target.value;
        }
      },
      changePeriod({ START_DATE, END_DATE }){
        this.changedData.START_DATE = START_DATE,
        this.changedData.END_DATE = END_DATE
      },
      changeExpireLabel(name, { START_DATE, END_DATE}) {
        let setDate = `${this.$store.state.year}${this.$store.state.month}`;
        
        if(name === '매월반복') {
          this.changedData.REFEAT = 'Y'
          this.changedData.START_DATE = null;
          this.changedData.END_DATE = null;
        };
        if(name === '이번달만') {
          this.changedData.REFEAT = 'N'
          this.changedData.START_DATE = setDate;
          this.changedData.END_DATE = setDate;
        };
        if(name === '기간입력') {
          this.changedData.REFEAT = 'Y'
          this.changedData.START_DATE = START_DATE ? START_DATE : setDate;
          this.changedData.END_DATE = END_DATE ? END_DATE : setDate;
        };
      },
      removeSubCardItem({ ID }) {
        this.$store.commit('REMOVE_SUB_ITEM', ID);
      },
      openDatepicker({ ID }){
        const params = {
          ID,
          START_DATE: this.changedData.START_DATE,
          END_DATE: this.changedData.END_DATE
        };

        this.openDatepickerModal(params);
      }
    }
  }
</script>

<template>
  <li :class="{ edit: isEditable, sub: !data.CREATED }" >
    <label :for="`check_${data.PARENTS_ID}_${data.ID}`">
      <input
        :id="`check_${data.PARENTS_ID}_${data.ID}`"
        type="checkbox"
        :checked="data.COMPLETE === 'Y'"
        @input="updateComplete(data)"
      >
      <span>체크박스</span>
    </label>
    <div class="list">
      <input
        type="text"
        class="title-input"
        placeholder="제목을 입력하세요" 
        :value="isEditable ? changedData.TITLE : data.TITLE"
        @input="changeTitle"
      />
      <span class="period-type" v-if="!isEditable">{{ expireText(data) }}</span>
      <label class="amount">
        <input
          :type="isEditable ? 'number' : 'text'"
          :value="isEditable ? changedData.AMOUNT : formatAmount"
          placeholder="금액을 입력하세요"
          @input="changeAmount"
        />
        <span class="unit">원</span>
      </label>
      <div class="period" v-if="!isEditable && expireText(data) === '기간입력'">
        {{ `${formatDate(data.START_DATE)} ~ ${formatDate(data.END_DATE)}` }}
      </div>
      <div v-if="isEditable">
        <div class="setting">
          <template v-for="el in expireLabel" :key="el.name">
            <label>
              <input 
                type="radio"
                :name="`radio_${data.PARENTS_ID}_${data.ID}`"
                :checked="el.name === expireText(data)"
                :value="el.name"
                v-model="expire"
                @change="changeExpireLabel(el.name, data)"
              />
              <span>{{ el.name }}</span>
            </label>
          </template>
        </div>
        <button
          type="button"
          v-if="expire === '기간입력'"
          @click="openDatepicker(data)"  
        >
          <span class="start-date">{{ formatDate(changedData.START_DATE) }}</span>
          ~
          <span class="end-date">{{ formatDate(changedData.END_DATE) }}</span>
        </button>
      </div>
    </div>
    <div class="control">
      <button
        type="button"
        class="modify-btn"
        @click="data.CREATED 
          ? changeEditable(data)
          : insertCardItem(data)"  
      >
        {{ (() => {
            if(data.CREATED){
              return isEditable ? "완료" : "수정";
            } else {
              return '등록';
            }
          })() }}
      </button>
      <button
        v-if="isEditable"
        type="button"
        class="cancel-btn"
        @click="() => isEditable = false"
      >
        취소
      </button>
      <button
        v-else
        type="button"
        class="delete-btn"
        @click="data.CREATED 
          ? openDeleteModal(data)
          : removeSubCardItem(data)"
      >
        삭제
      </button>
      
    </div>
  </li>
</template>