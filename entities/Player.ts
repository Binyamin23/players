interface MonthlyStat {
  month: string;
  goals: number;
  games: number;
  possession: number;
}

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
  ball_possession_percentage: number;
  monthly_stats?: MonthlyStat[];
}
