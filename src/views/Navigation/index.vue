<template>
    <div class="navigation-index">
        <el-container :style="window">
            <el-aside :style="window_navigation">
                <u-menu v-bind:items="this.indexConfig"></u-menu>
            </el-aside>
            <el-container>
                <el-main :style="window_content">
                    <tabs></tabs>
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>
<style>

    .navigation-index{}

    .navigation-index .el-container {
    }

    .navigation-index .el-header {
    }

    .navigation-index .el-aside {
        /*border-right: solid 2px #000000;*/
    }

</style>
<script>
    import {mapState, mapGetters} from "vuex";
    import Tabs from "@/views/Navigation/Tabs";
    import UMenu from "@/views/Navigation/UMenu";

    export default {
        created() {
            this.window = {
                width: '100vw',
                height: '100vh',
                margin: 0,
                padding: 0,
                border: 0,
            };
            this.window_navigation = {
                'width': this.availWidth / 4,
                'height': this.availHeight,
                'overflow': 'scroll',
                'background-color': "#47475B",
            };
            this.window_content = {
                'width': this.availWidth * 3 / 4,
                'height': this.availHeight,
                'overflow': 'scroll',
                'background-color': "#FFFFFF",
                margin: 0,
                padding: 0,
                border: 0,
            }

        },
        data() {
            // do somethings
            return {
                window: {},
                window_navigation: {},
                window_content: {
                    margin: 0,
                    padding: 0,
                }
            }
        },
        computed: {
            ...mapState({
                indexConfig: state => state.indexConfig,
            }),
            ...mapGetters([]),
            availHeight: function () {
                return window.screen.availHeight;
            },
            availWidth: function () {
                return window.screen.availWidth;
            }
        },
        components: {
            Tabs,
            UMenu
        }
    };
</script>
