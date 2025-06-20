import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { usePlayers } from "../../context/PlayerContext";
import { motion } from "framer-motion";
import { Edit3, Plus, Shield } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Player, User } from "../../../../entities/Player";
import { PlayerForm } from "./PlayerForm";
import { getPositionColor } from "../../services/positionColor";

export const Management: React.FC = () => {
  const { players, addPlayer, updatePlayer } = usePlayers();
  const [user, setUser] = useState<User | null>(null);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editingPlayer, setEditingPlayer] = useState<Player | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    checkUserPermissions();
  }, []);

  const checkUserPermissions = async () => {
    try {
      //   const userData = await User.me();
      const userData = players[2];
      setUser(userData);
      // if (user?.role !== "admin") {
      //   window.location.href = "/Players";
      // }
    } catch (error) {
      window.location.href = "/Players";
    } finally {
      setLoading(false);
    }
  };

  const handleAddPlayer = async (playerData: Omit<Player, "id">) => {
    try {
      addPlayer(playerData);
      setIsAddDialogOpen(false);
    } catch (error) {
      console.error("Error adding player:", error);
    }
  };

  const handleEditPlayer = async (playerData: Player) => {
    try {
      if (editingPlayer?.id) {
        updatePlayer(playerData);
        setIsEditDialogOpen(false);
        setEditingPlayer(null);
      }
    } catch (error) {
      console.error("Error updating player:", error);
    }
  };

  const openEditDialog = (player: Player) => {
    setEditingPlayer(player);
    setIsEditDialogOpen(true);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!user || user.role !== "admin") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="p-8 text-center">
          <Shield className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <p className="text-lg text-slate-600">אין לך הרשאה לגשת לעמוד זה</p>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-4xl font-bold text-slate-900 mb-2">
            ניהול שחקנים
          </h1>
          <p className="text-slate-600">עריכה ועדכון נתוני השחקנים</p>
        </div>

        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-blue-600 hover:bg-blue-700 flex items-center gap-2">
              <Plus className="w-4 h-4" />
              הוסף שחקן חדש
            </Button>
          </DialogTrigger>
          <DialogContent 
          onInteractOutside={(e) => e.preventDefault()}
          onEscapeKeyDown={(e) => e.preventDefault()}
          className="max-w-2xl bg-white">
            <DialogHeader>
              <DialogTitle>הוספת שחקן חדש</DialogTitle>
            </DialogHeader>
            <PlayerForm onSubmit={handleAddPlayer} />
          </DialogContent>
        </Dialog>
      </div>

      {/* Players Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {players.map((player, index) => (
          <motion.div
            key={player.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="bg-white border border-slate-200 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-700 rounded-full flex items-center justify-center relative">
                    {player.profile_image ? (
                      <img
                        src={player.profile_image}
                        alt={player.name}
                        className="w-16 h-16 rounded-full object-cover"
                      />
                    ) : (
                      <span className="text-xl font-bold text-white">
                        {player.name.charAt(0)}
                      </span>
                    )}
                    <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-amber-500 rounded-full flex items-center justify-center">
                      <span className="text-white font-bold text-xs">
                        {player.jersey_number}
                      </span>
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-lg text-slate-900">
                      {player.name}
                    </h3>
                    <Badge
                      className={`${getPositionColor(player.position)} text-sm`}
                    >
                      {player.position}
                    </Badge>
                  </div>
                </div>

                <div className="space-y-2 mb-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-600">שערים</span>
                    <span className="font-medium">{player.goals_scored}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-600">משחקים</span>
                    <span className="font-medium">{player.games_played}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-600">מאבקי אוויר</span>
                    <span className="font-medium">
                      {player.ball_possession_percentage}%
                    </span>
                  </div>
                </div>

                <Button
                  variant="outline"
                  className="w-full flex items-center gap-2"
                  onClick={() => openEditDialog(player)}
                >
                  <Edit3 className="w-4 h-4" />
                  ערוך שחקן
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent
          onInteractOutside={(e) => e.preventDefault()}
          onEscapeKeyDown={(e) => e.preventDefault()}
          className="max-w-2xl bg-white"
        >
          <DialogHeader>
            <DialogTitle>עריכת שחקן</DialogTitle>
          </DialogHeader>
          {editingPlayer && (
            <PlayerForm
              initialData={editingPlayer}
              onSubmit={handleEditPlayer}
              isEdit={true}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};
