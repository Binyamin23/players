import React, { useState, useEffect } from "react";
import { Player } from "../../../../entities/Player";
import { Link } from "react-router-dom";
import { Search, TrendingUp, Target, Users, Award } from "lucide-react";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Card, CardContent } from "../ui/card";
import { Badge } from "../ui/badge";
import { motion } from "framer-motion";
import { usePlayers } from "../../context/PlayerContext";

export const Players: React.FC = () => {
  const { players } = usePlayers();

  const [filteredPlayers, setFilteredPlayers] = useState<Player[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [positionFilter, setPositionFilter] = useState<string>("all");
  const [loading, setLoading] = useState<boolean>(true);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  useEffect(() => {
    filterPlayers();
    setLoading(false);
  }, [players, searchTerm, positionFilter]);

  const filterPlayers = () => {
    let filtered = [...players];
    console.log(players);

    if (searchTerm) {
      filtered = filtered.filter((player) =>
        player.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (positionFilter !== "all") {
      filtered = filtered.filter(
        (player) => player.position === positionFilter
      );
    }

    setFilteredPlayers(filtered);
  };

  const calculateGoalPercentage = (player: Player): number => {
    const totalShots = (player.goals_scored || 0) + (player.goals_missed || 0);
    return totalShots > 0
      ? Math.round(((player.goals_scored || 0) / totalShots) * 100)
      : 0;
  };

  const getPositionColor = (position: string): string => {
    const colors: Record<string, string> = {
      שוער: "bg-green-100 text-green-800",
      מגן: "bg-blue-100 text-blue-800",
      קשר: "bg-purple-100 text-purple-800",
      חלוץ: "bg-red-100 text-red-800",
    };
    return colors[position] || "bg-gray-100 text-gray-800";
  };

  const getTopStats = () => {
    if (players?.length === 0) {
      return {
        topScorer: null as Player | null,
        bestPossession: null as Player | null,
        mostGames: null as Player | null,
      };
    }

    const topScorer = players.reduce((prev, current) =>
      (prev.goals_scored || 0) > (current.goals_scored || 0) ? prev : current
    );

    const bestPossession = players.reduce((prev, current) =>
      (prev.ball_possession_percentage || 0) >
      (current.ball_possession_percentage || 0)
        ? prev
        : current
    );

    const mostGames = players.reduce((prev, current) =>
      (prev.games_played || 0) > (current.games_played || 0) ? prev : current
    );

    return { topScorer, bestPossession, mostGames };
  };

  const { topScorer, bestPossession, mostGames } = getTopStats();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header Stats */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-slate-900 mb-2">שחקני הקבוצה</h1>
        <p className="text-slate-600 mb-8">
          מעקב אחר ביצועי השחקנים וסטטיסטיקות
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="bg-gradient-to-r from-amber-50 to-amber-100 border-amber-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-amber-800 font-medium">מלך השערים</p>
                  <p className="text-2xl font-bold text-amber-900">
                    {topScorer
                      ? `${topScorer.name} (${topScorer.goals_scored})`
                      : "אין נתונים"}
                  </p>
                </div>
                <Award className="w-8 h-8 text-amber-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-blue-50 to-blue-100 border-blue-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-800 font-medium">שליטה בכדור</p>
                  <p className="text-2xl font-bold text-blue-900">
                    {bestPossession
                      ? `${bestPossession.name} (${bestPossession.ball_possession_percentage}%)`
                      : "אין נתונים"}
                  </p>
                </div>
                <Target className="w-8 h-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-green-50 to-green-100 border-green-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-800 font-medium">הכי פעיל</p>
                  <p className="text-2xl font-bold text-green-900">
                    {mostGames
                      ? `${mostGames.name} (${mostGames.games_played})`
                      : "אין נתונים"}
                  </p>
                </div>
                <Users className="w-8 h-8 text-green-600" />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="relative flex-1">
          <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
          <Input
            placeholder="חיפוש שחקן..."
            value={searchTerm}
            onChange={handleChange}
            className="pr-10 text-right bg-white"
          />
        </div>
        <Select dir="rtl" value={positionFilter} onValueChange={setPositionFilter}>
          <SelectTrigger dir='rtl' className="w-full md:w-48 bg-white">
            <SelectValue placeholder="סינון לפי עמדה" />
          </SelectTrigger>
          <SelectContent dir='rtl' className="bg-white border border-slate-200 shadow-md">
            <SelectItem value="all">כל העמדות</SelectItem>
            <SelectItem value="שוער">שוער</SelectItem>
            <SelectItem value="מגן">מגן</SelectItem>
            <SelectItem value="קשר">קשר</SelectItem>
            <SelectItem value="חלוץ">חלוץ</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Players Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredPlayers.map((player, index) => (
          <motion.div
            key={player.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Link to={`/players/${player.id}`}>
              <Card className="hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer bg-white/80 backdrop-blur-sm border-slate-200">
                <CardContent className="p-6">
                  <div className="text-center mb-4">
                    <div className="relative mx-auto mb-4">
                      <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-blue-700 rounded-full flex items-center justify-center mx-auto">
                        {player.profile_image ? (
                          <img
                            src={player.profile_image}
                            alt={player.name}
                            className="w-20 h-20 rounded-full object-cover"
                          />
                        ) : (
                          <span className="text-2xl font-bold text-white">
                            {player.name.charAt(0)}
                          </span>
                        )}
                      </div>
                      <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-amber-500 rounded-full flex items-center justify-center">
                        <span className="text-white font-bold text-sm">
                          {player.jersey_number}
                        </span>
                      </div>
                    </div>
                    <h3 className="text-lg font-bold text-slate-900 mb-1">
                      {player.name}
                    </h3>
                    <Badge
                      className={`${getPositionColor(
                        player.position
                      )} font-medium`}
                    >
                      {player.position}
                    </Badge>
                  </div>

                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-slate-600 text-sm">שערים</span>
                      <span className="font-bold text-slate-900">
                        {player.goals_scored}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-slate-600 text-sm">אחוז הבקעה</span>
                      <span className="font-bold text-green-600">
                        {calculateGoalPercentage(player)}%
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-slate-600 text-sm">מאבקי אוויר</span>
                      <span className="font-bold text-blue-600">
                        {player.ball_possession_percentage}%
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-slate-600 text-sm">משחקים</span>
                      <span className="font-bold text-slate-900">
                        {player.games_played}
                      </span>
                    </div>
                  </div>

                  <div className="mt-4 pt-4 border-t border-slate-100">
                    <div className="flex items-center justify-center text-blue-600 hover:text-blue-700 transition-colors">
                      <TrendingUp className="w-4 h-4 mr-2" />
                      <span className="text-sm font-medium">צפה בפרטים</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          </motion.div>
        ))}
      </div>

      {filteredPlayers.length === 0 && !loading && (
        <div className="text-center py-12">
          <Users className="w-12 h-12 text-slate-400 mx-auto mb-4" />
          <p className="text-slate-500 text-lg">לא נמצאו שחקנים</p>
        </div>
      )}
    </div>
  );
};
