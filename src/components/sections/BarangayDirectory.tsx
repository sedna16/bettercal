import React from 'react';
import { Card, CardHeader } from '@bettergov/kapwa/card';
import { Heading } from '../ui/Heading';
import { barangayGroups } from '../../data/barangays';

const emptyCell = '—';

const BarangayDirectory: React.FC = () => {
  return (
    <Card className="mb-8">
      <CardHeader>
        <Heading level={2}>Barangay Contact Details</Heading>
      </CardHeader>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-primary-50 text-left">
              <th className="px-4 py-3 font-semibold text-primary-700">
                Barangay
              </th>
              <th className="px-4 py-3 font-semibold text-primary-700">
                Mobile
              </th>
              <th className="px-4 py-3 font-semibold text-primary-700">
                Landline
              </th>
              <th className="px-4 py-3 font-semibold text-primary-700">
                Email
              </th>
            </tr>
          </thead>
          <tbody>
            {barangayGroups.map(group => (
              <React.Fragment key={group.label}>
                <tr>
                  <td
                    colSpan={4}
                    className="px-4 py-2 bg-primary-100 font-semibold text-primary-800"
                  >
                    {group.label}
                  </td>
                </tr>
                {group.zones.map(zone => (
                  <React.Fragment key={zone.zone}>
                    <tr>
                      <td
                        colSpan={4}
                        className="px-4 py-1.5 bg-gray-50 text-xs font-semibold uppercase tracking-wide text-gray-500"
                      >
                        {zone.zone}
                      </td>
                    </tr>
                    {zone.barangays.map((barangay, i) => (
                      <tr
                        key={barangay}
                        className={`border-b border-gray-100 ${
                          i % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'
                        }`}
                      >
                        <td className="px-4 py-2 text-gray-800 font-medium">
                          {barangay}
                        </td>
                        <td className="px-4 py-2 text-gray-300">{emptyCell}</td>
                        <td className="px-4 py-2 text-gray-300">{emptyCell}</td>
                        <td className="px-4 py-2 text-gray-300">{emptyCell}</td>
                      </tr>
                    ))}
                  </React.Fragment>
                ))}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
};

export default BarangayDirectory;
