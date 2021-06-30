<template>
    <div>
        <el-input
            style="width:100px"
            v-model="name"
            placeholder="请输入内容"
        ></el-input>
        <el-button @click="add">新增</el-button>
        <el-badge
            class="item"
            type="primary"
            :value="completeNum"
        >
            <el-button size="small">已完成</el-button>
        </el-badge>
        <el-badge
            class="item"
            :value="allNum"
        >
            <el-button size="small">所有</el-button>
        </el-badge>

        <el-table
            :data="tableData.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))"
            style="width: 40%"
        >
            <el-table-column
                prop="name"
                label="姓名"
            ><template v-slot="scope">
                    <span :class="scope.row.completed?'completed':''">
                        {{scope.row.name}}
                    </span>
                </template>
            </el-table-column>
            <el-table-column align="right">
                <template v-slot:header="scope">
                    <el-input
                        v-model="search"
                        size="mini"
                        placeholder="输入关键字搜索"
                    />
                </template>
                <template v-slot="scope">
                    <template v-if="!scope.row.completed">
                        <el-button
                            size="mini"
                            type="primary"
                            @click="handleComplete(scope.index_, scope.row)"
                        >Complete</el-button>
                        <el-button
                            size="mini"
                            @click="handleEdit(scope.index_, scope.row)"
                        >Edit</el-button>
                        <el-button
                            size="mini"
                            type="danger"
                            @click="handleDelete(scope.index_, scope.row)"
                        >Delete</el-button>
                    </template>
                    <teplmate v-else>
                        <img
                            style="cursor:pointer"
                            @click="handleDelete(scope.index_, scope.row)"
                            src="../assets/delete.png"
                            alt=""
                        >
                    </teplmate>
                </template>
            </el-table-column>
        </el-table>
        <el-dialog
            title="提示"
            :visible.sync="dialogVisible"
            width="30%"
            :before-close="handleClose"
        >
            <template v-slot:default>
                <el-input
                    style="width:100px"
                    v-model="name"
                    placeholder="请输入内容"
                ></el-input>

            </template>
            <template v-slot:footer>
                <span class="dialog-footer">
                    <el-button @click="dialogVisible = false">取 消</el-button>
                    <el-button
                        type="primary"
                        @click="edit();dialogVisible = false"
                    >确 定</el-button>
                </span>
            </template>
        </el-dialog>

    </div>
</template>

<script>
import { ref, reactive } from "vue";
import { Msgbox, Message } from "element3";

export default {
  setup() {
    const name = ref("");
    const search = ref("");
    const tableData = ref([]);
    const selectIndex = ref("");
    let dialogVisible = ref(false);
    const allNum = ref(0);
    const completeNum = ref(0);
    const add = () => {
      if (name.value) {
        tableData.value.push({ name: name.value });
        name.value = "";
        allNum.value = tableData.value.length;
      }
    };
    const handleEdit = (index, row) => {
      dialogVisible.value = true;
      name.value = row.name;
      selectIndex.value = index;
    };
    const handleDelete = (index, row) => {
      tableData.value.splice(index, 1);
      allNum.value = tableData.value.length;
      completeNum.value > 0 ? completeNum.value-- : "";
    };
    function handleClose(done) {
      Msgbox.confirm("确认关闭？")
        .then(_ => {
          done();
        })
        .catch(_ => {});
    }
    const edit = () => {
      tableData.value[selectIndex.value].name = name.value;
    };
    const handleComplete = (index, row) => {
      tableData.value[index].completed = true;
      completeNum.value++;
    };
    return {
      name,
      add,
      search,
      selectIndex,
      completeNum,
      allNum,
      tableData,
      handleEdit,
      handleDelete,
      handleClose,
      dialogVisible,
      handleClose,
      edit,
      handleComplete
    };
  }
};
</script>

<style scoped>
.item {
  margin-top: 10px;
  margin: 0 20px;
}
.completed {
  text-decoration: line-through;
}
</style>
