const radiostations = [
    {
      name: "Blaine County Talk Radio",
      filename: "blaine-county-talk-radio.png",
      link: "https://www.youtube.com/watch?v=aaXui87cF5Y&t=3588s",
      seconds: 12439
    },
    {
      name: "Blonded Los Santos",
      filename: "blonded-los-santos.webp",
      link: "https://youtu.be/-tVumJBaTWY?si=hP515TI0qg5CteXU",
      seconds: 14219
    },
    {
      name: "Channel X",
      filename: "channel-x.png",
      link: "https://www.youtube.com/watch?v=S1-sjuvgo6s",
      seconds: 14423
    },
    {
      name: "East Los FM",
      filename: "east-los-fm.png",
      link: "https://youtu.be/iX2liYJZuJU?si=Fdx9XyuQFzozERhM",
      seconds: 4105
    },
    {
      name: "FlyLo FM",
      filename: "fly-lo-fm.png",
      link: "https://www.youtube.com/watch?v=YAzCJINGWGM",
      seconds: 10430
    },
    {
      name: "iFruit Radio",
      filename: "ifruit-radio.webp",
      link: "https://youtu.be/fpvJaphZ2_g?si=98insbOs6XHfjknH",
      seconds: 12641
    },
    {
      name: "Kult FM",
      filename: "kult-fm.webp",
      link: "https://youtu.be/FY9EiOllRhE?si=V0EmyMvvYCkXTniF",
      seconds: 22006
    },
    {
      name: "Los Santos Rock Radio",
      filename: "los-santos-rock-radio.png",
      link: "https://www.youtube.com/watch?v=fZPV-9GlM-c",
      seconds: 44720
    },
    {
      name: "Los Santos Underground Radio",
      filename: "los-santos-underground-radio.png",
      link: "https://www.youtube.com/watch?v=I2Xjuz-mnN0",
      seconds: 43854
    },
    {
      name: "Motomami Los Santos",
      filename: "motomami.svg",
      link: "https://youtu.be/30uA_Hppzpc",
      seconds: 31559
    },
    {
      name: "The Music Locker",
      filename: "music-locker-radio.webp",
      link: "https://www.youtube.com/watch?v=dBvMBYbUZFc",
      seconds: 73405
    },
    {
      name: "Non-Stop Pop FM",
      filename: "non-stop-pop-fm.png",
      link: "https://www.youtube.com/watch?v=Fjp0wu3lEHk",
      seconds: 35118
    },
    {
      name: "Radio Los Santos",
      filename: "radio-los-santos.png",
      link: "https://www.youtube.com/watch?v=C3_FSXZtRe8",
      seconds: 55624
    },
    {
      name: "Radio Mirror Park",
      filename: "radio-mirror-park.webp",
      link: "https://www.youtube.com/watch?v=SDWHIACuuaQ",
      seconds: 33253
    },
    {
      name: "Rebel Radio",
      filename: "rebel-radio.webp",
      link: "https://youtu.be/N12WWl_f3QM?si=H0rzjb_3-THwvPZ9",
      seconds: 5737
    },
    {
      name: "Soulwax FM",
      filename: "soulwax-fm.webp",
      link: "https://youtu.be/sFwcLC5HC9I?si=e6gAJ6OgsUjr1oGj",
      seconds: 4246
    },
    {
      name: "Space 103.2",
      filename: "space.png",
      link: "https://youtu.be/lCZc9y9KpY4?si=eEQaYVsi0opQtd-z",
      seconds: 13413
    },
    {
      name: "Still Slipping Los Santos",
      filename: "still-slipping-los-santos.png",
      link: "https://youtu.be/P3qixldzDow?si=1eAXSkGFVya4YnRU",
      seconds: 11244
    },
    {
      name: "The Blue Ark",
      filename: "the-blue-ark.webp",
      link: "https://youtu.be/osmrXqRuwJA?si=Lp4TtHzfj30LDILX",
      seconds: 11950
    },
    {
      name: "The Lab",
      filename: "the-lab.webp",
      link: "https://youtu.be/4J6JK7ich6E?si=zh7FT23Qien--43T",
      seconds: 5459
    },
    {
      name: "The Lowdown 91.1",
      filename: "the-lowdown.webp",
      link: "https://www.youtube.com/watch?v=oaNdiTLKlMA",
      seconds: 11252
    },
    {
      name: "Vinewood Boulevard Radio",
      filename: "vinewood-boulevard-radio.webp",
      link: "https://youtu.be/5fnGyUc2eFs?si=8gMR5ZjrNyjHfvCt",
      seconds: 13530
    },
    {
      name: "WCTR",
      filename: "wctr.webp",
      link: "https://www.youtube.com/watch?v=IhCFJnaYvnI",
      seconds: 13655
    },
    {
      name: "West Coast Classics",
      filename: "west-coast-classics.webp",
      link: "https://www.youtube.com/watch?v=wnmg6CfHQ18",
      seconds: 20132
    },
    {
      name: "Worldwide FM",
      filename: "worldwide-fm.png",
      link: "https://youtu.be/fYi-ZoglszY?si=t36_NeqCJOFDkfAC",
      seconds: 15600
    }
  ];

radiostations.forEach((element) => {
    const splitTime = `${element.seconds}`.padStart(5,"0")

    const hours = Number(splitTime.substring(0,1)) * 3600
 
    const minutes = Number(splitTime.substring(1,3)) * 60

    const seconds = Number(splitTime.substring(3,6)) 
 
    
    element.seconds = (hours + minutes + seconds)
    
});

console.log(radiostations)