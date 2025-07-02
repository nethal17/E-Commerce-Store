import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import axios from "../../lib/axios";
import { Users, Package, ShoppingCart, DollarSign } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import LoadingSpinner from "../components/LoadingSpinner";

const AnalyticsTab = () => {
    const [analyticsData, setAnalyticsData] = useState({
        users: 0,
        products: 0,
        totalSales: 0,
        totalRevenue: 0,
    });
    const [isLoading, setIsLoading] = useState(true);
    const [dailySalesData, setDailySalesData] = useState([]);

    useEffect(() => {
        const fetchAnalyticsData = async () => {
            try {
                const response = await axios.get("/analytics");
                setAnalyticsData(response.data.analyticsData);
                
                // Format the date to be more readable if needed
                const formattedData = response.data.dailySalesData.map(item => ({
                    ...item,
                    name: item.date // Use date as the name for the chart
                }));
                setDailySalesData(formattedData);
            } catch (error) {
                console.error("Error fetching analytics data:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchAnalyticsData();
    }, []);

    if (isLoading) {
        return <LoadingSpinner/>;
    }

    return (
        <div className='px-4 mx-auto max-w-7xl sm:px-6 lg:px-8'>
            <div className='grid grid-cols-1 gap-6 mb-8 sm:grid-cols-2 lg:grid-cols-4'>
                <AnalyticsCard
                    title='Total Users'
                    value={analyticsData.users.toLocaleString()}
                    icon={Users}
                    color='from-sky-500 to-teal-700'
                />
                <AnalyticsCard
                    title='Total Products'
                    value={analyticsData.products.toLocaleString()}
                    icon={Package}
                    color='from-sky-500 to-green-700'
                />
                <AnalyticsCard
                    title='Total Sales'
                    value={analyticsData.totalSales.toLocaleString()}
                    icon={ShoppingCart}
                    color='from-sky-500 to-cyan-700'
                />
                <AnalyticsCard
                    title='Total Revenue'
                    value={`$${analyticsData.totalRevenue.toLocaleString()}`}
                    icon={DollarSign}
                    color='from-sky-500 to-lime-700'
                />
            </div>
            <motion.div
                className='p-6 rounded-lg shadow-lg bg-gray-800/60'
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.25 }}
            >
                <h2 className='mb-4 text-xl font-semibold text-white'>Daily Sales & Revenue</h2>
                <ResponsiveContainer width='100%' height={400}>
                    <LineChart data={dailySalesData}>
                        <CartesianGrid strokeDasharray='3 3' stroke='#4B5563' />
                        <XAxis 
                            dataKey='name' 
                            stroke='#D1D5DB'
                            tickFormatter={(value) => {
                                // Format the date to be more readable (e.g., "Jun 25")
                                const date = new Date(value);
                                return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
                            }}
                        />
                        <YAxis yAxisId='left' stroke='#D1D5DB' />
                        <YAxis yAxisId='right' orientation='right' stroke='#D1D5DB' />
                        <Tooltip 
                            contentStyle={{ backgroundColor: '#1F2937', borderColor: '#4B5563' }}
                            labelFormatter={(value) => {
                                const date = new Date(value);
                                return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
                            }}
                        />
                        <Legend />
                        <Line
                            yAxisId='left'
                            type='monotone'
                            dataKey='sales'
                            stroke='#10B981'
                            strokeWidth={2}
                            activeDot={{ r: 8 }}
                            name='Sales'
                        />
                        <Line
                            yAxisId='right'
                            type='monotone'
                            dataKey='revenue'
                            stroke='#3B82F6'
                            strokeWidth={2}
                            activeDot={{ r: 8 }}
                            name='Revenue ($)'
                        />
                    </LineChart>
                </ResponsiveContainer>
            </motion.div>
        </div>
    );
};

export default AnalyticsTab;

const AnalyticsCard = ({ title, value, icon: Icon, color }) => (
    <motion.div
        className={`bg-gray-800 rounded-lg p-6 shadow-lg overflow-hidden relative ${color}`}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
    >
        <div className='flex items-center justify-between'>
            <div className='z-10'>
                <p className='mb-1 text-sm font-semibold text-sky-300'>{title}</p>
                <h3 className='text-3xl font-bold text-white'>{value}</h3>
            </div>
        </div>
        <div className='absolute inset-0 bg-gradient-to-br from-sky-600 to-sky-900 opacity-30' />
        <div className='absolute opacity-50 -bottom-4 -right-4 text-sky-800'>
            <Icon className='w-32 h-32' />
        </div>
    </motion.div>
);