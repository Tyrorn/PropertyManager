import type { Property } from "../Types/Property";

type PropertyProps = {
  property: Property;
  isSelected: boolean;
  onSelect: (id: Property["id"]) => void;
};

export default function Property({
  property,
  isSelected,
  onSelect,
}: PropertyProps) {
  return (
    <button
      onClick={() => {
        onSelect(property.id);
      }}
      className={`relative w-full text-left transition-all rounded-xl ${
        isSelected ? "ring-2 ring-blue-500 shadow-lg" : "shadow hover:shadow-md"
      }`}
    >
      {isSelected && (
        <div className="absolute inset-0 bg-blue-100/50 rounded-xl z-10" />
      )}

      <div className="relative z-20 p-4 bg-white rounded-xl">
        <img
          src={property.imageUrl}
          alt={property.name}
          className="w-full h-40 object-cover rounded-lg mb-3"
        />
        <h3 className="text-lg font-semibold">{property.name}</h3>
        <p className="text-sm text-gray-600">{property.address}</p>
      </div>
    </button>
  );
}
