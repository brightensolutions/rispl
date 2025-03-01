import { ConsumablesGrids } from "@/components/consumables-grid"
import { PageTitle } from "@/components/other-page-title"

export default function EquipmentPage() {
  return (
    <div className="min-h-screen bg-white">
      <PageTitle
        title="consumables"
        subtitle="High-quality packaging equipment for your business needs"
        backgroundImage="/images/equipment-bg.jpg"
      />
      <ConsumablesGrids />
    </div>
  )
}

