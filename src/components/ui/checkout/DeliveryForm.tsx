"use client"

import type React from "react"
import { useState } from "react"

interface DeliveryFormData {
  firstName: string
  lastName: string
  address: string
  apartment: string
  phoneNumber: string
  postCode: string
}

export default function DeliveryForm() {
  const [formData, setFormData] = useState<DeliveryFormData>({
    firstName: "",
    lastName: "",
    address: "",
    apartment: "",
    phoneNumber: "",
    postCode: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Delivery Form Data:", formData)
  }

  const inputClasses =
    "w-full h-12 border-2 border-neutral-300 rounded-lg px-4 text-neutral-900 placeholder-neutral-500 outline-none focus:border-black transition-colors"

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-semibold text-neutral-900">Delivery</h2>
        <p className="text-sm text-neutral-600 mt-1">Enter your delivery details</p>
      </div>

      {/* Name Row */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-neutral-900 mb-2">First Name</label>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            placeholder="John"
            className={inputClasses}
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-neutral-900 mb-2">Last Name</label>
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            placeholder="Doe"
            className={inputClasses}
            required
          />
        </div>
      </div>

      {/* Address */}
      <div>
        <label className="block text-sm font-medium text-neutral-900 mb-2">Address</label>
        <input
          type="text"
          name="address"
          value={formData.address}
          onChange={handleChange}
          placeholder="123 Main Street"
          className={inputClasses}
          required
        />
      </div>

      {/* Apartment & Post Code Row */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-neutral-900 mb-2">Apartment / Flat</label>
          <input
            type="text"
            name="apartment"
            value={formData.apartment}
            onChange={handleChange}
            placeholder="Apt 4B"
            className={inputClasses}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-neutral-900 mb-2">Post Code</label>
          <input
            type="text"
            name="postCode"
            value={formData.postCode}
            onChange={handleChange}
            placeholder="12345"
            className={inputClasses}
            required
          />
        </div>
      </div>

      {/* Phone Number */}
      <div>
        <label className="block text-sm font-medium text-neutral-900 mb-2">Phone Number</label>
        <input
          type="tel"
          name="phoneNumber"
          value={formData.phoneNumber}
          onChange={handleChange}
          placeholder="+1 (555) 000-0000"
          className={inputClasses}
          required
        />
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full h-12 bg-black text-white rounded-lg font-medium hover:bg-neutral-900 transition-colors active:scale-95"
      >
        Continue to Payment
      </button>
    </form>
  )
}
