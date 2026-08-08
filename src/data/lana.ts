export interface Album {
  id: string;
  title: string;
  year: string;
  tagline: string;
  description: string;
  image: string;
  accentColor: string;
}

export const lanaData = {
  hero: {
    name: "Lana Del Rey",
    tagline:
      "A cinematic journey through the life, music, and mythology of a modern icon.",
    subtext: "Scroll to enter the cinematic universe",
  },
  earlyLife: {
    birthName: "Elizabeth Woolridge Grant",
    birthDate: "June 21, 1985",
    birthPlace: "New York City, New York",
    description:
      "Raised in Lake Placid, New York, Elizabeth Grant grew up writing poetry and singing in church choir. Before adopting her iconic stage name, she performed acoustic songs in small Brooklyn clubs, laying the foundation for a deeply emotional and cinematic musical style.",
  },
  albums: [
    {
      id: "born-to-die",
      title: "Born to Die",
      year: "2012",
      tagline: "The Sadcore Blueprint",
      description:
        "A groundbreaking debut album blending hip-hop beats with lush orchestral pop and tragic Hollywood glamour, completely redefining 2010s alternative pop.",
      image:
        "https://upload.wikimedia.org/wikipedia/pt/4/47/LanaDelRey_BornToDie.jpg",
      accentColor: "#5A181D",
    },
    {
      id: "ultraviolence",
      title: "Ultraviolence",
      year: "2014",
      tagline: "Raw California Noir",
      description:
        "A bold shift into psychedelic guitar rock, smoky blues, and uncompromised, hypnotic vulnerability, produced alongside Dan Auerbach.",
      image:
        "https://upload.wikimedia.org/wikipedia/pt/7/74/Ultraviolence.png",
      accentColor: "#3A1215",
    },
    {
      id: "nfr",
      title: "Norman Fucking Rockwell!",
      year: "2019",
      tagline: "The American Masterpiece",
      description:
        "A widely acclaimed meditation on modern American culture, Laurel Canyon warmth, and poetic introspection, created in collaboration with Jack Antonoff.",
      image:
        "https://upload.wikimedia.org/wikipedia/pt/2/2f/NFR_Lana.png",
      accentColor: "#C5A059",
    },
  ] as Album[],
  identityThemes: [
    {
      title: "Americana",
      desc: "Exploring flags, neon signs, vintage cars, and endless highways through a nostalgic and tragic lens.",
    },
    {
      title: "Melancholy",
      desc: "Finding profound artistic beauty in heartbreak, fleeting golden hours, and quiet emotional depth.",
    },
    {
      title: "Glamour",
      desc: "Reimagining classic Hollywood silver-screen aesthetics for a modern alternative generation.",
    },
  ],
};
