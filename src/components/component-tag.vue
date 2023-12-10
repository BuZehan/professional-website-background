<template>
  <div id="tag">
    <el-tag
      size="small"
      v-for="(tag,index) in tags"
      :key="tag.label"
      :closable="tag.name !== 'home'"
      :effect="$route.name == tag.name ? 'dark' : 'plain'"
      @click.native="changeMenu(tag)"
      @close="handleClose(tag,index)"
    >
      {{ tag.label }}
    </el-tag>
  </div>
</template>

<script>
import { mapState,mapMutations } from "vuex";
export default {
  name: "tag",
  computed: {
    ...mapState({
      tags: (state) => state.tapAside.tapList,
    }),
  },
  mounted() {},
  methods: {
    ...mapMutations('tapAside',["CHANGE_TAGS"]),
    changeMenu(tag) {
      this.$router.push({path:tag.name}).catch(err => err)
    },
    handleClose(item,index){
      let data = {
        item,
        index
      }
      this.CHANGE_TAGS(data)
      //删除之后的跳转逻辑
      let length = this.tags.length
      if(item.name !== this.$route.name){
        return
      }
      if(index === length){
        this.$router.push({
          path:this.tags[index - 1].name
        })
      }else{
        this.$router.push({
          path:this.tags[index].name
        })
      }
    }
  },
};
</script>

<style scoped lang="less">
#tag {
  padding: 5px 20px;
  position: relative;
  z-index: 1000;
  background-color: rgb(255, 255, 255);
}
.el-tag {
  margin: 0 10px;
  cursor: pointer;
}
</style>
