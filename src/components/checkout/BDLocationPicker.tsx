'use client';

import React, { useMemo } from 'react';
import { BANGLADESH_DIVISIONS } from '@/lib/data/bangladeshLocations';
import { useLanguage } from '@/context/LanguageContext';

interface BDLocationPickerProps {
  division: string;
  district: string;
  upazila: string;
  onDivisionChange: (division: string) => void;
  onDistrictChange: (district: string) => void;
  onUpazilaChange: (upazila: string) => void;
}

export default function BDLocationPicker({
  division,
  district,
  upazila,
  onDivisionChange,
  onDistrictChange,
  onUpazilaChange,
}: BDLocationPickerProps) {
  const { lang, t } = useLanguage();

  // Find selected division object
  const currentDivisionObj = useMemo(() => {
    return (
      BANGLADESH_DIVISIONS.find(
        (d) =>
          d.id === division.toLowerCase() ||
          d.name.toLowerCase() === division.toLowerCase() ||
          d.name_bn === division
      ) || BANGLADESH_DIVISIONS[0]
    );
  }, [division]);

  // Find available districts in selected division
  const availableDistricts = useMemo(() => {
    return currentDivisionObj ? currentDivisionObj.districts : [];
  }, [currentDivisionObj]);

  // Find selected district object
  const currentDistrictObj = useMemo(() => {
    return (
      availableDistricts.find(
        (dist) =>
          dist.id === district.toLowerCase() ||
          dist.name.toLowerCase() === district.toLowerCase() ||
          dist.name_bn === district
      ) || availableDistricts[0]
    );
  }, [availableDistricts, district]);

  // Find available upazilas
  const availableUpazilas = useMemo(() => {
    return currentDistrictObj ? currentDistrictObj.upazilas : [];
  }, [currentDistrictObj]);

  const handleDivChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const val = e.target.value;
    onDivisionChange(val);
    const divObj = BANGLADESH_DIVISIONS.find((d) => d.name === val);
    if (divObj && divObj.districts.length > 0) {
      const firstDist = divObj.districts[0].name;
      onDistrictChange(firstDist);
      if (divObj.districts[0].upazilas.length > 0) {
        onUpazilaChange(divObj.districts[0].upazilas[0].name);
      }
    }
  };

  const handleDistChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const val = e.target.value;
    onDistrictChange(val);
    const distObj = availableDistricts.find((d) => d.name === val);
    if (distObj && distObj.upazilas.length > 0) {
      onUpazilaChange(distObj.upazilas[0].name);
    }
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
      {/* 1. Division Dropdown */}
      <div>
        <label className="block text-xs font-semibold text-gray-700 mb-1">
          {t.checkout.division} <span className="text-red-500">*</span>
        </label>
        <select
          value={currentDivisionObj.name}
          onChange={handleDivChange}
          required
          className="w-full bg-white border border-gray-300 rounded-lg px-3 py-2 text-xs outline-none focus:border-[#0B6E4F]"
        >
          {BANGLADESH_DIVISIONS.map((d) => (
            <option key={d.id} value={d.name}>
              {lang === 'bn' ? d.name_bn : d.name}
            </option>
          ))}
        </select>
      </div>

      {/* 2. District Dropdown */}
      <div>
        <label className="block text-xs font-semibold text-gray-700 mb-1">
          {t.checkout.district} <span className="text-red-500">*</span>
        </label>
        <select
          value={currentDistrictObj?.name || ''}
          onChange={handleDistChange}
          required
          className="w-full bg-white border border-gray-300 rounded-lg px-3 py-2 text-xs outline-none focus:border-[#0B6E4F]"
        >
          {availableDistricts.map((dist) => (
            <option key={dist.id} value={dist.name}>
              {lang === 'bn' ? dist.name_bn : dist.name}
            </option>
          ))}
        </select>
      </div>

      {/* 3. Upazila Dropdown */}
      <div>
        <label className="block text-xs font-semibold text-gray-700 mb-1">
          {t.checkout.upazila} <span className="text-red-500">*</span>
        </label>
        <select
          value={upazila || (availableUpazilas[0]?.name ?? '')}
          onChange={(e) => onUpazilaChange(e.target.value)}
          required
          className="w-full bg-white border border-gray-300 rounded-lg px-3 py-2 text-xs outline-none focus:border-[#0B6E4F]"
        >
          {availableUpazilas.map((u) => (
            <option key={u.id} value={u.name}>
              {lang === 'bn' ? u.name_bn : u.name}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

