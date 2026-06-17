const AppDataSource = require("../data-source");
const Movie = require("../models/Movie");

const data = [
  {
    title: "Bhooth Bangla",
    posterUrl:
      "https://assets-in.bmscdn.com/iedb/movies/images/mobile/thumbnail/xlarge/bhooth-bangla-et00411383-1768196983.jpg",
    desc: "Arjun Acharya, a financially troubled man in his late 30s, unexpectedly inherits his grandfather's massive ancestral palace, Acharya Niwas, in a remote North Indian town called Mangalpur. Seeing an opportunity to fix his life, Arjun plans to host his sister Meera's long-delayed wedding at the palace. However, the town is gripped by a terrifying curse.",
    runtime: 165,
    cast: [
      {
        name: "Akshay Kumar",
        alias: "Arjun Acharya / Madhav Acharya",
        profilePic:
          "https://in.bmscdn.com/iedb/artist/images/website/poster/large/akshay-kumar-94-1681713982.jpg",
      },
    ],
  },
  {
    title: "Dhurandhar The Revenge",
    posterUrl:
      "https://assets-in.bmscdn.com/iedb/movies/images/mobile/thumbnail/xlarge/dhurandhar-the-revenge-et00478890-1772893614.jpg",
    desc: "Dhurandhar The Revenge introduces Jaskirat Singh Rangi, tracing the chain of events that compel him to become Hamza Ali Mazari, and follows his rise as he operates deep inside Pakistan.",
    runtime: 229,
    cast: [
      {
        name: "Ranveer Singh",
        alias: "Hamza Ali Mazari / Jasikirat Singh Rangi",
        profilePic:
          "https://in.bmscdn.com/iedb/artist/images/website/poster/large/ranveer_singh_19858_26-07-2016_04-59-37.jpg",
      },
    ],
  },
  {
    title: "Raja Shivaji",
    posterUrl:
      "https://assets-in.bmscdn.com/iedb/movies/images/mobile/thumbnail/xlarge/raja-shivaji-et00387899-1777267945.jpg",
    desc: "Raja Shivaji, based on the life of India's greatest warrior king, Chhatrapati Shivaji Maharaj, who rose against formidable powers to lay the foundation of Swarajya.",
    runtime: 187,
    cast: [
      {
        name: "Riteish Deshmukh",
        alias: "Chhatrapati Shivaji Maharaj",
        profilePic:
          "https://in.bmscdn.com/iedb/artist/images/website/poster/large/riteish-deshmukh-25378-13-09-2017-04-40-50.jpg",
      },
    ],
  },
  {
    title: "Mortal Kombat II",
    posterUrl:
      "https://assets-in.bmscdn.com/iedb/movies/images/mobile/thumbnail/xlarge/mortal-kombat-ii-et00454244-1752816897.jpg",
    desc: "This time, the fan favorite champions - now joined by Johnny Cage himself - are pitted against one another in the ultimate no-holds-barred, gory battle to defeat Shao Kahn's dark rule, which threatens the very existence of the Earthrealm and its defenders.",
    runtime: 115,
    cast: [
      {
        name: "Karl Urban",
        alias: "Johnny Cage",
        profilePic:
          "https://in.bmscdn.com/iedb/artist/images/website/poster/large/karl-urban-1156-1752810093.jpg",
      },
    ],
  },
  {
    title: "The Devil Wears Prada 2",
    posterUrl:
      "https://assets-in.bmscdn.com/iedb/movies/images/mobile/thumbnail/xlarge/the-devil-wears-prada-2-et00482763-1777267896.jpg",
    desc: "Two decades after the original phenomenon, high fashion returns to the sleek offices of Runway Magazine. In this eagerly awaited sequel to The Devil Wears Prada, iconic characters navigate a shifting industry in New York City, balancing timeless style with the cutthroat world of modern digital ambition.",
    runtime: 120,
    cast: [
      {
        name: "Meryl Streep",
        alias: "Miranda Priestly",
        profilePic:
          "https://in.bmscdn.com/iedb/artist/images/website/poster/large/meryl-streep-1443-24-03-2017-17-27-44.jpg",
      },
    ],
  },
  {
    title: "Krishnavataram Part 1: The Heart",
    posterUrl:
      "https://assets-in.bmscdn.com/iedb/movies/images/mobile/thumbnail/xlarge/krishnavataram-part-1-the-heart-et00495498-1777879506.jpg",
    desc: `A grand retelling of Krishna's journey, told on a breathtaking scale.
           A visual spectacle made for the big screen.
           A story of love, devotion and wonder.`,
    runtime: 149,
    cast: [
      {
        name: "Siddharth Gupta",
        alias: "Krishna",
        profilePic:
          "https://in.bmscdn.com/iedb/artist/images/website/poster/large/siddharth-gupta-2056857-1776240120.jpg",
      },
    ],
  },
  {
    title: "Michael",
    posterUrl:
      "https://assets-in.bmscdn.com/iedb/movies/images/mobile/thumbnail/xlarge/michael-et00470110-1770612080.jpg",
    desc: "Michael is an upcoming American biographical musical drama film directed by Antoine Fuqua and written by John Logan, based on the life of the American singer, songwriter, and dancer Michael Jackson. Jackson is played by his nephew, Jaafar Jackson, in his film debut.",
    runtime: 130,
    cast: [
      {
        name: "Jaafar Jackson",
        alias: "Michael Jackson",
        profilePic:
          "https://assets-in.bmscdn.com/iedb/artist/images/website/poster/large/jaafar-jackson-2052307-1762539106.jpg",
      },
    ],
  },
  {
    title: "Daadi Ki Shaadi",
    posterUrl:
      "https://assets-in.bmscdn.com/iedb/movies/images/mobile/thumbnail/xlarge/daadi-ki-shaadi-et00495169-1776081340.jpg",
    desc: `An "inadvertent" Facebook post by a lonely yet zestful grandmother about her upcoming "marriage" compromises her granddaughter's wedding, stirring up a pandemonium of conflicts and secrets. The situation escalates until the prospective grandson-in-law, Tony Kalra, takes it upon himself to bring her dysfunctional family together in this heartwarming and chaotic narrative.`,
    runtime: 150,
    cast: [
      {
        name: "Neetu Singh",
        alias: "Daadi",
        profilePic:
          "https://in.bmscdn.com/iedb/artist/images/website/poster/large/neetu-singh-6970-24-03-2017-12-47-32.jpg",
      },
    ],
  },
  {
    title: "The Sheep Detectives",
    posterUrl:
      "https://assets-in.bmscdn.com/iedb/movies/images/mobile/thumbnail/xlarge/the-sheep-detectives-et00480372-1774877820.jpg",
    desc: "A quirky animated mystery where a group of clever sheep solve crimes in the countryside.Every night, a shepherd reads aloud a murder mystery, pretending his sheep can understand. When he is found dead, the sheep immediately realise it was a murder and believe they know exactly how to solve it.",
    runtime: 114,
    cast: [
      {
        name: "Hugh Jackman",
        alias: "Shaun",
        profilePic:
          "https://in.bmscdn.com/iedb/artist/images/website/poster/large/hugh-jackman-835-1770970969.jpg",
      },
    ],
  },
];

async function main() {
  await AppDataSource.connect();
  await Movie.insertMany(data);
  console.log("Data seeded");
  await AppDataSource.disconnect();
}

main();
