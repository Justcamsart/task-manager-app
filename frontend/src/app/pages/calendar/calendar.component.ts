import { Component, Input, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventService, CalendarEvent } from '../../services/event.service';

@Component({
  selector: 'app-calendar',
  standalone: true,
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css'],
  imports: [CommonModule],
})
export class CalendarMonthComponent implements OnInit{
  private eventService = inject(EventService);

  @Input() showDetails = true;
  @Input() preview = false;

  eventsMap: Record<string, string[]> = {};
  selectedDay: number | null = null;

  today = new Date();
  currentMonth = this.today.getMonth();
  currentYear = this.today.getFullYear();

  ngOnInit(): void {
    this.eventService.getEvents().subscribe((events: CalendarEvent[]) => {
      this.eventsMap = events.reduce((acc: Record<string, string[]>, ev) => {
        const dateKey = this.getKeyFromISO(ev.date);
        if (!acc[dateKey]) acc[dateKey] = [];
        acc[dateKey].push(ev.description);
        return acc;
      }, {});
    });
  }

  get monthName(): string {
    return new Date(this.currentYear, this.currentMonth).toLocaleString('fr-FR', { month: 'long' });
  }

  get weekDays(): string[] {
    return ['L', 'M', 'M', 'J', 'V', 'S', 'D'];
  }

  get days(): (number | null)[] {
    const firstDay = new Date(this.currentYear, this.currentMonth, 1).getDay();
    const daysInMonth = new Date(this.currentYear, this.currentMonth + 1, 0).getDate();
    const emptyStart = firstDay === 0 ? 6 : firstDay - 1;
    return Array(emptyStart).fill(null).concat([...Array(daysInMonth).keys()].map(i => i + 1));
  }

  isToday(day: number): boolean {
    const now = new Date();
    return (
      day === now.getDate() &&
      this.currentMonth === now.getMonth() &&
      this.currentYear === now.getFullYear()
    );
  }

  selectDay(day: number): void {
    this.selectedDay = day;
  }

  goToPreviousMonth(): void {
    if (this.currentMonth === 0) {
      this.currentMonth = 11;
      this.currentYear--;
    } else {
      this.currentMonth--;
    }
    this.selectedDay = null;
  }

  goToNextMonth(): void {
    if (this.currentMonth === 11) {
      this.currentMonth = 0;
      this.currentYear++;
    } else {
      this.currentMonth++;
    }
    this.selectedDay = null;
  }

  getKey(day: number): string {
    return `${this.currentYear}-${(this.currentMonth + 1).toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
  }

  getKeyFromISO(dateStr: string): string {
    const date = new Date(dateStr);
    return `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;
  }

  hasEvent(day: number): boolean {
    const key = this.getKey(day);
  return this.eventsMap[key]?.length > 0;
  }
}
