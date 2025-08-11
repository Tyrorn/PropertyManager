import { useAvailabilityModal } from "../hooks/useAvailabilityModal";
import type { TimeSlot } from "../Types/TimeSlots";
import { Modal } from "./Modal";

type AvailabilityModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSave: (timeSlot: TimeSlot) => void;
};

export default function AvailabilityModal({
  isOpen,
  onClose,
  onSave,
}: AvailabilityModalProps) {
  const { timeSlotData, onChange, onSubmit } = useAvailabilityModal(onSave);
  return (
    <Modal title={"Add Availability"} isOpen={isOpen} onClose={onClose}>
      <form onSubmit={onSubmit}>
        <div className="flex flex-col">
          <label className="text-[0.75rem] font-bold ">Date</label>
          <input
            className="p-1 border border-black/25 border-solid rounded-sm"
            type="date"
            name="date"
            value={timeSlotData.date}
            onChange={onChange}
          />
        </div>

        <p className="p-2"></p>

        <div className="flex flex-col">
          <label className="text-[0.75rem] font-bold">Start time</label>
          <input
            className="p-1 border border-black/25 border-solid rounded-sm"
            type="time"
            name="startTime"
            value={timeSlotData.startTime}
            onChange={onChange}
          />
        </div>

        <p className="p-2"></p>

        <div className="flex flex-col">
          <label className="text-[0.75rem] font-bold">End time</label>
          <input
            className="p-1 border border-black/25 border-solid rounded-sm"
            type="time"
            name="endTime"
            value={timeSlotData.endTime}
            onChange={onChange}
          />
        </div>

        <p className="p-2"></p>
        <div className="flex flex-col">
          <button
            className="px-3 py-1 rounded bg-white border text-gray-700 cursor-pointer"
            type="submit"
          >
            Save
          </button>
        </div>
      </form>
    </Modal>
  );
}
