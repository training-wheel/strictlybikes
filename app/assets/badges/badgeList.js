// import axios from 'axios';

// function sendBadgeList() {
//   const badges = [['5WinBadge', 'Win 5 games.', 5], ['10WinBadge', 'Win 10 games.', 10], ['15WinBadge', 'Win 15 games.', 15]];
//   function getAllBadges(array) {
//     const badgeList = {};
//     array.forEach((badge) => {
//       badgeList[badge[0]] = { description: badge[1], goal: badge[2] };
//     });
//     axios.post('/getBadges', badgeList)
//       .then(myBadges => myBadges)
//       .catch((e) => {
//         console.error(e);
//       });
//     return getAllBadges(badges);
//   }
// }
// const badgesLoad = sendBadgeList();
