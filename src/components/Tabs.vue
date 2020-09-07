<template>
    <div>
        <el-tabs
                v-model="selectedTabName"
                type="card"
                closable
                @tab-remove="removeTab"
        >
            <el-tab-pane
                    v-for="page in loadedPages"
                    :key="page['uid']"
                    :label="page['label']"
                    :name="page['uid']"
            >
                <router-view></router-view>
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
                selectedTabName: '',
            }
        },
        watch: {
            'selectedPath': function (now, pre) {
                console.log(now, pre);
                this.selectedTabName = 'page-' + now;
            },
            'selectedTabName': function (now, pre) {
                console.log(now, pre);
                let path = this.selectedTabName.split('-').slice(1).join('-');
                this.$store.commit('selectPath', path);
                this.$router.push(this.pages['page-'+path]['route'])
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
            addTab(targetName) {
                console.log(targetName);
                let newTabName = ++this.tabuid + '';
                this.editableTabs.push({
                    title: 'New Tab',
                    name: newTabName,
                    content: 'New Tab content'
                });
                this.editableTabsValue = newTabName;
            },
            removeTab(tabName) {
                console.log('tabName', tabName);
                let nextTabName;
                if (this.seletedTabName === tabName) {
                    for (let i in this.loadedPages) {
                        let pageObj = this.loadedPages[i];
                        if (this.seletedTabName === pageObj['uid']) {
                            let nextTab = this.loadedPages[i + 1] || this.loadedPages[i - 1];
                            if (nextTab){
                                nextTabName = nextTab['uid']
                            }
                            break;
                        }
                    }
                }
                this.$store.commit('inverseLoaded', tabName);
                this.selectedTabName = nextTabName;

            }
        }
    }
</script>
