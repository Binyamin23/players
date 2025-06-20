import React, { useState, useEffect } from "react";
import { Player as PlayerType } from "../../../../entities/Player";
import {
  ArrowRight,
  Trophy,
  Target,
  Users,
  TrendingUp,
  Calendar,
  Award,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";
import { Link, useParams, useSearchParams } from "react-router-dom";
import { createPageUrl } from "../../utils/url";
import { usePlayers } from "../../context/PlayerContext";
import { getPositionColor } from "../../services/positionColor";

export const Player: React.FC = () => {
  const { id: playerId } = useParams<{ id: string }>();
  const { players } = usePlayers();
  const [player, setPlayer] = useState<PlayerType | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchParams] = useSearchParams();

  useEffect(() => {
    if (!playerId) {
      setLoading(false);
      return;
    }
    
    const foundPlayer = players.find((p) => p.id === playerId);
    setPlayer(foundPlayer || null);
    setLoading(false);
  }, [players, searchParams, playerId]);

  const calculateGoalPercentage = (): number => {
    if (!player) return 0;
    const totalShots = player.goals_scored + player.goals_missed;
    return totalShots > 0
      ? Math.round((player.goals_scored / totalShots) * 100)
      : 0;
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!player) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center py-12">
          <p className="text-slate-500 text-lg mb-4">שחקן לא נמצא</p>
          <Link to={createPageUrl("Players")}>
            <Button>חזרה לרשימת השחקנים</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Back Button */}
      <div className="mb-6">
        <Link to={createPageUrl("Players")}>
          <Button
            variant="ghost"
            className="bg-white text-black-600 hover:bg-blue-50 border border-gray-200"
          >
            <ArrowRight className="w-4 h-4 ml-2" />
            חזרה לרשימת השחקנים
          </Button>
        </Link>
      </div>

      {/* Player Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-3xl p-8 mb-8 text-white">
        <div className="flex flex-col md:flex-row items-center gap-8">
          <div className="relative">
            <div className="w-32 h-32 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
              {player.profile_image ? (
                <img
                  src={player.profile_image}
                  alt={player.name}
                  className="w-32 h-32 rounded-full object-cover"
                />
              ) : (
                <span className="text-4xl font-bold text-white">
                  {player.name.charAt(0)}
                </span>
              )}
            </div>
            <div className="absolute -bottom-2 -right-2 w-12 h-12 bg-amber-500 rounded-full flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-lg">
                {player.jersey_number}
              </span>
            </div>
          </div>

          <div className="text-center md:text-right flex-1">
            <h1 className="text-4xl font-bold mb-2">{player.name}</h1>
            <Badge
              className={`${getPositionColor(
                player.position
              )} text-lg px-4 py-2 mb-4`}
            >
              {player.position}
            </Badge>
            <div className="flex flex-wrap justify-center md:justify-start gap-4 text-white/90">
              <div className="text-center">
                <p className="text-2xl font-bold">{player.age}</p>
                <p className="text-sm">גיל</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold">{player.games_played}</p>
                <p className="text-sm">משחקים</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold">{player.goals_scored}</p>
                <p className="text-sm">שערים</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card className="bg-gradient-to-r from-green-50 to-green-100 border-green-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-800 font-medium text-sm">אחוז הבקעה</p>
                <p className="text-3xl font-bold text-green-900">
                  {calculateGoalPercentage()}%
                </p>
              </div>
              <Target className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-blue-50 to-blue-100 border-blue-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-800 font-medium text-sm">מאבקי אוויר</p>
                <p className="text-3xl font-bold text-blue-900">
                  {player.ball_possession_percentage}%
                </p>
              </div>
              <Trophy className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-red-50 to-red-100 border-red-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-red-800 font-medium text-sm">שערים שפספס</p>
                <p className="text-3xl font-bold text-red-900">
                  {player.goals_missed}
                </p>
              </div>
              <Users className="w-8 h-8 text-red-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-purple-50 to-purple-100 border-purple-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-800 font-medium text-sm">
                  ממוצע שערים למשחק
                </p>
                <p className="text-3xl font-bold text-purple-900">
                  {player.games_played > 0
                    ? (player.goals_scored / player.games_played).toFixed(1)
                    : "0.0"}
                </p>
              </div>
              <Award className="w-8 h-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      {player.monthly_stats && player.monthly_stats.length > 0 && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <Card className="bg-white shadow-md rounded-xl p-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-blue-600" />
                התקדמות שערים
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={player.monthly_stats}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis tick={{ textAnchor: 'start' }} /> 
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="goals"
                    stroke="#2563eb"
                    strokeWidth={3}
                    dot={{ fill: "#2563eb", strokeWidth: 2, r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card className="bg-white shadow-md rounded-xl p-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-green-600" />
                משחקים חודשיים
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={player.monthly_stats}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis tick={{ textAnchor: 'start' }} />
                  <Tooltip />
                  <Bar dataKey="games" fill="#10b981" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Additional Stats */}
      <Card className="bg-white shadow-md rounded-xl p-6">
        <CardHeader>
          <CardTitle>פירוט נתונים</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex justify-between items-center py-2 border-b border-slate-100">
                <span className="font-medium text-slate-700">שם השחקן</span>
                <span className="font-bold">{player.name}</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-slate-100">
                <span className="font-medium text-slate-700">עמדה</span>
                <Badge className={getPositionColor(player.position)}>
                  {player.position}
                </Badge>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-slate-100">
                <span className="font-medium text-slate-700">מספר חולצה</span>
                <span className="font-bold">{player.jersey_number}</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-slate-100">
                <span className="font-medium text-slate-700">גיל</span>
                <span className="font-bold">{player.age}</span>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-center py-2 border-b border-slate-100">
                <span className="font-medium text-slate-700">סה"כ שערים</span>
                <span className="font-bold text-green-600">
                  {player.goals_scored}
                </span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-slate-100">
                <span className="font-medium text-slate-700">שערים שפספס</span>
                <span className="font-bold text-red-600">
                  {player.goals_missed}
                </span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-slate-100">
                <span className="font-medium text-slate-700">משחקים ששיחק</span>
                <span className="font-bold">{player.games_played}</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-slate-100">
                <span className="font-medium text-slate-700">
                  אחוז מאבקי אוויר
                </span>
                <span className="font-bold text-blue-600">
                  {player.ball_possession_percentage}%
                </span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
