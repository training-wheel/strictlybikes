<template>
  <scrollView>
    <WrapLayout backgroundColor="#08F">
      
      {{ badges.map((badge) => {
        return (
          <StackLayout>
            <Image :src="badges.image" max horizontalAlignment="center" height=10% />
            <Label :text="badges.text" horizontalAlignment="center" />
          </StackLayout>

        )
      }) }}
    </WrapLayout>
  </scrollView>
</template>

<script>
  export default {
    name: "Badges",
    
    methods: {
      name() {
        
      }
    },
    data() {
      return {
        done: 50,
        max: 100,
        badges: [
          {
            text: "First mile",
            image: "https://www.pokemoncenter.com/wcsstore/PokemonCatalogAssetStore/images/catalog/products/P3025/710-02306/P3025_710-02306_05.jpg",
          }
        ]
      }
    },
  }
</script>

<style lang="scss" scoped>

</style>