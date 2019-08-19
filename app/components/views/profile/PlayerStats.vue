<template>
  <StackLayout>
    <Label>Games Played: {{ gamesPlayed }}</Label>
    <Label>Games Won: {{ this.wins }}</Label>
    <Label>Top Speed: {{ topSpeed }}</Label>
    <label>Win Streak: {{ winStreak }}</label>
    </StackLayout>
</template>


<script>
export default {
  name: 'PlayerStats',
  props: {
    userMetrics: Array,
  },
  data() {
    return {
      gamesPlayed: 0,
      wins: 0, 
      topSpeed: 0,
      winStreak: 0,
    }
  },
  created() {
    this.userMetrics.forEach((metric) => {
      const { name, value } = metric;
      this[name] = value;
    });
  },
}
</script>