import { useState } from "react";
import type { Property as PropertyType } from "../Types/Property";
import Property from "./Property";

type ManagedPropertiesProps = {
  propertyList: Array<PropertyType>;
  onSelect: (id: PropertyType["id"]) => void;
};

export default function ManagedProperties({
  propertyList,
  onSelect,
}: ManagedPropertiesProps) {
  const [isSelected, setIsSelected] = useState<PropertyType["id"]>(0);

  function handleOnSelect(id: PropertyType["id"]) {
    setIsSelected(id);
    onSelect(id);
  }
  return (
    <>
      <div className="h-full overflow-y-hidden">
        <h1>Managed Properties</h1>
        {propertyList.map((property) => (
          <Property
            key={property.id}
            property={property}
            isSelected={isSelected === property.id}
            onSelect={handleOnSelect}
          />
        ))}
      </div>
    </>
  );
}
