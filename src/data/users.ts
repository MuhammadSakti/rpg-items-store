export interface MockUser {
  id: string;
  username: string;
  password: string;
  displayName: string;
  role: string;
  level: number;
  guild: string;
  joinDate: string;
  bio: string;
}

export const mockUsers: MockUser[] = [
  {
    id: "user-1",
    username: "warrior",
    password: "sword123",
    displayName: "Thorin Ironforge",
    role: "Warrior",
    level: 42,
    guild: "The Iron Vanguard",
    joinDate: "2024-01-15",
    bio: "A battle-hardened warrior from the northern mountains. Specializes in heavy armor and two-handed weapons. Has led countless raids against the Dark Legion.",
  },
  {
    id: "user-2",
    username: "mage",
    password: "spell456",
    displayName: "Elara Moonwhisper",
    role: "Mage",
    level: 38,
    guild: "Arcane Circle",
    joinDate: "2024-03-22",
    bio: "A talented mage who studied at the Academy of Starlight. Master of elemental magic and ancient incantations. Seeks the lost spellbook of Aldric.",
  },
  {
    id: "user-3",
    username: "ranger",
    password: "arrow789",
    displayName: "Sylvan Windwalker",
    role: "Ranger",
    level: 35,
    guild: "Shadow Stalkers",
    joinDate: "2024-06-10",
    bio: "A swift ranger who roams the Whispering Woods. Expert tracker and bowman. Bonded with a mystical wolf companion named Fang.",
  },
];
