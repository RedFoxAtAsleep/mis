<template>
    <div class="u-menu-end">
        <el-menu-item
                v-bind:index="this.uid"
                @click="activateTab"
        >
            <slot></slot>
        </el-menu-item>
    </div>
</template>
<script>
    import {mapState, mapGetters, mapMutations} from 'vuex'
    export default {
        name: "UMenuEnd",
        props: ['uid'],
        data(){
            return {}
        },
        computed: {
            ...mapState({
                // indices: state => state.indices,
                selected: state => state.selected,
                indices: state => state.indices,
            }),
            ...mapGetters([
            ]),
            ...mapMutations([
                'inverseLoaded',
            ])
        },
        watch: {},
        methods: {
            activateTab(){
                let uid = this.uid;
                let index = this.indices[uid];
                let isIframeView = 'src' in index;
                let isSingletonTabView = index['singleton'];
                if(isSingletonTabView){
                    if(!index['loaded']){
                        this.$store.commit('inverseLoaded', uid);
                    }
                    this.$store.commit('select', uid);
                    // this.$router.push(index['route']).catch();
                    this.$router.push(index['route']).catch(err => {console.log(err)})
                }

                if(isIframeView){
                    this.$router.push(index['route']).catch(err => {console.log(err)})
                }

            }
        },
    }
</script>
<style>
    .u-menu-end{}
</style>
