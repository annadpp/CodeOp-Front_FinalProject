<template>
  <div class="bg-background">
    <img
      class="absolute right-0 bottom-0 z-0"
      src="./assets/background-shadow.png"
      alt=""
    />
    <Header menu="home" />
    <div class="z-10 relative">
      <router-view></router-view>
    </div>
    <Footer class="z-10 relative" />
  </div>
</template>

<script>
import Header from "./components/Header.vue";
import Footer from "./components/Footer.vue";
export default {
  name: "App",
  components: { Header, Footer },
};
</script>

<style>
h2 {
  font-size: 3.5rem;
}

.text-border-lime {
  text-shadow: rgb(208, 238, 82) 5px 0px 0px,
    rgb(208, 238, 82) 4.90033px 0.993347px 0px,
    rgb(208, 238, 82) 4.60531px 1.94709px 0px,
    rgb(208, 238, 82) 4.12668px 2.82321px 0px,
    rgb(208, 238, 82) 3.48353px 3.58678px 0px,
    rgb(208, 238, 82) 2.70151px 4.20736px 0px,
    rgb(208, 238, 82) 1.81179px 4.6602px 0px,
    rgb(208, 238, 82) 0.849836px 4.92725px 0px,
    rgb(208, 238, 82) -0.145998px 4.99787px 0px,
    rgb(208, 238, 82) -1.13601px 4.86924px 0px,
    rgb(208, 238, 82) -2.08073px 4.54649px 0px,
    rgb(208, 238, 82) -2.94251px 4.04248px 0px,
    rgb(208, 238, 82) -3.68697px 3.37732px 0px,
    rgb(208, 238, 82) -4.28444px 2.57751px 0px,
    rgb(208, 238, 82) -4.71111px 1.67494px 0px,
    rgb(208, 238, 82) -4.94996px 0.7056px 0px,
    rgb(208, 238, 82) -4.99147px -0.291871px 0px,
    rgb(208, 238, 82) -4.83399px -1.27771px 0px,
    rgb(208, 238, 82) -4.48379px -2.2126px 0px,
    rgb(208, 238, 82) -3.95484px -3.05929px 0px,
    rgb(208, 238, 82) -3.26822px -3.78401px 0px,
    rgb(208, 238, 82) -2.4513px -4.35788px 0px,
    rgb(208, 238, 82) -1.53666px -4.75801px 0px,
    rgb(208, 238, 82) -0.560763px -4.96845px 0px,
    rgb(208, 238, 82) 0.437495px -4.98082px 0px,
    rgb(208, 238, 82) 1.41831px -4.79462px 0px,
    rgb(208, 238, 82) 2.34258px -4.41727px 0px,
    rgb(208, 238, 82) 3.17346px -3.86382px 0px,
    rgb(208, 238, 82) 3.87783px -3.15633px 0px,
    rgb(208, 238, 82) 4.4276px -2.32301px 0px,
    rgb(208, 238, 82) 4.80085px -1.39708px 0px,
    rgb(208, 238, 82) 4.98271px -0.415447px 0px;
  text-transform: uppercase;
}

.text-border-orange {
  text-shadow: rgb(253, 95, 9) 5px 0px 0px,
    rgb(253, 95, 9) 4.90033px 0.993347px 0px,
    rgb(253, 95, 9) 4.60531px 1.94709px 0px,
    rgb(253, 95, 9) 4.12668px 2.82321px 0px,
    rgb(253, 95, 9) 3.48353px 3.58678px 0px,
    rgb(253, 95, 9) 2.70151px 4.20736px 0px,
    rgb(253, 95, 9) 1.81179px 4.6602px 0px,
    rgb(253, 95, 9) 0.849836px 4.92725px 0px,
    rgb(253, 95, 9) -0.145998px 4.99787px 0px,
    rgb(253, 95, 9) -1.13601px 4.86924px 0px,
    rgb(253, 95, 9) -2.08073px 4.54649px 0px,
    rgb(253, 95, 9) -2.94251px 4.04248px 0px,
    rgb(253, 95, 9) -3.68697px 3.37732px 0px,
    rgb(253, 95, 9) -4.28444px 2.57751px 0px,
    rgb(253, 95, 9) -4.71111px 1.67494px 0px,
    rgb(253, 95, 9) -4.94996px 0.7056px 0px,
    rgb(253, 95, 9) -4.99147px -0.291871px 0px,
    rgb(253, 95, 9) -4.83399px -1.27771px 0px,
    rgb(253, 95, 9) -4.48379px -2.2126px 0px,
    rgb(253, 95, 9) -3.95484px -3.05929px 0px,
    rgb(253, 95, 9) -3.26822px -3.78401px 0px,
    rgb(253, 95, 9) -2.4513px -4.35788px 0px,
    rgb(253, 95, 9) -1.53666px -4.75801px 0px,
    rgb(253, 95, 9) -0.560763px -4.96845px 0px,
    rgb(253, 95, 9) 0.437495px -4.98082px 0px,
    rgb(253, 95, 9) 1.41831px -4.79462px 0px,
    rgb(253, 95, 9) 2.34258px -4.41727px 0px,
    rgb(253, 95, 9) 3.17346px -3.86382px 0px,
    rgb(253, 95, 9) 3.87783px -3.15633px 0px,
    rgb(253, 95, 9) 4.4276px -2.32301px 0px,
    rgb(253, 95, 9) 4.80085px -1.39708px 0px,
    rgb(253, 95, 9) 4.98271px -0.415447px 0px;
  text-transform: uppercase;
}
</style>
