import { useState } from 'react'
import { FaChartLine, FaDollarSign, FaUsers, FaCar, FaCheck } from 'react-icons/fa'

export default function AdminDashboard({ dailyStats }) {
  const [timeRange, setTimeRange] = useState('This Month')

  return (
    <div className="p-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <div className="bg-white p-6 rounded-lg shadow flex justify-between items-center">
          <div>
            <div className="text-xl font-bold">{dailyStats.totalCars}</div>
            <div className="text-gray-500 text-sm">Campaign</div>
          </div>
          <div className="text-blue-500">
            <svg className="w-16 h-8" viewBox="0 0 100 50" xmlns="http://www.w3.org/2000/svg">
              <path d="M0,25 Q25,0 50,25 T100,25" fill="none" stroke="currentColor" strokeWidth="2" />
            </svg>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow flex justify-between items-center">
          <div>
            <div className="text-xl font-bold">{dailyStats.totalUsers.toLocaleString()}</div>
            <div className="text-gray-500 text-sm">Audience</div>
          </div>
          <div className="text-blue-500">
            <svg className="w-16 h-8" viewBox="0 0 100 50" xmlns="http://www.w3.org/2000/svg">
              <path d="M0,40 Q20,10 40,30 T60,20 T80,10 T100,5" fill="none" stroke="currentColor" strokeWidth="2" />
            </svg>
          </div>
        </div>
        <div className="bg-blue-500 p-6 rounded-lg shadow text-white">
          <div className="flex justify-between items-center">
            <div>
              <div className="text-sm">Spends Today</div>
              <div className="text-2xl font-bold">${dailyStats.earningsToday.toLocaleString()}</div>
            </div>
            <div className="rounded-full w-12 h-12 border-4 border-blue-400 flex items-center justify-center">
              <FaDollarSign className="text-xl" />
            </div>
          </div>
        </div>
        <div className="bg-green-500 p-6 rounded-lg shadow text-white">
          <div className="flex justify-between items-center">
            <div>
              <div className="text-sm">Spends Yesterday</div>
              <div className="text-2xl font-bold">${dailyStats.earningsYesterday.toLocaleString()}</div>
            </div>
            <div className="rounded-full w-12 h-12 border-4 border-green-400 flex items-center justify-center">
              <FaDollarSign className="text-xl" />
            </div>
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow">
          <div className="flex justify-between items-center mb-4">
            <h2 className="font-semibold">Chart Activity</h2>
            <div className="flex items-center space-x-4">
              <div className="flex items-center">
                <span className="w-3 h-3 bg-blue-500 rounded-full mr-1"></span>
                <span className="text-sm">Spendings</span>
              </div>
              <div className="flex items-center">
                <span className="w-3 h-3 bg-green-500 rounded-full mr-1"></span>
                <span className="text-sm">Income</span>
              </div>
              <div className="flex items-center">
                <span className="w-3 h-3 bg-gray-400 rounded-full mr-1"></span>
                <span className="text-sm">Others</span>
              </div>
            </div>
            <select 
              className="border rounded px-3 py-1 text-sm"
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
            >
              <option>This Month</option>
              <option>Last Month</option>
              <option>This Year</option>
            </select>
          </div>
          <div className="h-64 flex items-center justify-center">
            {/* Placeholder for chart */}
            <div className="w-full h-full relative">
              <svg className="w-full h-full" viewBox="0 0 800 300" xmlns="http://www.w3.org/2000/svg">
                {/* Blue line */}
                <path d="M0,150 Q100,100 200,200 T400,120 T600,180 T800,100" fill="none" stroke="#3B82F6" strokeWidth="3" />
                {/* Gray line */}
                <path d="M0,180 Q100,140 200,220 T400,180 T600,220 T800,180" fill="none" stroke="#9CA3AF" strokeWidth="3" />
              </svg>
            </div>
          </div>
          <div className="flex justify-between mt-4 text-xs text-gray-500">
            <div>Week 01</div>
            <div>Week 02</div>
            <div>Week 03</div>
            <div>Week 04</div>
            <div>Week 05</div>
            <div>Week 06</div>
            <div>Week 07</div>
            <div>Week 08</div>
            <div>Week 09</div>
            <div>Week 10</div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex justify-between items-center mb-4">
            <h2 className="font-semibold">Transaction Overview</h2>
            <div className="flex items-center space-x-4">
              <div className="flex items-center">
                <span className="w-3 h-3 bg-blue-500 rounded-full mr-1"></span>
                <span className="text-sm">Income</span>
              </div>
              <div className="flex items-center">
                <span className="w-3 h-3 bg-green-500 rounded-full mr-1"></span>
                <span className="text-sm">Expense</span>
              </div>
            </div>
          </div>
          <div className="h-64 flex items-end justify-between space-x-2">
            {/* Bar chart */}
            <div className="w-8 bg-blue-500 h-1/3 rounded-t"></div>
            <div className="w-8 bg-green-500 h-3/4 rounded-t"></div>
            <div className="w-8 bg-blue-500 h-1/2 rounded-t"></div>
            <div className="w-8 bg-green-500 h-2/3 rounded-t"></div>
            <div className="w-8 bg-blue-500 h-1/3 rounded-t"></div>
            <div className="w-8 bg-green-500 h-full rounded-t"></div>
            <div className="w-8 bg-blue-500 h-1/2 rounded-t"></div>
            <div className="w-8 bg-green-500 h-2/3 rounded-t"></div>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex justify-between items-center mb-4">
            <h2 className="font-semibold">Click Summary</h2>
            <div className="flex items-center space-x-2">
              <button className="px-3 py-1 bg-blue-100 text-blue-600 rounded text-sm font-medium">Monthly</button>
              <button className="px-3 py-1 text-gray-500 rounded text-sm">Weekly</button>
              <button className="px-3 py-1 text-gray-500 rounded text-sm">Daily</button>
            </div>
          </div>
          <div className="flex justify-between items-center">
            <div>
              <div className="text-3xl font-bold">{dailyStats.recentBookings.toLocaleString()}</div>
              <div className="text-sm text-blue-500">{dailyStats.percentChange}</div>
            </div>
            <button className="px-3 py-1 border border-blue-500 text-blue-500 rounded text-sm">Download CSV</button>
          </div>
          <div className="h-40 flex items-center justify-center mt-4">
            {/* Line chart placeholder */}
            <svg className="w-full h-full" viewBox="0 0 800 200" xmlns="http://www.w3.org/2000/svg">
              <path d="M0,100 Q100,50 200,120 T400,60 T600,160 T800,80" fill="none" stroke="#3B82F6" strokeWidth="3" />
            </svg>
          </div>
          <div className="flex justify-between mt-4 text-xs text-gray-500">
            <div>August</div>
            <div>September</div>
            <div>October</div>
            <div>November</div>
            <div>December</div>
            <div>January</div>
            <div>February</div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex justify-between items-center mb-4">
            <h2 className="font-semibold">Recent Campaign List</h2>
            <div className="flex items-center space-x-2">
              <button className="px-3 py-1 bg-blue-100 text-blue-600 rounded text-sm font-medium">Monthly</button>
              <button className="px-3 py-1 text-gray-500 rounded text-sm">Weekly</button>
              <button className="px-3 py-1 text-gray-500 rounded text-sm">Daily</button>
            </div>
          </div>
          <div className="space-y-4">
            <div className="border rounded-lg p-4">
              <div className="flex justify-between items-center">
                <div className="bg-blue-100 text-blue-600 py-1 px-2 rounded text-xs font-medium">AID-001245</div>
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-500">-2%</span>
                  <svg className="w-16 h-8 text-red-500" viewBox="0 0 100 50" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0,20 Q25,40 50,10 T100,30" fill="none" stroke="currentColor" strokeWidth="2" />
                  </svg>
                </div>
              </div>
              <div className="flex items-center mt-2">
                <FaCheck className="text-green-500 mr-2" />
                <div className="text-sm">50% OFF Floor Lamp Get It Now!</div>
              </div>
              <div className="text-xs text-gray-500 mt-1">Published on January 24, 2021</div>
            </div>
            <div className="border rounded-lg p-4">
              <div className="flex justify-between items-center">
                <div className="bg-blue-100 text-blue-600 py-1 px-2 rounded text-xs font-medium">AID-001245</div>
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-500">+2%</span>
                  <svg className="w-16 h-8 text-green-500" viewBox="0 0 100 50" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0,30 Q25,10 50,20 T100,10" fill="none" stroke="currentColor" strokeWidth="2" />
                  </svg>
                </div>
              </div>
              <div className="flex items-center mt-2">
                <FaCheck className="text-green-500 mr-2" />
                <div className="text-sm">50% OFF Floor Lamp Get It Now!</div>
              </div>
              <div className="text-xs text-gray-500 mt-1">Published on January 25, 2021</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
