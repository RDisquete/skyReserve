interface TimeGridProps {
  selectedTime: string | null;
  onSelect: (time: string) => void;
  bookedSlots: string[];
  serviceFrom: string;
  serviceUntil: string;
  duration?: number;
}

export const TimeGrid = ({ 
  selectedTime, 
  onSelect, 
  bookedSlots, 
  serviceFrom, 
  serviceUntil,
  duration = 1
}: TimeGridProps) => {
  
  const allPossibleSlots = ['08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00'];
  
  const availableHours = allPossibleSlots.filter(
    (hour) => hour >= serviceFrom && hour <= serviceUntil
  );

  const getSlotStatus = (hour: string) => {
    if (!selectedTime) return 'available';
    
    const [selectedHour] = selectedTime.split(':').map(Number);
    const [currentHour] = hour.split(':').map(Number);
    const diff = currentHour - selectedHour;

    if (diff === 0) return 'exact';
    if (diff > 0 && diff < duration) return 'in-range';
    if (diff >= duration) return 'after-range';
    return 'before-range';
  };

  const isBlockedByBooking = (hour: string) => {
    if (!selectedTime) return false;
    const status = getSlotStatus(hour);
    if (status === 'exact' || status === 'in-range') {
      return bookedSlots.includes(hour);
    }
    return false;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-text-secondary">
          Ventana de Vuelo // Operativa
        </h4>
      </div>
      
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
        {availableHours.map((hour) => {
          const isBooked = bookedSlots.includes(hour);
          const status = getSlotStatus(hour);
          const isExact = status === 'exact';
          const isInRange = status === 'in-range';
          const isBlocked = isBlockedByBooking(hour);

          return (
            <button
              key={hour}
              type="button"
              disabled={isBooked || isBlocked}
              onClick={() => onSelect(hour)}
              className={`
                group relative py-5 px-2 rounded-sm text-[11px] font-mono border transition-all
                ${isBooked || isBlocked
                  ? 'opacity-20 cursor-not-allowed border-text-primary/10 bg-transparent text-text-secondary' 
                  : isExact
                    ? 'bg-brand-accent border-brand-accent text-white shadow-[0_0_20px_rgba(56,189,248,0.4)] scale-[1.02] z-10'
                    : isInRange
                      ? 'bg-brand-accent/30 border-brand-accent/50 text-white'
                      : 'border-text-primary/10 text-text-primary hover:border-brand-accent/50 bg-brand-panel/50 backdrop-blur-sm cursor-pointer'
                }
              `}
            >
              <div className="relative z-10 flex flex-col items-center gap-1">
                <span className="font-bold tracking-widest">{hour}</span>
                <span className={`text-[8px] uppercase tracking-tighter ${
                  isExact ? 'text-white' : 
                  isInRange ? 'text-brand-accent' : 
                  isBooked ? 'opacity-30' : 'opacity-50'
                }`}>
                  {isBooked ? 'Ocupado' : isInRange ? 'En vuelo' : isExact ? 'Inicio' : 'Libre'}
                </span>
              </div>

              {isExact && duration > 1 && (
                <div className="absolute -top-2 -right-2 bg-white text-black text-[8px] font-bold px-2 py-0.5 rounded-full">
                  +{duration - 1}h
                </div>
              )}

              {!isBooked && !isExact && !isInRange && (
                <div className="absolute top-0 right-0 p-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="w-1 h-1 bg-brand-accent rounded-full" />
                </div>
              )}
            </button>
          );
        })}
      </div>
      
      {availableHours.length === 0 && (
        <p className="text-[10px] text-text-secondary italic uppercase text-center py-4">
          No hay ventanas operativas disponibles para esta unidad en el rango seleccionado.
        </p>
      )}
    </div>
  );
};