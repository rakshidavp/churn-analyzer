'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';

export default function Page() {
  const [customers, setCustomers] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function loadData() {
      try {
        const { data } = await supabase.from('customers').select('*');
        if (data) setCustomers(data);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  return (
    <main className="min-h-screen p-8 bg-slate-900 text-white">
      <h1 className="text-3xl font-bold mb-4">Predictive Churn Analysis</h1>
      {loading ? (
        <p>Loading customer data...</p>
      ) : (
        <div>
          <p className="mb-4 text-emerald-400">
            Successfully connected! Total Customers: {customers.length}
          </p>
          <div className="grid gap-2">
            {customers.map((c, i) => (
              <div key={c.id || i} className="p-3 bg-slate-800 rounded border border-slate-700">
                {c.name || c.email || JSON.stringify(c)}
              </div>
            ))}
          </div>
        </div>
      )}
    </main>
  );
}
