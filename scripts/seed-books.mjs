import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;

if (!uri) {
  throw new Error("MONGODB_URI is not configured");
}

const books = [
  {
    title: "The Silent Horizon",
    author: "Amina Rahman",
    category: "Fiction",
    image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f",
    description: "A quiet coastal story about finding hope after loss.",
    readingContent: "At the edge of the harbor, where the gulls circled above the masts, Sami found a small blue notebook tucked beneath a loose board. Its pages were filled with careful drawings of the sea, each one dated for a day that had not yet arrived.\n\nHe carried it to the lighthouse keeper, who studied the drawings in silence. “The horizon changes every morning,” she said at last. “Perhaps someone wanted you to remember that tomorrow is never a copy of today.”\n\nThat evening Sami climbed the hill above the town. For the first time in months, he watched the sun disappear without wishing the day would stay. Beyond the darkening water, a pale line of light waited for morning.",
    totalCopies: 4,
  },
  {
    title: "Worlds in Ink",
    author: "Nathan Cole",
    category: "History",
    image: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f",
    description: "A journey through the ideas and stories that shaped civilizations.",
    readingContent: "Every old city keeps two maps. One is drawn in streets and walls; the other is carried in the stories people tell about where they came from. When historians study a forgotten letter or a mark on a clay tablet, they are reading both maps at once.\n\nIn a dusty archive, a young apprentice named Nuri discovered a bundle of pages tied with green thread. The writing was faded, but a repeated symbol appeared at the edge of every sheet: a little open door. Nuri copied it into his notebook and began to notice the same symbol carved above doorways throughout the city.\n\nThe discovery did not reveal a treasure. It revealed something better: generations of neighbors had left signs for one another, small reminders that knowledge grows when it is shared.",
    totalCopies: 3,
  },
  {
    title: "Curious Minds",
    author: "Sara Ali",
    category: "Science",
    image: "https://images.unsplash.com/photo-1532012197267-da84d127e765",
    description: "An approachable introduction to science and everyday discovery.",
    readingContent: "Mina liked questions that began with “why.” Why did a seed know which way was up? Why did a puddle vanish after the rain? Her grandfather never hurried to answer. Instead, he gave her a notebook and said, “Let us find out what we can observe.”\n\nThey placed two beans in separate jars. One sat near the window, and one rested in a cupboard. Each day Mina measured the stems and drew what she saw. The window bean leaned toward the light; the other grew pale and thin. The plants had answered by changing, not by speaking.\n\nMina wrote down the result. A good experiment, she learned, did not prove that you were clever. It helped you ask a better question next time.",
    totalCopies: 5,
  },
  {
    title: "Moonlit Stories",
    author: "Leah Ross",
    category: "Fiction",
    image: "https://images.unsplash.com/photo-1516979187457-637abb4f9353",
    description: "Warm and mysterious tales best enjoyed beneath a quiet moon.",
    readingContent: "The old clock in the town library stopped every night at 8:17. No one knew why. The caretaker wound it before closing, listened for its steady tick, and left a small lamp glowing beside the front window.\n\nOne rainy evening, a girl named Noor stayed late to finish a chapter. At 8:17 the clock fell silent. From inside its wooden case came a soft click, followed by the sound of paper sliding against paper. Noor opened the little door and found a folded note: “Look where the stories sleep.”\n\nShe searched between the shelves until she found a book with no title. Inside was a map of the library, and at its center a star drawn over the very room where she stood.",
    totalCopies: 3,
  },
  {
    title: "The Little Explorer",
    author: "David Kim",
    category: "Kids",
    image: "https://images.unsplash.com/photo-1512820790803-83ca734da794",
    description: "A playful adventure that inspires young readers to stay curious.",
    readingContent: "Rafi packed a sandwich, a pencil, and the smallest map in the house. His destination was the hill behind the garden, which he had visited a hundred times but never explored properly.\n\nAt the top, he found a trail of smooth white stones leading through the tall grass. They ended at a tiny pond where dragonflies flashed blue above the water. Rafi drew the place on his map and gave it a name: The Secret Lake.\n\nWhen he returned home, his little sister asked if there was treasure. Rafi smiled and handed her the map. “There is,” he said. “But you have to discover it yourself.”",
    totalCopies: 6,
  },
  {
    title: "Mindful Pages",
    author: "Maya Bennett",
    category: "Others",
    image: "https://images.unsplash.com/photo-1495446815901-a7297e633e8d",
    description: "A thoughtful collection of ideas for calmer reading and living.",
    readingContent: "A quiet moment does not have to be empty. It can hold the sound of rain on a window, the warmth of a cup in your hands, or a sentence that asks you to pause. Reading slowly gives those small things room to be noticed.\n\nTry choosing one page and staying with it. When a thought wanders in, you do not have to chase it away. Notice it, then return to the line in front of you. There is no prize for finishing first.\n\nA book can be a door, but it can also be a place to rest. Let the next page wait until you are ready.",
    totalCopies: 2,
  },
  {
    title: "Alice's Adventures in Wonderland",
    author: "Lewis Carroll",
    category: "Fiction",
    image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f",
    description: "Alice follows a white rabbit into a wonderfully strange world.",
    readingUrl: "https://en.wikisource.org/wiki/Alice%27s_Adventures_in_Wonderland_(1866)",
    readingSource: "Wikisource",
    totalCopies: 4,
  },
  {
    title: "Pride and Prejudice",
    author: "Jane Austen",
    category: "Fiction",
    image: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f",
    description: "A classic novel of manners, family, first impressions, and love.",
    readingUrl: "https://en.wikisource.org/wiki/Pride_and_Prejudice",
    readingSource: "Wikisource",
    totalCopies: 4,
  },
  {
    title: "The Adventures of Sherlock Holmes",
    author: "Arthur Conan Doyle",
    category: "Fiction",
    image: "https://images.unsplash.com/photo-1532012197267-da84d127e765",
    description: "A collection of mysteries solved by Sherlock Holmes and Dr. Watson.",
    readingUrl: "https://en.wikisource.org/wiki/The_Adventures_of_Sherlock_Holmes",
    readingSource: "Wikisource",
    totalCopies: 4,
  },
  {
    title: "Little Women",
    author: "Louisa May Alcott",
    category: "Fiction",
    image: "https://images.unsplash.com/photo-1512820790803-83ca734da794",
    description: "The March sisters grow up, face challenges, and follow their dreams.",
    readingUrl: "https://en.wikisource.org/wiki/Little_Women",
    readingSource: "Wikisource",
    totalCopies: 4,
  },
  {
    title: "গীতাঞ্জলি",
    author: "রবীন্দ্রনাথ ঠাকুর",
    category: "Others",
    image: "https://images.unsplash.com/photo-1495446815901-a7297e633e8d",
    description: "রবীন্দ্রনাথ ঠাকুরের নোবেলজয়ী কাব্যগ্রন্থ; অনলাইনে পড়ুন উইকিসংকলনে।",
    readingUrl: "https://bn.wikisource.org/wiki/রচনা:গীতাঞ্জলি",
    readingSource: "বাংলা উইকিসংকলন",
    totalCopies: 4,
  },
];

const client = new MongoClient(uri);
await client.connect();

try {
  const collection = client.db("booknook").collection("books");

  for (const book of books) {
    await collection.updateOne(
      { title: book.title },
      {
        $set: {
          ...book,
          availableCopies: book.totalCopies,
          addedBy: {
            name: "BookNook",
            email: "library@booknook.local",
          },
          createdAt: new Date(),
        },
      },
      { upsert: true }
    );
  }

  const count = await collection.countDocuments();
  console.log(`Seeded BookNook demo books. Total books: ${count}`);
} finally {
  await client.close();
}
