"use client"
import React from "react"

interface SpecValue {
  key: string
  value: string
}

interface Spec {
  key: string
  name: string
  values: SpecValue[]
}

interface SpecsFormProps {
  specs: Spec[]
  setSpecs: React.Dispatch<React.SetStateAction<Spec[]>>
}

const SpecsForm: React.FC<SpecsFormProps> = ({ specs, setSpecs }) => {
  const addSpec = () => {
    setSpecs([...specs, { key: "", name: "", values: [{ key: "", value: "" }] }])
  }

  const removeSpec = (index: number) => {
    setSpecs(specs.filter((_, i) => i !== index))
  }

  const updateSpec = (index: number, field: string, value: string) => {
    const updated = [...specs]
    updated[index] = { ...updated[index], [field]: value }
    setSpecs(updated)
  }

  const addSpecValue = (specIndex: number) => {
    const updated = [...specs]
    updated[specIndex].values.push({ key: "", value: "" })
    setSpecs(updated)
  }

  const removeSpecValue = (specIndex: number, valueIndex: number) => {
    const updated = [...specs]
    updated[specIndex].values = updated[specIndex].values.filter((_, i) => i !== valueIndex)
    setSpecs(updated)
  }

  const updateSpecValue = (specIndex: number, valueIndex: number, field: string, value: string) => {
    const updated = [...specs]
    updated[specIndex].values[valueIndex] = { ...updated[specIndex].values[valueIndex], [field]: value }
    setSpecs(updated)
  }

  return (
    <div className="border-t border-gray-200 pt-4">
      <div className="flex items-center justify-between mb-4">
        <h4 className="text-md font-medium text-gray-900">Məhsul Xüsusiyyətləri</h4>
        <button
          type="button"
          onClick={addSpec}
          className="px-3 py-1 text-xs font-medium text-emerald-600 bg-emerald-50 rounded-lg hover:bg-emerald-100 transition-colors"
        >
          + Xüsusiyyət əlavə et
        </button>
      </div>

      <div className="space-y-4">
        {specs.map((spec, specIndex) => (
          <div key={specIndex} className="border border-gray-200 rounded-lg p-4 bg-gray-50">
            <div className="flex items-center justify-between mb-3">
              <h5 className="text-sm font-medium text-gray-700">Xüsusiyyət {specIndex + 1}</h5>
              {specs.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeSpec(specIndex)}
                  className="text-red-500 hover:text-red-700 text-sm"
                >
                  Sil
                </button>
              )}
            </div>

            <div className="grid grid-cols-2 gap-3 mb-3">
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">Açar (Key)</label>
                <input
                  type="text"
                  placeholder="color, size, material"
                  value={spec.key}
                  onChange={(e) => updateSpec(specIndex, 'key', e.target.value)}
                  className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">Ad (Name)</label>
                <input
                  type="text"
                  placeholder="Rəng, Ölçü, Material"
                  value={spec.name}
                  onChange={(e) => updateSpec(specIndex, 'name', e.target.value)}
                  className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="block text-xs font-medium text-gray-600">Dəyərlər</label>
                <button
                  type="button"
                  onClick={() => addSpecValue(specIndex)}
                  className="text-xs text-emerald-600 hover:text-emerald-700"
                >
                  + Dəyər əlavə et
                </button>
              </div>
              
              {spec.values.map((value, valueIndex) => (
                <div key={valueIndex} className="flex gap-2 items-center">
                  <input
                    type="text"
                    placeholder="red, blue, green"
                    value={value.key}
                    onChange={(e) => updateSpecValue(specIndex, valueIndex, 'key', e.target.value)}
                    className="flex-1 px-2 py-1 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
                  />
                  <input
                    type="text"
                    placeholder="Qırmızı, Mavi, Yaşıl"
                    value={value.value}
                    onChange={(e) => updateSpecValue(specIndex, valueIndex, 'value', e.target.value)}
                    className="flex-1 px-2 py-1 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
                  />
                  {spec.values.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeSpecValue(specIndex, valueIndex)}
                      className="text-red-500 hover:text-red-700 text-xs px-2"
                    >
                      ×
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default SpecsForm

