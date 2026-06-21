'use client';

import * as React from 'react';
import { format } from 'date-fns';
import { ChevronDown } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Label } from '@/components/ui/label';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';

interface DatePickerProps {
  date: Date | undefined;
  setDate: (date: Date | undefined) => void;
  className?: string;
}

export function DatePicker({ date, setDate, className }: DatePickerProps) {
  const [openDate, setOpenDate] = React.useState(false);
  const [openTime, setOpenTime] = React.useState(false);
  
  const [activeMode, setActiveMode] = React.useState<'hour' | 'minute'>('hour');
  const clockRef = React.useRef<HTMLDivElement>(null);

  const [timeState, setTimeState] = React.useState({
    hour: '12',
    minute: '00',
    second: '00',
    ampm: 'SA' as 'SA' | 'CH',
  });

  // Đồng bộ từ props date sang timeState
  React.useEffect(() => {
    if (date) {
      const h24 = date.getHours();
      const h12 = h24 % 12 === 0 ? 12 : h24 % 12;
      const ampm = h24 >= 12 ? 'CH' : 'SA';
      
      const hourStr = String(h12).padStart(2, '0');
      const minuteStr = String(date.getMinutes()).padStart(2, '0');
      const secondStr = String(date.getSeconds()).padStart(2, '0');
      
      setTimeState({
        hour: hourStr,
        minute: minuteStr,
        second: secondStr,
        ampm,
      });
    }
  }, [date]);

  const updateDateTime = (hour: string, minute: string, second: string, ampm: 'SA' | 'CH') => {
    if (!date) return;
    const newDate = new Date(date);
    let h24 = Number(hour);
    if (ampm === 'CH' && h24 < 12) {
      h24 += 12;
    } else if (ampm === 'SA' && h24 === 12) {
      h24 = 0;
    }
    newDate.setHours(h24);
    newDate.setMinutes(Number(minute));
    newDate.setSeconds(Number(second));
    newDate.setMilliseconds(0);
    setDate(newDate);
  };

  const handleSelectDate = (selectedDate: Date | undefined) => {
    if (!selectedDate) {
      setDate(undefined);
      setOpenDate(false);
      return;
    }

    const newDate = new Date(selectedDate);
    let h24 = Number(timeState.hour);
    if (timeState.ampm === 'CH' && h24 < 12) {
      h24 += 12;
    } else if (timeState.ampm === 'SA' && h24 === 12) {
      h24 = 0;
    }
    newDate.setHours(h24);
    newDate.setMinutes(Number(timeState.minute));
    newDate.setSeconds(0);
    newDate.setMilliseconds(0);
    setDate(newDate);
    setOpenDate(false);
  };

  const handleAmPmChange = (newAmPm: 'SA' | 'CH') => {
    setTimeState((prev) => ({ ...prev, ampm: newAmPm }));
    updateDateTime(timeState.hour, timeState.minute, '00', newAmPm);
  };

  // Tính toán tọa độ và vẽ các số trên mặt đồng hồ
  const renderClockNumbers = () => {
    const isHourMode = activeMode === 'hour';
    const numbers = isHourMode
      ? [12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]
      : [0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55];

    return numbers.map((num, i) => {
      // Mỗi số cách nhau 30 độ (360 / 12)
      // Dịch chuyển góc quay -90 độ để số 12 ở đỉnh trên cùng
      const angle = (i * 30 - 90) * (Math.PI / 180);
      const radius = 74; // Khoảng cách từ số đến tâm
      const x = 100 + radius * Math.cos(angle);
      const y = 100 + radius * Math.sin(angle);

      const label = isHourMode ? String(num) : String(num).padStart(2, '0');
      
      // Xác định số có đang được chọn hay không
      let isSelected = false;
      if (isHourMode) {
        isSelected = Number(timeState.hour) === num;
      } else {
        const currentMin = Number(timeState.minute);
        // Highlight mốc 5 phút gần nhất
        isSelected = Math.round(currentMin / 5) * 5 === num || (num === 0 && currentMin >= 58);
      }

      return (
        <div
          key={num}
          className={cn(
            'absolute w-8 h-8 -ml-4 -mt-4 rounded-full flex items-center justify-center text-xs font-semibold transition-colors pointer-events-none select-none',
            isSelected ? 'text-primary-foreground font-bold' : 'text-foreground/80'
          )}
          style={{
            left: `${x}px`,
            top: `${y}px`,
          }}
        >
          {label}
        </div>
      );
    });
  };

  const [isDragging, setIsDragging] = React.useState(false);

  const handleTimeSelection = (clientX: number, clientY: number) => {
    if (!clockRef.current) return;
    const rect = clockRef.current.getBoundingClientRect();
    const x = clientX - rect.left - 100; // Căn theo tâm (100, 100)
    const y = clientY - rect.top - 100;

    let angleRad = Math.atan2(y, x);
    let angleDeg = angleRad * (180 / Math.PI);
    if (angleDeg < 0) angleDeg += 360;

    // Đưa về hệ trục đồng hồ (0 độ ở vị trí số 12, tức 270 độ của atan2)
    let clockAngle = (angleDeg + 90) % 360;

    if (activeMode === 'hour') {
      // Mỗi giờ tương ứng 30 độ
      let selectedHour = Math.round(clockAngle / 30);
      if (selectedHour === 0) selectedHour = 12;

      const hourStr = String(selectedHour).padStart(2, '0');
      setTimeState((prev) => ({ ...prev, hour: hourStr }));
      updateDateTime(hourStr, timeState.minute, '00', timeState.ampm);
    } else {
      // Mỗi phút tương ứng 6 độ (360 / 60)
      let selectedMinute = Math.round(clockAngle / 6);
      if (selectedMinute === 60) selectedMinute = 0;

      const minuteStr = String(selectedMinute).padStart(2, '0');
      setTimeState((prev) => ({ ...prev, minute: minuteStr }));
      updateDateTime(timeState.hour, minuteStr, '00', timeState.ampm);
    }
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
    handleTimeSelection(e.clientX, e.clientY);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    e.preventDefault();
    handleTimeSelection(e.clientX, e.clientY);
  };

  const handleMouseUp = () => {
    if (!isDragging) return;
    setIsDragging(false);
    if (activeMode === 'hour') {
      setTimeout(() => {
        setActiveMode('minute');
      }, 150);
    }
  };

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    setIsDragging(true);
    if (e.touches[0]) {
      handleTimeSelection(e.touches[0].clientX, e.touches[0].clientY);
    }
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    if (e.touches[0]) {
      handleTimeSelection(e.touches[0].clientX, e.touches[0].clientY);
    }
  };

  const handleTouchEnd = () => {
    if (!isDragging) return;
    setIsDragging(false);
    if (activeMode === 'hour') {
      setTimeout(() => {
        setActiveMode('minute');
      }, 150);
    }
  };

  // Tính góc quay của kim đồng hồ hiện tại
  const clockRotation = activeMode === 'hour'
    ? Number(timeState.hour) * 30
    : Number(timeState.minute) * 6;

  return (
    <div className={cn('flex flex-row gap-3 items-end', className)}>
      {/* Date Column */}
      <div className="flex flex-col gap-1.5 w-40 shrink-0">
        <Label htmlFor="date-picker-input" className="text-xs font-semibold text-muted-foreground">
          Date
        </Label>
        <Popover open={openDate} onOpenChange={setOpenDate}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              id="date-picker-input"
              className={cn(
                'w-full justify-between font-normal h-10 px-3 shadow-none border-border bg-background hover:bg-muted/30 rounded-xl',
                !date && 'text-muted-foreground'
              )}
            >
              {date ? format(date, 'dd/MM/yyyy') : 'Select date'}
              <ChevronDown className="h-4 w-4 opacity-50 shrink-0 ml-1" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto overflow-hidden p-0" align="start">
            <Calendar
              mode="single"
              selected={date}
              captionLayout="dropdown-buttons"
              fromYear={new Date().getFullYear()}
              toYear={new Date().getFullYear() + 10}
              defaultMonth={date}
              onSelect={handleSelectDate}
            />
          </PopoverContent>
        </Popover>
      </div>

      {/* Time Column */}
      <div className="flex flex-col gap-1.5 w-32 shrink-0">
        <Label htmlFor="time-picker-button" className="text-xs font-semibold text-muted-foreground">
          Time
        </Label>
        <Popover open={openTime} onOpenChange={(open) => {
          setOpenTime(open);
          if (open) setActiveMode('hour'); // Luôn mở ở chế độ chọn giờ trước
        }}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              id="time-picker-button"
              disabled={!date}
              className={cn(
                'w-full justify-between font-mono font-normal h-10 px-3 shadow-none border-border bg-background hover:bg-muted/30 rounded-xl text-center',
                !date && 'text-muted-foreground cursor-not-allowed opacity-60'
              )}
            >
              <span>
                {date
                  ? `${timeState.hour}:${timeState.minute} ${timeState.ampm}`
                  : '--:--'}
              </span>
              <ChevronDown className="h-4 w-4 opacity-50 shrink-0 ml-1" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-60 p-4 admin-theme" align="start">
            {/* Header: Hiển thị và chuyển chế độ */}
            <div className="flex items-center justify-center gap-1.5 mb-4 pb-2 border-b border-border/60">
              <button
                type="button"
                onClick={() => setActiveMode('hour')}
                className={cn(
                  'text-3xl font-semibold px-2 py-0.5 rounded transition-colors',
                  activeMode === 'hour'
                    ? 'text-primary bg-primary/10'
                    : 'text-muted-foreground hover:bg-muted/50'
                )}
              >
                {timeState.hour}
              </button>
              <span className="text-3xl font-semibold text-muted-foreground">:</span>
              <button
                type="button"
                onClick={() => setActiveMode('minute')}
                className={cn(
                  'text-3xl font-semibold px-2 py-0.5 rounded transition-colors',
                  activeMode === 'minute'
                    ? 'text-primary bg-primary/10'
                    : 'text-muted-foreground hover:bg-muted/50'
                )}
              >
                {timeState.minute}
              </button>
              <div className="flex flex-col gap-0.5 ml-3 border-l border-border/80 pl-3">
                <button
                  type="button"
                  onClick={() => handleAmPmChange('SA')}
                  className={cn(
                    'text-[10px] font-bold px-1.5 py-0.5 rounded transition-colors',
                    timeState.ampm === 'SA'
                      ? 'bg-primary text-primary-foreground'
                      : 'text-muted-foreground hover:bg-muted/50'
                  )}
                >
                  SA
                </button>
                <button
                  type="button"
                  onClick={() => handleAmPmChange('CH')}
                  className={cn(
                    'text-[10px] font-bold px-1.5 py-0.5 rounded transition-colors',
                    timeState.ampm === 'CH'
                      ? 'bg-primary text-primary-foreground'
                      : 'text-muted-foreground hover:bg-muted/50'
                  )}
                >
                  CH
                </button>
              </div>
            </div>

            {/* Mặt đồng hồ tròn */}
            <div
              ref={clockRef}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
              className="w-[200px] h-[200px] relative bg-muted/30 rounded-full mx-auto select-none cursor-pointer border border-border/40 touch-none"
            >
              {/* Tâm đồng hồ */}
              <div className="w-1.5 h-1.5 rounded-full bg-primary absolute left-[97px] top-[97px]" />
              
              {/* Kim đồng hồ */}
              <div
                className="w-[2px] h-[72px] bg-primary absolute left-[99px] top-[28px] origin-bottom"
                style={{
                  transform: `rotate(${clockRotation}deg)`,
                  transition: isDragging ? 'none' : 'transform 150ms ease-out',
                }}
              >
                {/* Đầu tròn bọc quanh vị trí số hiện tại */}
                <div className="w-6 h-6 rounded-full bg-primary/30 absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center border border-primary" />
              </div>

              {/* Danh sách các số xung quanh */}
              {renderClockNumbers()}
            </div>

            {/* Nút xác nhận */}
            <div className="flex justify-end mt-4 pt-2 border-t border-border/60">
              <Button
                type="button"
                size="sm"
                className="h-8 text-xs font-semibold px-4 shadow-none rounded-lg"
                onClick={() => setOpenTime(false)}
              >
                Xác nhận
              </Button>
            </div>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
}
