<template>
    <div>
        <el-tabs
                v-model="selectedTabName"
                type="border-card"
                closable
                @tab-remove="removeTab"
        >
                <el-tab-pane
                        v-for="page in loadedPages"
                        :key="page['uid']"
                        :label="page['label']"
                        :name="page['uid']"
                        :closable="page['closable']"

                >
                    <keep-alive>
                        <router-view></router-view>
                    </keep-alive>
                </el-tab-pane>
        </el-tabs>
    </div>
</template>
<script>
    import {mapState, mapMutations} from "vuex";

    export default {
        name: "Tabs",
        data() {
            return {
                selectedTabName:'page-hidden',
            }
        },
        watch: {
            // 同步代表选中标签页的全局数据项和局部数据项
            'selectedPath': function (now, pre) {
                // 以点击标签页以外的方式切换标签页
                // 全局变 > 局部变
                console.log('now: ', now, '; pre: ', pre);
                this.selectedTabName = 'page-' + now;
            },
            'selectedTabName': function (now, pre) {
                // 在监听x中自然不能使用x，而是使用x_now和x_pre
                // 在以点击标签页切换标签页的情况下触发
                // 局不变 > 全局变
                console.log(now, pre);
                let path = now.split('-').slice(1).join('-');
                console.log('#######', path);
                this.$store.commit('selectPath', path);
                this.$router.push(this.pages['page-'+path]['route']).catch()
                // this.$router.push(this.pages['page-'+path]['route']).catch(err => {console.log(err)})
            }
        },
        computed: {
            loadedPages: function () {
                let that = this;
                let tmp = [];
                for (let pageUid in that.pages) {
                    if (that.pages[pageUid]['loaded'] === true) {
                        tmp.push(that.pages[pageUid]);
                    }
                }
                return tmp
            },
            ...mapState({
                pages: state => state.pages,
                selectedPath: state => state.selectedPath
            }),
            ...mapMutations([
                'inverseLoaded',
            ])
        },
        methods: {
            removeTab(tabName) {
                console.log('remove tab', tabName);
                if (this.selectedTabName === tabName) {
                    for (let i in this.loadedPages) {
                        let pageObj = this.loadedPages[i];
                        if (this.selectedTabName === pageObj['uid']) {
                            let nextTab = this.loadedPages[i + 1] || this.loadedPages[i - 1];
                            if (nextTab){
                                this.selectedTabName = nextTab['uid']
                            }
                            else{
                                this.selectedTabName = 'page-hidden'
                            }
                            break;
                        }
                    }
                }
                this.$store.commit('inverseLoaded', tabName);

            }
        }
    }
</script>
