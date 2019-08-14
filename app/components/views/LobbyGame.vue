<template>
    <ScrollView>
      <StackLayout orientation="vertical" width="*" height="*" backgroundColor="white">
        <ListView for="game in games" style="height:1250px">
          <v-template>
            <FlexboxLayout
                width="50%"
                height="20%"
                backgroundColor="#5EB0E5"
                textAlignment="center"
                color="white"
                fontSize="20"
                fontWeight="bold"
                borderRadius="30" >
              <Label
                width="50%"
                height="20%"
                backgroundColor="#5EB0E5"
                textAlignment="center"
                alignSelf="center"
                color="white"
                fontSize="15"
                fontWeight="bold"
                borderRadius="30"
                paddingLeft="20%"
                flexGrow="1"
                :text="`${game.code}: ${game.playerCount} / ${game.playerLimit} players`" />
              <Button
                height="20%"
                backgroundColor="orange"
                textAlignment="center"
                color="white"
                fontSize="15"
                fontWeight="bold"
                borderRadius="30"
                text="join"
                @tap="handleJoin(game)" />
            </FlexboxLayout>
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
  },
};
</script>

<style lang="scss" scoped>
</style>