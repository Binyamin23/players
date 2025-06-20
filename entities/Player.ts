export interface MonthlyStat {
  month: string;
  goals: number;
  games: number;
  assists: number;
  possession: number;
}

export type MonthlyStatValue = MonthlyStat[keyof MonthlyStat];

export interface User {
  id: string;
  name: string;
  role: "admin" | "user";
}

export interface Player extends User {
  position: "שוער" | "מגן" | "קשר" | "חלוץ";
  jersey_number: number;
  age?: number;
  profile_image?: string;
  goals_scored: number;
  goals_missed: number;
  games_played: number;
  total_assists: number
  ball_possession_percentage: number;
  monthly_stats?: MonthlyStat[];
}
