import React from "react";

export default function Loading(): React.JSX.Element {
  return (
    <main className="min-h-screen bg-[#f7f8f3] px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl space-y-6">
       
        <div className="flex items-center gap-4 rounded-2xl bg-white p-6 shadow-sm border border-gray-100 animate-pulse">
          <div className="h-16 w-16 rounded-2xl bg-gray-200" />
          <div className="space-y-2 flex-1">
            <div className="h-6 w-32 rounded bg-gray-200" />
            <div className="h-3 w-48 rounded bg-gray-200" />
          </div>
        </div>

        <div className="h-14 rounded-2xl bg-white px-6 py-4 shadow-sm border border-gray-100 animate-pulse flex items-center justify-between">
          <div className="h-4 w-24 rounded bg-gray-200" />
          <div className="h-8 w-36 rounded bg-gray-200" />
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="animate-pulse rounded-2xl border border-gray-100 bg-white p-5 shadow-sm space-y-4">
              <div className="flex items-start gap-3">
                <div className="h-12 w-12 rounded-xl bg-gray-200" />
                <div className="space-y-2 flex-1">
                  <div className="h-4 w-1/2 rounded bg-gray-200" />
                  <div className="h-3 w-1/3 rounded bg-gray-200" />
                </div>
              </div>
              <div className="flex justify-between items-center border-t border-gray-50 pt-3">
                <div className="h-5 w-1/3 rounded bg-gray-200" />
                <div className="h-5 w-1/4 rounded bg-gray-200" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}