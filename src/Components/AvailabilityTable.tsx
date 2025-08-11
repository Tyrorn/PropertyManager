import type { TimeSlot } from "../Types/TimeSlots";

type AvailabilityTableProps = {
  data: Array<TimeSlot>;
};

export default function AvailabilityTable({ data }: AvailabilityTableProps) {
  return (
    <div className="bg-white shadow rounded p-4">
      <h2 className="text-lg font-semibold mb-4">Availability Schedule</h2>
      <table className="w-full table-auto border-collapse">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2 text-left">Date</th>
            <th className="border p-2 text-left">Start Time</th>
            <th className="border p-2 text-left">End Time</th>
            <th className="border p-2 text-left">Meeting</th>
            <th className="border p-2 text-left">Contact Details</th>
            <th className="border p-2 text-left">Property Address</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, idx) => (
            <tr key={idx}>
              <td className="border p-2">{row.date}</td>
              <td className="border p-2">{row.startTime}</td>
              <td className="border p-2">{row.endTime}</td>
              <td className="border p-2">{row.username ?? "—"}</td>
              <td className="border p-2">{row.contactNumber ?? "—"}</td>
              <td className="border p-2">{row.propertyAddress ?? "—"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
