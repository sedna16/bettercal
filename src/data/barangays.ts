export interface BarangayZone {
  zone: string;
  barangays: string[];
}

export interface BarangayGroup {
  label: string;
  zones: BarangayZone[];
}

const range = (start: number, end: number) =>
  Array.from({ length: end - start + 1 }, (_, i) => `Barangay ${start + i}`);

const barangay176 = [
  'Barangay 176-A',
  'Barangay 176-B',
  'Barangay 176-C',
  'Barangay 176-D',
  'Barangay 176-E',
  'Barangay 176-F',
];

export const barangayGroups: BarangayGroup[] = [
  {
    label: 'South Caloocan (Barangays 1 to 164)',
    zones: [
      { zone: 'Zone 1', barangays: range(1, 8) },
      { zone: 'Zone 2', barangays: range(9, 20) },
      { zone: 'Zone 3', barangays: range(21, 35) },
      { zone: 'Zone 4', barangays: range(36, 48) },
      { zone: 'Zone 5', barangays: range(49, 58) },
      { zone: 'Zone 6', barangays: range(59, 67) },
      { zone: 'Zone 7', barangays: range(68, 80) },
      { zone: 'Zone 8', barangays: range(81, 93) },
      { zone: 'Zone 9', barangays: range(94, 105) },
      { zone: 'Zone 10', barangays: range(106, 120) },
      { zone: 'Zone 11', barangays: range(121, 131) },
      { zone: 'Zone 12', barangays: range(132, 141) },
      { zone: 'Zone 13', barangays: range(142, 151) },
      { zone: 'Zone 14', barangays: range(152, 164) },
    ],
  },
  {
    label: 'North Caloocan (Barangays 165 to 188)',
    zones: [
      { zone: 'Zone 15', barangays: range(165, 173) },
      {
        zone: 'Zone 16',
        barangays: [
          'Barangay 174',
          'Barangay 175',
          ...barangay176,
          ...range(177, 188),
        ],
      },
    ],
  },
];
