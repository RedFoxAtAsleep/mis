<template>
    <el-tabs class="u-el-tabs"
             v-model="selectedLocal"
             type="card"
             closable
             @tab-remove="removeTab">
        <el-tab-pane
                v-for="index in loadedIndices"
                :key="index['uid']"
                :label="index['label']"
                :name="index['uid']"
                :closable="index['closable']">
            <keep-alive>
                <router-view></router-view>
            </keep-alive>
        </el-tab-pane>
    </el-tabs>
</template>
<script>
    import {mapState, mapGetters, mapMutations} from "vuex";

    export default {
        name: "Tabs",
        data() {
            return {
                selectedLocal: this.selectedGlobal,
            }
        },
        watch: {
            // 同步代表选中标签页的全局数据项和局部数据项
            'selectedGlobal': function (now, pre) {
                // 以点击标签页以外的方式切换标签页
                // 全局变 > 局部变
                console.log(now, pre);
                if(now in this.indices){
                    this.selectedLocal = now;
                }
                else{
                    this.selectedLocal = ''
                }

            },
            'selectedLocal': function (now, pre) {
                // 在监听x中自然不能使用x，而是使用x_now和x_pre
                // 在以点击标签页切换标签页的情况下触发
                // 局部变 > 全局变
                console.log(now, pre);
                this.$store.commit('select', now);
                if (now in this.indices) {
                    this.$router.push(this.indices[now]['route']).then().catch();
                } else {
                    this.$router.push({name: 'Navigation'}).then().catch();
                }
            },

        },
        computed: {
            loadedIndices: function () {
                let indices = this.indices;
                let tmp = [];
                for (let uid of Object.getOwnPropertyNames(indices)) {
                    if (indices[uid]['loaded'] === true) {
                        tmp.push(indices[uid]);
                    }
                }
                return tmp
            },
            ...mapState({
                // indices: state => state.indices,
                selectedGlobal: state => state.selected,
                indices: state => state.indices,
            }),
            ...mapGetters([
            ]),
            ...mapMutations([
                'inverseLoaded',
            ])
        },
        methods: {
            removeTab(uid) {
                if (this.selectedLocal === uid) {
                    for (let i in this.loadedIndices) {
                        let obj = this.loadedIndices[i];
                        if (this.selectedLocal === obj['uid']) {
                            let nextObj = this.loadedIndices[i + 1] || this.loadedIndices[i - 1];
                            if (nextObj) {
                                this.selectedLocal = nextObj['uid']
                            } else {
                                this.selectedLocal = '';
                            }
                            break;
                        }
                    }
                }
                this.$store.commit('inverseLoaded', uid);
            }
        }
    }
</script>
<style>
    .u-el-tabs {
        padding: 0 !important;
        margin: 0 !important;
    }

    /*.el-tabs--card > .el-tabs__header{*/
    /*    border-bottom: none;*/
    /*}*/
    .u-el-tabs .el-tabs--border-card {
        border-bottom: none !important;
        background-color: white;
    }

    .u-el-tabs .el-tabs__header {
        height: 5vh;
        background-color: white;
        border: 0 !important;
    }

    .u-el-tabs .el-tabs__nav-wrap {
        height: 5vh;
    }

    .u-el-tabs .el-tabs__nav-scroll {
        height: 5vh;
    }

    .u-el-tabs .el-tabs__nav {
        height: 5vh;
    }

    .u-el-tabs .el-tabs__item {
        height: 5vh;
    }

    .u-el-tabs .el-tabs__content {
        height: 95vh;
    }

    .u-el-tabs .el-tab-pane {

    }

</style>
