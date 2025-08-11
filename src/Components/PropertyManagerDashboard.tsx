import { useEffect } from "react";
import type { User } from "../Types/User";
import AvailabilityTable from "./AvailabilityTable";
import AvailabilityModal from "./AvailabilityModal";
import { useAvailabilityModal } from "../hooks/usePropertyManagerDashboard";

type PropertyManagerDashboardProps = {
  user: User;
};

export default function PropertyManagerDashboard({
  user,
}: PropertyManagerDashboardProps) {
  const {
    availabilities,
    modalOpen,
    // properties,
    handleNewAvailability,
    setModalOpen,
    fetchData,
  } = useAvailabilityModal(user);

  useEffect(() => {
    fetchData();
  }, [user]);

  return (
    <main className="flex flex-1 gap-4 overflow-auto p-4">
      {modalOpen && (
        <AvailabilityModal
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          onSave={handleNewAvailability}
        />
      )}
      {/* <aside className="w-1/5 h-full">             
        <ManagedProperties propertyList={properties} />
      </aside> */}
      <section className="flex-1 overflow-auto">
        <button
          className="px-3 py-1 rounded bg-white border text-gray-700 cursor-pointer"
          onClick={() => {
            setModalOpen(true);
          }}
        >
          Add new timeslot
        </button>

        <AvailabilityTable data={availabilities} />
      </section>
    </main>
  );
}
