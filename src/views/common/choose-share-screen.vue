<template>
  <div class="p-20">
    <div class="title fz-16">桌面</div>
    <div class="m-t-8">
      <a-row>
        <a-col
          v-for="(item, idx) in screens"
          :key="idx"
          :span="6"
          class="share-screen-item m-b-8"
          :class="[idx === checkedScreenIdx ? 'checked-screen' : '', (idx + 1) % 4 !== 0 ? 'm-r-8' : '' ]"
          @click="checkedScreen(idx)"
        >
          <div class="share-screen-item-video-container"></div>
          <span class="block t-a-c">
            {{ item.name }}
          </span>
        </a-col>
      </a-row>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      screens: [
        {
          name: '桌面0'
        },
        {
          name: '桌面1'
        },
        {
          name: '桌面2'
        },
        {
          name: '桌面3'
        },
        {
          name: '桌面4'
        },
        {
          name: '桌面5'
        }
      ],
      checkedScreenIdx: null
    }
  },
  methods: {
    checkedScreen(idx) {
      this.checkedScreenIdx = idx
    }
  }
}
</script>

<style lang="scss" scoped>
.share-screen-item {
  width: 168px;
  height: 115px;
  border: 1px solid #ebedf0;
  border-radius: 4px;
  padding: 8px 10px 3px 10px;
  // margin: 0 8px 8px 0px;

  .share-screen-item-video-container {
    height: 80px;
    border: 1px solid #ebedf0;
  }
}

.checked-screen {
  background-color: #1890ff;
  color: #fff;
}
</style>
