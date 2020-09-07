<template>
    <el-menu-item v-bind:index="uid" @click="activateTab"><slot></slot></el-menu-item>
</template>
<script>
    import {mapState, mapMutations} from 'vuex'
    export default {
        name: "UMenuEnd",
        props: ['uid', 'path'],
        data(){
            return {}
        },
        computed: {
            ...mapState({
                pages: state => state.pages,
                selectedPath: state => state.selectedPath
            }),
            ...mapMutations([
                'inverseLoaded',
            ])
        },
        methods: {
            activateTab(target){
                console.log(target);
                let pageUid = 'page-'+this.path;
                // let pageUid = this.uid.split('-').slice(1).join('-');
                if(!this.pages[pageUid]['loaded']){
                    this.$store.commit('inverseLoaded', pageUid);
                }
                this.$store.commit('selectPath', this.path);
                this.$router.push(this.pages[this.path]['route'])
            }
        },
    }
</script>
<style scoped>

</style>
