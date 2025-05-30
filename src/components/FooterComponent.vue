
<template>
    <footer class="bg-blue-600 text-white py-4 px-8 text-center fixed bottom-0 w-full drop-shadow-footer">
        <p class="text-sm">
            {{ new Date().getFullYear() }} &copy;
            <router-link to="/contact" class="text-green-500 font-bold">EZ e-commerce</router-link>
        </p>
    </footer>
</template>

<style>
.drop-shadow-footer {
  filter: drop-shadow(0 -10px 10px rgba(0, 0, 0, 0.25));
}
</style>
