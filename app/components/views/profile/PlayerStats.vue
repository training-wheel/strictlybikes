<template>
  <StackLayout>
    <Label>Games Played: {games}</Label>
    <Label>Games Won: {games}</Label>
    <Label>Games Lost: {losses}</Label>  
    <Label>Games Lost: {losses}</Label>  
    </StackLayout>
</template>


<script>
export default {
  name: PlayerStats,

  data() {
    return {
      playerStats: {
        games: 0,
        wins: 0, 
        losses: 0,
        totalDist: 0,
      }
    }
  }
}
</script>