
<template>
    <div class="flex flex-col min-h-screen bg-gray-900">
        <Navbar />

        <div class="main container mx-auto px-4 py-6">
            <router-view></router-view>
        </div>

        <Footer />
    </div>
</template>

<script setup>
import Navbar from './components/NavbarComponent.vue'
import Footer from './components/FooterComponent.vue'
</script>
