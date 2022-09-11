<template>
<q-page class="flex flex-center">
    <q-card class="my-card">
        <q-card-section>
            <authForm  title="Iniciar Sesión" :signUp='false'/>
        </q-card-section>
    </q-card>
</q-page>
</template>

<script>
export default {
    components: {
        'authForm' : require('components/Auth/AuthForm.vue').default
    }
}
</script>

<style>

</style>
