<template>
    <ScrollView>
      <StackLayout orientation="vertical" width="*" height="*" backgroundColor="white">
        <ListView for="game in games" style="height:1250px">
          <v-template>
            <Button
              :text="game.code"
              @tap="handleJoin(game)"
              width="80%"
              height="20%"
              backgroundColor="#5EB0E5"
              marginTop="20"
              textAlignment="center"
              color="white"
              fontSize="20"
              fontWeight="bold"
              borderRadius="30"
            />
          </v-template>
        </ListView>
      </StackLayout>
    </ScrollView>
</template>

<script>
export default {
  name: 'LobbyGame',
  props: {
    games: Array,
    handleJoin: Function,
  }
};
</script>

<style lang="scss" scoped>
</style>