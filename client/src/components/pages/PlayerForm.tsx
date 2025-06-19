import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import React, { FormEvent, useState } from "react";
import { Player } from "../../../../entities/Player";

interface PlayerFormProps {
  initialData?: Player;
  onSubmit: ((data: Omit<Player, "id">) => void) | ((data: Player) => void);
  isEdit?: boolean;
}

export const PlayerForm = ({
  initialData,
  onSubmit,
  isEdit = false,
}: PlayerFormProps) => {
  const [formData, setFormData] = useState<Omit<Player, "id"> | Player>(
    initialData || {
      role: "user",
      name: "",
      position: "חלוץ",
      jersey_number: 0,
      age: 0,
      profile_image: "",
      goals_scored: 0,
      goals_missed: 0,
      games_played: 0,
      ball_possession_percentage: 0,
      monthly_stats: [],
    }
  );

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if ("id" in formData) {
      (onSubmit as (data: Player) => void)(formData);
    } else {
      (onSubmit as (data: Omit<Player, "id">) => void)(formData);
    }
  };

  const handleChange = (field: keyof Player, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const inputClass = "h-10 w-full border border-slate-300 focus:border-blue-400 focus:ring-0 text-right";

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="name" className="mb-1 block text-slate-700">שם השחקן</Label>
          <Input
            id="name"
            value={formData.name}
            onChange={(e) => handleChange("name", e.target.value)}
            required
            className={inputClass}
          />
        </div>

        <div>
          <Label htmlFor="position" className="mb-1 block text-slate-700">עמדה</Label>
          <Select
            value={formData.position}
            onValueChange={(value) => handleChange("position", value)}
          >
            <SelectTrigger className={inputClass}>
              <SelectValue placeholder="בחר עמדה" />
            </SelectTrigger>
            <SelectContent className="bg-white border border-slate-200 shadow-md">
              <SelectItem value="שוער">שוער</SelectItem>
              <SelectItem value="מגן">מגן</SelectItem>
              <SelectItem value="קשר">קשר</SelectItem>
              <SelectItem value="חלוץ">חלוץ</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="jersey_number" className="mb-1 block text-slate-700">מספר חולצה</Label>
          <Input
            id="jersey_number"
            type="number"
            value={formData.jersey_number}
            onChange={(e) =>
              handleChange("jersey_number", parseInt(e.target.value) || 0)
            }
            required
            className={inputClass}
          />
        </div>

        <div>
          <Label htmlFor="age" className="mb-1 block text-slate-700">גיל</Label>
          <Input
            id="age"
            type="number"
            value={formData.age}
            onChange={(e) => handleChange("age", parseInt(e.target.value) || 0)}
            required
            className={inputClass}
          />
        </div>

        <div>
          <Label htmlFor="goals_scored" className="mb-1 block text-slate-700">שערים שהבקיע</Label>
          <Input
            id="goals_scored"
            type="number"
            value={formData.goals_scored}
            onChange={(e) =>
              handleChange("goals_scored", parseInt(e.target.value) || 0)
            }
            className={inputClass}
          />
        </div>

        <div>
          <Label htmlFor="goals_missed" className="mb-1 block text-slate-700">שערים שפספס</Label>
          <Input
            id="goals_missed"
            type="number"
            value={formData.goals_missed}
            onChange={(e) =>
              handleChange("goals_missed", parseInt(e.target.value) || 0)
            }
            className={inputClass}
          />
        </div>

        <div>
          <Label htmlFor="games_played" className="mb-1 block text-slate-700">משחקים ששיחק</Label>
          <Input
            id="games_played"
            type="number"
            value={formData.games_played}
            onChange={(e) =>
              handleChange("games_played", parseInt(e.target.value) || 0)
            }
            className={inputClass}
          />
        </div>

        <div>
          <Label htmlFor="ball_possession_percentage" className="mb-1 block text-slate-700">אחוז מאבקי אוויר</Label>
          <Input
            id="ball_possession_percentage"
            type="number"
            min="0"
            max="100"
            value={formData.ball_possession_percentage}
            onChange={(e) =>
              handleChange(
                "ball_possession_percentage",
                parseInt(e.target.value) || 0
              )
            }
            className={inputClass}
          />
        </div>
      </div>

      <div>
        <Label htmlFor="profile_image" className="mb-1 block text-slate-700">תמונת פרופיל (URL)</Label>
        <Input
          id="profile_image"
          type="url"
          value={formData.profile_image}
          onChange={(e) => handleChange("profile_image", e.target.value)}
          placeholder="https://example.com/image.jpg"
          className="text-left border border-slate-300 focus:border-blue-400 focus:ring-0"
        />
      </div>

      <div className="flex justify-end gap-3">
        <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
          {isEdit ? "עדכן שחקן" : "הוסף שחקן"}
        </Button>
      </div>
    </form>
  );
};
