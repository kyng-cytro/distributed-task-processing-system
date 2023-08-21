<template>
  <div
    class="relative font-mono min-h-screen flex flex-col bg-gradient-to-b from-contessa-500 to-contessa-700 text-contessa-50 gap-3"
  >
    <header class="sticky top-0 bg-contessa-500 px-3 py-5 shadow-md">
      <NavBar />
    </header>
    <main class="h-full px-3 py-5">
      <NuxtPage />
    </main>
  </div>
</template>

<style>
/* CSS to hide nav bar */
.hide-scroll-bar::-webkit-scrollbar {
  display: none;
}

.hide-scroll-bar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
/* End of hide nav bar */

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
