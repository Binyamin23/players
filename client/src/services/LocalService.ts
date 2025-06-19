import { Player } from "../../../entities/Player";

const LOCAL_STORAGE_KEY = "players_data";

export const handleGetLocal = (): Player[] => {
  const initialPlayers: Player[] = [
    {
      id: "1",
      name: "רועי כהן",
      position: "חלוץ",
      jersey_number: 9,
      age: 24,
      goals_scored: 10,
      goals_missed: 3,
      games_played: 5,
      ball_possession_percentage: 67,
      profile_image: "",
      monthly_stats: [
        { month: "ינואר", goals: 4, games: 2, possession: 60 },
        { month: "פברואר", goals: 6, games: 3, possession: 70 },
      ],
      role: 'admin'
    },
    {
      id: "2",
      name: "עידן לוי",
      position: "קשר",
      jersey_number: 8,
      age: 27,
      goals_scored: 5,
      goals_missed: 2,
      games_played: 6,
      ball_possession_percentage: 74,
      profile_image: "",
      monthly_stats: [
        { month: "ינואר", goals: 2, games: 3, possession: 65 },
        { month: "פברואר", goals: 3, games: 3, possession: 80 },
      ],
      role: 'admin'
    },
    {
      id: "3",
      name: "בנימין בר",
      position: "קשר",
      jersey_number: 10,
      age: 26,
      goals_scored: 8,
      goals_missed: 0,
      games_played: 5,
      ball_possession_percentage: 85,
      profile_image: "/images/binyamin.png",
      monthly_stats: [
        { month: "ינואר", goals: 3, games: 2, possession: 80 },
        { month: "פברואר", goals: 5, games: 3, possession: 90 },
      ],
      role: 'admin'
    },
    {
      id: "4",
      name: "איתי שרון",
      position: "שוער",
      jersey_number: 1,
      age: 29,
      goals_scored: 0,
      goals_missed: 0,
      games_played: 6,
      ball_possession_percentage: 40,
      profile_image: "/images/michal.jpg",
      monthly_stats: [
        { month: "ינואר", goals: 0, games: 3, possession: 38 },
        { month: "פברואר", goals: 0, games: 3, possession: 42 },
      ],
      role: 'admin'
    },
  ];

  // const localData = localStorage.getItem(LOCAL_STORAGE_KEY);

  // return localData ? JSON.parse(localData) : [];

  return initialPlayers;  
};

export const handleSetLocal = (players: Player[]): void => {
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(players));
};
