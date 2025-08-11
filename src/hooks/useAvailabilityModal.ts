import { useState } from "react";
import type { TimeSlot } from "../Types/TimeSlots";

export function useAvailabilityModal(onSave: (timeSlot: TimeSlot) => void) {
  const [timeSlotData, setTimeSlotData] = useState<TimeSlot>(
    _setInitialTimeSlotData()
  );

  function _setInitialTimeSlotData() {
    const defaultTimeSlotData: TimeSlot = {
      date: _getInitialDate(),
      startTime: _getInitialStartTime(),
      endTime: _getInitialEndTime(),
    };

    return defaultTimeSlotData;
  }

  function _getInitialDate() {
    const date = new Date();
    return `${date.getFullYear()}-${_getMonth(date)}-${date.getDate()}`;
  }

  function _getInitialStartTime() {
    const date = new Date();
    return `${_getHours(date)}:${_getMinutes(date)}`;
  }

  function _getInitialEndTime() {
    const currentDateTime = new Date();
    const futureDate = new Date(currentDateTime.getTime() + 30 * 60 * 1000); //Add 30 min default timeslot
    return `${_getHours(futureDate)}:${_getMinutes(futureDate)}`;
  }

  function _getMonth(date: Date) {
    return (date.getMonth() + 1).toString().padStart(2, "0");
  }

  function _getHours(date: Date) {
    return date.getHours().toString().padStart(2, "0");
  }

  function _getMinutes(date: Date) {
    return date.getMinutes().toString().padStart(2, "0");
  }

  function onSubmit(e: React.FormEvent) {
    console.log(timeSlotData);
    e.preventDefault();
    if (_anyFieldsAreEmpty()) {
      return alert("Please enter all fields");
    }
    onSave(timeSlotData);
  }

  function _anyFieldsAreEmpty() {
    if (!timeSlotData.date) {
      return true;
    }
    if (!timeSlotData.startTime) {
      return true;
    }
    if (!timeSlotData.endTime) {
      return true;
    }
    return false;
  }

  function onChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setTimeSlotData((prev: TimeSlot) => ({ ...prev, [name]: value }));
  }

  return { timeSlotData, onChange, onSubmit };
}
