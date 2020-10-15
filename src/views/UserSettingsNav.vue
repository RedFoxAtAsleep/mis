<template>
    <div>
        <div>Nav</div>
        <router-link to="/settings/emails">emails</router-link>
        <br>
        <router-link to="/settings/profile">profile</router-link>
        <br>
        <router-link to="/settings/emails/a">emails/a</router-link>
        <br>
        <router-link to="/settings/emails/ab">emails/ab</router-link>
        <br>
        <router-link to="/settings/emails/cba">emails/cba</router-link>
        <br>
        <router-link to="/settings/profile/a">profile/a</router-link>
        <br>
        <router-link to="/settings/profile/ab">profile/ab</router-link>
        <br>
        <router-link to="/settings/profile/cba">profile/cba</router-link>
    </div>
</template>

<script>
    export default {
        name: "UserSettingsNAv"
    }
</script>

<style scoped>

</style>
