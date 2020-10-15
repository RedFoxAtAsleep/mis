<template>
    <div>
        <h3>Preview of your profile</h3>
        <router-view></router-view>
        <router-view name='x'></router-view>
        <router-view name='y'></router-view>
    </div>
</template>

<script>
    export default {
        name: "UserProfilePreview"
    }
</script>

<style scoped>

</style>
