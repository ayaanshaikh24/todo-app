export interface Quote {
  text: string;
  author: string;
}

export const MOTIVATIONAL_QUOTES: Quote[] = [
  {
    text: "The secret of getting ahead is getting started.",
    author: "Mark Twain"
  },
  {
    text: "Focus on being productive instead of busy.",
    author: "Tim Ferriss"
  },
  {
    text: "Your mind is for having ideas, not holding them.",
    author: "David Allen"
  },
  {
    text: "Do not wait; the time will never be 'just right.'",
    author: "Napoleon Hill"
  },
  {
    text: "Productivity is being able to do things that you were never able to do before.",
    author: "Franz Kafka"
  },
  {
    text: "The best way to predict the future is to create it.",
    author: "Peter Drucker"
  },
  {
    text: "Amateurs sit and wait for inspiration, the rest of us just get up and go to work.",
    author: "Stephen King"
  },
  {
    text: "Action is the foundational key to all success.",
    author: "Pablo Picasso"
  },
  {
    text: "Great things are done by a series of small things brought together.",
    author: "Vincent Van Gogh"
  },
  {
    text: "You don't need to see the whole staircase, just take the first step.",
    author: "Martin Luther King Jr."
  },
  {
    text: "Focus is a matter of deciding what things you're not going to do.",
    author: "John Carmack"
  },
  {
    text: "Done is better than perfect.",
    author: "Sheryl Sandberg"
  },
  {
    text: "You miss 100% of the shots you don't take.",
    author: "Wayne Gretzky"
  },
  {
    text: "The only way to do great work is to love what you do.",
    author: "Steve Jobs"
  }
];

export function getRandomQuote(): Quote {
  const randomIndex = Math.floor(Math.random() * MOTIVATIONAL_QUOTES.length);
  return MOTIVATIONAL_QUOTES[randomIndex];
}
