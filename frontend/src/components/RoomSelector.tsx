import React from 'react';

interface RoomSelectorProps {
  selectedRoom: string;
  onRoomSelect: (room: string) => void;
}

const rooms = [
  {
    id: 'ESR Room',
    name: 'ESR Room',
    description: 'Elected Students Representative - conference and meeting room',
  },
  {
    id: 'VP Room',
    name: 'VP Room',
    description: 'VP Room - Vice President meeting Room',
  }
];

export const RoomSelector: React.FC<RoomSelectorProps> = ({ selectedRoom, onRoomSelect }) => {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-foreground">Select Room</h2>
      
      <div className="space-y-3">
        {rooms.map((room) => {
          const isSelected = selectedRoom === room.id;
          
          return (
            <button
              key={room.id}
              onClick={() => onRoomSelect(room.id)}
              className={`
                w-full p-4 rounded-lg text-left transition-colors
                ${isSelected 
                  ? 'bg-primary text-primary-foreground' 
                  : 'bg-secondary hover:bg-booking-hover text-secondary-foreground'
                }
              `}
            >
              <div className="font-medium text-sm">
                {room.name}
              </div>
              <div className={`text-xs mt-1 ${isSelected ? 'opacity-90' : 'opacity-75'}`}>
                {room.description}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};