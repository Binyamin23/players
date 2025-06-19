import { handleGetLocal, handleSetLocal } from "../services/LocalService";
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  PropsWithChildren,
  Dispatch,
  SetStateAction,
} from "react";
import { v4 as uuidv4 } from "uuid";
import { Player } from "../../../entities/Player";

// טיפוס של הקונטקסט
interface PlayerContextType {
  players: Player[];
  addPlayer: (player: Omit<Player, "id">) => void;
  updatePlayer: (updatePlayer: Player) => void;
  deletePlayer: (id: string) => void;
  setPlayers: Dispatch<SetStateAction<Player[]>>;
}

const PlayerContext = createContext<PlayerContextType>({
  players: [],
  addPlayer: () => console.log("Context out of scope: addPlayer"),
  updatePlayer: () => {},
  deletePlayer: () => {},
  setPlayers: () => {},
});

export const usePlayers = (): PlayerContextType => useContext(PlayerContext);

const PlayerProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [players, setPlayers] = useState<Player[]>(handleGetLocal());  

  useEffect(() => {
    handleSetLocal(players);
  }, [players]);

  const addPlayer = (player: Omit<Player, "id">) => {
    const newPlayer: Player = {
      id: uuidv4(),
      ...player,
    };
    setPlayers((prev) => [...prev, newPlayer]);
  };

  const updatePlayer = (updatePlayer: Player) => {
    setPlayers((prev) =>
      prev.map((player) => (player.id === updatePlayer.id ? updatePlayer : player))
    );
  };

  const deletePlayer = (id: string) => {
    setPlayers((prev) => prev.filter((player) => player.id !== id));
  };

  return (
    <PlayerContext.Provider
      value={{ players, setPlayers, addPlayer, updatePlayer, deletePlayer }}
    >
      {children}
    </PlayerContext.Provider>
  );
};

export default PlayerProvider;
