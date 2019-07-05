<template>
    <div class="dialog">
        <el-dialog
        title="添加资金信息"
        :visible.sync="dialog.show"
        :close-on-click-modal="false"
        :modal-append-to-body="false"
        >
        </el-dialog>
    </div>
</template>

<script>
export default {
    props:{
        dialog:Object
    }
}
</script>
