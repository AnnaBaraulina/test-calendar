import { useState, FC } from "react";
import dayjs from "dayjs";
import styles from "./Calendar.module.css";

const WeekCalendar: FC = () => {
  const [currentWeekStart, setCurrentWeekStart] = useState(
    dayjs().startOf("week")
  );

  const [timeZone, setTimeZone] = useState<boolean>(false);

  const [selectedDay, setSelectedDay] = useState<string | null>(null);

  const getTimezoneName = () => {
    const timeZoneString = Intl.DateTimeFormat().resolvedOptions().timeZone;
    return timeZoneString;
  };

  const daysOfWeek = Array(7)
    .fill(null)
    .map((_, index) => {
      return currentWeekStart.add(index, "day").format("DD MMMM dddd");
    });

  const handlePreviousWeek = () => {
    setCurrentWeekStart(currentWeekStart.subtract(1, "week"));
  };

  const handleNextWeek = () => {
    setCurrentWeekStart(currentWeekStart.add(1, "week"));
  };

  const handleDaySelect = (day: string) => {
    setSelectedDay((prevSelected) => (prevSelected === day ? null : day));
  };

  return (
    <div className={styles.container}>
      <label className={styles.checkboxLabel}>
        <input
          type="checkbox"
          className={styles.checkbox}
          checked={timeZone}
          onChange={() => setTimeZone((prev) => !prev)}
        />
        <span>Show timezone</span>
      </label>
      <div className={styles.week}>
        <button className={styles.button} onClick={handlePreviousWeek}>
          ←
        </button>
        {daysOfWeek.map((day, index) => {
          const [date, month, dayName] = day.split(" ");
          const isToday =
            dayjs().format("DD MMMM dddd") ===
            currentWeekStart.add(index, "day").format("DD MMMM dddd");
          const isSelected = day === selectedDay;
          return (
            <div
              key={index}
              className={`${styles.day} ${isToday ? styles.today : ""} ${
                isSelected ? styles.selected : ""
              }`}
              onClick={() => handleDaySelect(day)}
            >
              <span className={styles.text}>{date}</span>
              <span className={styles.text}>{month}</span>
              <span className={styles.text}>{dayName}</span>
              {timeZone && (
                <span className={styles.text}>{getTimezoneName()}</span>
              )}
            </div>
          );
        })}
        <button className={styles.button} onClick={handleNextWeek}>
          →
        </button>
      </div>
    </div>
  );
};

export default WeekCalendar;
